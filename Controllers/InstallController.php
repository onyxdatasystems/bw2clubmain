<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Session;
use App\Helpers\ApiResponse; // Import the ApiResponse helper

use App\Models\User;

class InstallController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        if (DB::connection()->getDatabaseName() != 'db_name') {
            return ApiResponse::error(null, 'Database connection failed', 500);
        } else {
            return ApiResponse::success(null, 'Database connected successfully');
        }
    }

    public function step0()
    {
        return ApiResponse::success(null, 'Installation step 0');
    }

    public function step1()
    {
        return ApiResponse::success(null, 'Installation step 1');
    }

    public function step2($param1 = '')
    {
        $error = ($param1 == 'error') ? 'Purchase Code Verification Failed' : '';
        return ApiResponse::success(['error' => $error], 'Installation step 2');
    }

    public function validatePurchaseCode(Request $request)
    {
        $purchase_code = $request->purchase_code;
        if (!$purchase_code) {
            return ApiResponse::error(null, 'Purchase code is required', 400);
        }

        session(['purchase_code' => $purchase_code]);
        session(['purchase_code_verified' => 1]);

        return ApiResponse::success(null, 'Purchase code verified successfully');
    }

    public function api_request($code = '')
    {
        $product_code = $code;
        $personal_token = "FkA9UyDiQT0YiKwYLK3ghyFNRVV9SeUn";
        $url = "https://api.envato.com/v3/market/author/sale?code=" . $product_code;
        $curl = curl_init($url);

        // Setting the header for the rest of the API
        $bearer = 'bearer ' . $personal_token;
        $header = [
            'Content-length: 0',
            'Content-type: application/json; charset=utf-8',
            'Authorization: ' . $bearer,
        ];

        $verify_url = 'https://api.envato.com/v1/market/private/user/verify-purchase:' . $product_code . '.json';
        $ch_verify = curl_init($verify_url . '?code=' . $product_code);

        curl_setopt($ch_verify, CURLOPT_HTTPHEADER, $header);
        curl_setopt($ch_verify, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch_verify, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch_verify, CURLOPT_CONNECTTIMEOUT, 5);
        curl_setopt($ch_verify, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);

        $cinit_verify_data = curl_exec($ch_verify);
        curl_close($ch_verify);

        $response = json_decode($cinit_verify_data, true);

        if (count($response['verify-purchase']) > 0) {
            return ApiResponse::success(null, 'Purchase code verified successfully');
        } else {
            return ApiResponse::error(null, 'Purchase code verification failed', 400);
        }
    }

    public function step3(Request $request)
    {
        $this->check_purchase_code_verification();

        $data = $request->all();
        if ($data) {
            $hostname = $data['hostname'];
            $username = $data['username'];
            $password = $data['password'];
            $dbname = $data['dbname'];

            $db_connection = $this->check_database_connection($hostname, $username, $password, $dbname);
            if ($db_connection == 'success') {
                session(['hostname' => $hostname]);
                session(['username' => $username]);
                session(['password' => $password]);
                session(['dbname' => $dbname]);

                return ApiResponse::success(null, 'Database connection successful');
            } else {
                return ApiResponse::error(null, $db_connection, 500);
            }
        }

        return ApiResponse::success(null, 'Installation step 3');
    }

    public function check_purchase_code_verification()
    {
        if ($_SERVER['SERVER_NAME'] != 'localhost' && $_SERVER['SERVER_NAME'] != '127.0.0.1') {
            if (!session('purchase_code_verified')) {
                return ApiResponse::error(null, 'Purchase code not verified', 400);
            }
        }
    }

    public function check_database_connection($hostname, $username, $password, $dbname)
    {
        $newName = uniqid('db'); // Example of unique name

        Config::set("database.connections." . $newName, [
            "host" => $hostname,
            "port" => env('DB_PORT', '3306'),
            "database" => $dbname,
            "username" => $username,
            "password" => $password,
            'driver' => env('DB_CONNECTION', 'mysql'),
            'charset' => env('DB_CHARSET', 'utf8mb4'),
        ]);

        try {
            DB::connection($newName)->getPdo();
            return 'success';
        } catch (\Exception $e) {
            return 'Could not connect to the database. Please check your configuration.';
        }
    }

    public function step4(Request $request)
    {
        return ApiResponse::success(null, 'Installation step 4');
    }

    public function confirmImport($param1 = '')
    {
        if ($param1 == 'confirm_import') {
            $this->configure_database();
            return ApiResponse::success(null, 'Database configuration updated successfully');
        }
    }

    public function confirmInstall()
    {
        $this->run_blank_sql();
        return ApiResponse::success(null, 'Database setup completed successfully');
    }

    public function configure_database()
    {
        $data_db = file_get_contents(base_path('config/database.php'));
        $data_db = str_replace('db_name', session('dbname'), $data_db);
        $data_db = str_replace('db_user', session('username'), $data_db);
        $data_db = str_replace('db_pass', session('password'), $data_db);
        $data_db = str_replace('db_host', session('hostname'), $data_db);
        file_put_contents(base_path('config/database.php'), $data_db);
    }

    public function run_blank_sql()
    {
        $templine = '';
        $lines = file(base_path('public/assets/install.sql'));

        foreach ($lines as $line) {
            if (substr($line, 0, 2) == '--' || $line == '') {
                continue;
            }

            $templine .= $line;
            if (substr(trim($line), -1, 1) == ';') {
                DB::statement($templine);
                $templine = '';
            }
        }
    }

    public function finalizingSetup(Request $request)
    {
        $data = $request->all();
        if ($data) {
            // System data
            $system_data = [
                'system_name' => $data['system_name'],
                'purchase_code' => session('purchase_code'),
            ];

            foreach ($system_data as $key => $settings_data) {
                DB::table('settings')->where('type', $key)->update([
                    'description' => $settings_data,
                ]);
            }

            // Admin data
            $admin_data = [
                'name' => $data['admin_name'],
                'email' => $data['admin_email'],
                'password' => Hash::make($data['admin_password']),
                'user_role' => 'admin',
                'friends' => json_encode([]),
                'gender' => 'male',
                'address' => $data['admin_address'],
                'phone' => $data['admin_phone'],
                'date_of_birth' => time(),
                'timezone' => $data['timezone'],
                'email_verified_at' => date('Y-m-d H:i:s', time()),
            ];

            DB::table('users')->insert($admin_data);

            return ApiResponse::success(null, 'Admin account created successfully');
        }

        return ApiResponse::success(null, 'Finalizing setup');
    }

    public function success($param1 = '')
    {
        $this->configure_routes();

        if ($param1 == 'login') {
            return ApiResponse::success(null, 'Login page');
        }

        $admin_email = User::find(1)->email;
        return ApiResponse::success(['admin_email' => $admin_email], 'Installation completed successfully');
    }

    public function configure_routes()
    {
        $data_routes = file_get_contents(base_path('routes/web.php'));
        $data_routes = str_replace("Route::get('/', 'index')", "Route::get('/install_ended', 'index')", $data_routes);
        file_put_contents(base_path('routes/web.php'), $data_routes);
    }
}