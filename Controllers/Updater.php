<?php

namespace App\Http\Controllers;

use App\Models\Addon;
use Illuminate\Http\Request;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use ZipArchive, DB, Artisan;
use App\Helpers\ApiResponse; // Import the ApiResponse helper

class Updater extends Controller
{
    public function update(Request $request)
    {
        $addons_parent_id = null;

        // Check required version
        $product_current_version = DB::table('settings')->where('type', 'version')->value('description');

        $rules = array('file' => 'required|file|mimes:zip');
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), 'Select a valid zip file', 400);
        }

        // Create update directory
        $dir = 'upload';
        if (!is_dir($dir)) {
            mkdir($dir, 0777, true);
        }

        // Uploaded file name
        $file_name = $request->file->getClientOriginalName();
        $path = $dir . '/' . $file_name;

        if (class_exists('ZipArchive')) {
            // File uploading
            $request->file->move(base_path($dir), $file_name);

            // Unzip uploaded update file and remove zip file
            $zip = new ZipArchive;
            $res = $zip->open(base_path($path));
            $zip->extractTo(base_path($dir));
            $zip->close();
            unlink(base_path($path));
        } else {
            return ApiResponse::error(null, 'Your server is unable to extract the zip file. Please enable the zip extension on the server and try again.', 400);
        }

        $uploaded_folder_name = substr($file_name, 0, -4);
        $version_ = substr($file_name, 0, -4);

        // Execute PHP or Laravel code
        $step1Execution = file_get_contents(base_path($dir . '/' . $uploaded_folder_name . '/step1_pre_checker.php'));
        if ($step1Execution) {
            eval($step1Execution);
        }

        $config = file_get_contents(base_path($dir . '/' . $uploaded_folder_name . '/step2_config.json'));
        if ($config) {
            $config = json_decode($config, true);
        }

        // Check if it's an addon or main product update
        if (array_key_exists('is_addon', $config) && strval($config['is_addon']) == "1") {
            // Check required main product version to install this addon
            if ($config['product_version']['minimum_required_version'] > $product_current_version) {
                return ApiResponse::error(null, "You have to update your main application's version to " . $config['product_version']['minimum_required_version'] . ' to install the addon.', 400);
            }

            $addons_current_version = DB::table('addons')->where('unique_identifier', $config['addons'][0]['unique_identifier']);
            if ($addons_current_version->get()->count() > 0) {
                $addons_current_version = $addons_current_version->value('version');
            } else {
                $addons_current_version = "0";
            }

            foreach ($config['addons'] as $addon) {
                $data['unique_identifier'] = $addon['unique_identifier'];
                $data['title'] = $addon['title'];
                $data['version'] = $config['addon_version']['update_version'];
                $data['features'] = $addon['features'];
                $data['status'] = 1;
                $data['parent_id'] = $addons_parent_id;

                if ($addons_current_version) {
                    $parent_id = DB::table('addons')->where('unique_identifier', $addon['unique_identifier'])->update($data);
                } else {
                    $parent_id = DB::table('addons')->insertGetId($data);
                }

                if ($addons_parent_id == null) {
                    $addons_parent_id = $parent_id;
                }
            }
        } else {
            // Check required main product version
            if (strval($config['product_version']['minimum_required_version']) != strval($product_current_version)) {
                return ApiResponse::error(null, 'It looks like you are skipping a version. Please update to version ' . $config['product_version']['minimum_required_version'] . ' first.', 400);
            }
        }

        // Update files, folders, and libraries
        $this->fileAndFolderDistributor($uploaded_folder_name);

        // Run SQL file
        $sql = file_get_contents(base_path($dir . '/' . $uploaded_folder_name . '/step3_database.sql'));
        if ($sql) {
            DB::unprepared($sql);
        }

        // Execute PHP or Laravel code
        $step4Execution = file_get_contents(base_path($dir . '/' . $uploaded_folder_name . '/step4_update_data.php'));
        if ($step4Execution) {
            eval($step4Execution);
        }

        if (array_key_exists('is_addon', $config) && strval($config['is_addon']) == "1") {
            if ($config['addon_version']['minimum_required_version'] == "0") {
                return ApiResponse::success(null, 'Addon installed successfully');
            } else {
                return ApiResponse::success(null, 'Addon updated successfully');
            }
        } else {
            DB::table('settings')->where('type', 'version')->update(['description' => $config['product_version']['update_version']]);
            return ApiResponse::success(null, 'Version updated successfully');
        }
    }

    private function fileAndFolderDistributor($param1, $param2 = "")
    {
        if ($param2 == "") {
            $param2 = $param1;
            $uploaded_dir_path = base_path('upload/' . $param1 . '/sources');
        } else {
            $uploaded_dir_path = $param1;
        }

        $uploaded_dir_paths = glob($uploaded_dir_path . '/*');

        foreach ($uploaded_dir_paths as $uploaded_sub_dir_path) {
            if (is_dir($uploaded_sub_dir_path)) {
                $all_available_sub_paths = count(glob($uploaded_sub_dir_path . '/*'));

                if ($all_available_sub_paths == 0) {
                    // Create directory
                    $application_dir_path = str_replace('upload/' . $param2 . '/sources/', "", $uploaded_sub_dir_path);
                    if (!is_dir($application_dir_path)) {
                        mkdir($application_dir_path, 0777, true);
                    }
                } else {
                    $this->fileAndFolderDistributor($uploaded_sub_dir_path, $param2);
                }
            } else {
                $application_file_path = str_replace('upload/' . $param2 . '/sources/', "", $uploaded_sub_dir_path);

                // Check dir. If not exist, create it
                $file_path_arr = explode("/", $application_file_path);
                $file_name = $file_path_arr[count($file_path_arr) - 1];
                $application_dir_path = str_replace('/' . $file_name, "", $application_file_path);
                if (!is_dir($application_dir_path)) {
                    mkdir($application_dir_path, 0777, true);
                }

                // Copy file to application path
                copy($uploaded_sub_dir_path, $application_file_path);

                // Zip file extract for any big size libraries
                if (pathinfo($file_name, PATHINFO_EXTENSION) == 'zip') {
                    // Path of extracting library file
                    array_pop($file_path_arr);
                    $extract_to = implode('/', $file_path_arr);
                    $library_zip = new ZipArchive;
                    $library_result = $library_zip->open($application_file_path);
                    $library_zip->extractTo($extract_to);
                    $library_zip->close();
                    unlink($application_file_path);
                }
            }
        }
    }

    // Addon manager table
    public function addon_manager()
    {
        $addons = Addon::paginate(10);
        return ApiResponse::success(['addons' => $addons], 'Addons retrieved successfully');
    }

    public function addon_status($status, $id)
    {
        if ($status == 'activate') {
            Addon::where('id', $id)->update(['status' => 1]);
            $msg = 'Addon activated.';
        } elseif ($status == 'deactivate') {
            Addon::where('id', $id)->update(['status' => 0]);
            $msg = 'Addon deactivated.';
        } else {
            return ApiResponse::error(null, 'Invalid status', 400);
        }

        return ApiResponse::success(null, $msg);
    }

    public function addon_delete($id)
    {
        $addon = Addon::find($id);
        if (!$addon) {
            return ApiResponse::error(null, 'Addon not found', 404);
        }

        $addon->delete();
        return ApiResponse::success(null, 'Addon has been deleted');
    }
}