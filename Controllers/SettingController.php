<?php

namespace App\Http\Controllers;

use App\Mail\ContactMail;
use App\Models\{FileUploader, Posts, Report, Setting, User};
use Illuminate\Http\Request;
use Mail;
use App\Helpers\ApiResponse; // Import the ApiResponse helper

class SettingController extends Controller
{
    public function about_view()
    {
        $about = Setting::where('type', 'about')->value('description');
        return ApiResponse::success(['about' => $about], 'About page data retrieved successfully');
    }

    public function policy_view()
    {
        $policy = Setting::where('type', 'policy')->value('description');
        return ApiResponse::success(['policy' => $policy], 'Policy page data retrieved successfully');
    }

    public function contact_view()
    {
        return ApiResponse::success(null, 'Contact page data retrieved successfully');
    }

    public function contact_send(Request $request)
    {
        $user = User::where('user_role', 'admin')->first();
        if (!$user) {
            return ApiResponse::error(null, 'Admin user not found', 404);
        }

        $name = $request->name;
        $email = $request->email;
        $subject = $request->subject;
        $details = $request->details;

        Mail::to($user->email)->send(new ContactMail($name, $email, $subject, $details));
        return ApiResponse::success(null, 'Contact message sent successfully');
    }

    public function term_view()
    {
        $term = Setting::where('type', 'term')->value('description');
        return ApiResponse::success(['term' => $term], 'Terms and conditions page data retrieved successfully');
    }

    // Admin section

    public function update_about_page_data()
    {
        $about = Setting::where('type', 'about')->first();
        $policy = Setting::where('type', 'policy')->first();
        $term = Setting::where('type', 'term')->first();

        $response_data = [
            'about' => $about,
            'policy' => $policy,
            'term' => $term,
        ];

        return ApiResponse::success($response_data, 'About, policy, and term data retrieved successfully');
    }

    public function update_about_page_data_update(Request $request, $id)
    {
        $validated = $request->validate([
            'about' => 'required',
        ]);

        Setting::where('setting_id', $id)->update(['description' => $request->about]);
        return ApiResponse::success(null, 'About page information updated successfully');
    }

    public function update_privacy_page_data_update(Request $request, $id)
    {
        $validated = $request->validate([
            'privacy' => 'required',
        ]);

        Setting::where('setting_id', $id)->update(['description' => $request->privacy]);
        return ApiResponse::success(null, 'Privacy page information updated successfully');
    }

    public function update_term_page_data_update(Request $request, $id)
    {
        $validated = $request->validate([
            'term' => 'required',
        ]);

        Setting::where('setting_id', $id)->update(['description' => $request->term]);
        return ApiResponse::success(null, 'Terms and conditions page information updated successfully');
    }

    // Reported post

    public function reported_post_to_admin()
    {
        $reported_post = Report::orderBy('id', 'DESC')->where('status', '0')->get();
        return ApiResponse::success(['reported_post' => $reported_post], 'Reported posts retrieved successfully');
    }

    public function reported_post_remove_by_admin($id)
    {
        Posts::where('post_id', $id)->update(['report_status' => '1']);
        Report::where('post_id', $id)->update(['status' => '1']);
        return ApiResponse::success(null, 'Reported post removed successfully');
    }

    // SMTP settings

    public function smtp_settings_view()
    {
        $smtp_settings = Setting::where('type', 'smtp')->first();
        $smptData = json_decode($smtp_settings->description);
        return ApiResponse::success(['smtp_settings' => $smptData], 'SMTP settings retrieved successfully');
    }

    public function smtp_settings_save(Request $request, $id)
    {
        $data = $request->all();
        unset($data['_token']);

        foreach ($data as $key => $value) {
            if ($key == 'smtp_protocol') {
                set_config('MAIL_MAILER', $value);
            } elseif ($key == 'smtp_crypto') {
                set_config('MAIL_ENCRYPTION', $value);
            } elseif ($key == 'smtp_host') {
                set_config('MAIL_HOST', $value);
            } elseif ($key == 'smtp_port') {
                set_config('MAIL_PORT', $value);
            } elseif ($key == 'smtp_user') {
                set_config('MAIL_USERNAME', $value);
            } elseif ($key == 'smtp_pass') {
                set_config('MAIL_PASSWORD', $value);
            }
        }

        $data = $request->only('smtp_protocol', 'smtp_crypto', 'smtp_host', 'smtp_port', 'smtp_user', 'smtp_pass');
        $description = json_encode($data);
        Setting::where('setting_id', $id)->update(['description' => $description]);

        return ApiResponse::success(null, 'SMTP settings updated successfully');
    }

    public function system_settings_view()
    {
        $system_settings = [
            'system_name' => Setting::where('type', 'system_name')->value('description'),
            'system_title' => Setting::where('type', 'system_title')->value('description'),
            'system_email' => Setting::where('type', 'system_email')->value('description'),
            'system_phone' => Setting::where('type', 'system_phone')->value('description'),
            'system_fax' => Setting::where('type', 'system_fax')->value('description'),
            'system_address' => Setting::where('type', 'system_address')->value('description'),
            'system_footer' => Setting::where('type', 'system_footer')->value('description'),
            'system_footer_link' => Setting::where('type', 'system_footer_link')->value('description'),
            'system_dark_logo' => Setting::where('type', 'system_dark_logo')->value('description'),
            'system_light_logo' => Setting::where('type', 'system_light_logo')->value('description'),
            'system_fav_icon' => Setting::where('type', 'system_fav_icon')->value('description'),
            'google_analytics_id' => Setting::where('type', 'google_analytics_id')->value('description'),
            'meta_pixel_id' => Setting::where('type', 'meta_pixel_id')->value('description'),
            'commission_rate' => Setting::where('type', 'commission_rate')->value('description'),
            'hugging_face_auth_key' => Setting::where('type', 'hugging_face_auth_key')->value('description'),
        ];

        return ApiResponse::success($system_settings, 'System settings retrieved successfully');
    }

    public function system_settings_save(Request $request)
    {
        if ($request->commission_rate >= 100 || $request->commission_rate < 1) {
            return ApiResponse::error(null, 'Commission rate must be between 1 and 100', 400);
        }

        Setting::where('type', 'system_name')->update(['description' => $request->system_name]);
        set_config('MAIL_FROM_NAME', $request->system_name);
        Setting::where('type', 'system_title')->update(['description' => $request->system_title]);
        Setting::where('type', 'system_email')->update(['description' => $request->system_email]);
        set_config('MAIL_FROM_ADDRESS', $request->system_email);
        Setting::where('type', 'system_phone')->update(['description' => $request->system_phone]);
        Setting::where('type', 'system_fax')->update(['description' => $request->system_fax]);
        Setting::where('type', 'system_address')->update(['description' => $request->system_address]);
        Setting::where('type', 'system_footer')->update(['description' => $request->system_footer]);
        Setting::where('type', 'system_footer_link')->update(['description' => $request->system_footer_link]);
        Setting::where('type', 'public_signup')->update(['description' => $request->public_signup]);
        Setting::where('type', 'system_currency')->update(['description' => $request->system_currency]);
        Setting::where('type', 'ad_charge_per_day')->update(['description' => $request->ad_charge_per_day]);
        Setting::where('type', 'google_analytics_id')->update(['description' => $request->google_analytics_id]);
        Setting::where('type', 'hugging_face_auth_key')->update(['description' => $request->hugging_face_auth_key]);
        Setting::where('type', 'meta_pixel_id')->update(['description' => $request->meta_pixel_id]);
        Setting::where('type', 'commission_rate')->update(['description' => $request->commission_rate]);
        Setting::where('type', 'system_language')->update(['description' => strtolower($request->system_language)]);

        return ApiResponse::success(null, 'System settings updated successfully');
    }

    public function amazon_s3()
    {
        $amazon_s3_data = get_settings('amazon_s3', true);
        return ApiResponse::success(['amazon_s3_data' => $amazon_s3_data], 'Amazon S3 settings retrieved successfully');
    }

    public function amazon_s3_update(Request $request)
    {
        $data = [
            'active' => $request->active,
            'AWS_ACCESS_KEY_ID' => $request->AWS_ACCESS_KEY_ID,
            'AWS_SECRET_ACCESS_KEY' => $request->AWS_SECRET_ACCESS_KEY,
            'AWS_DEFAULT_REGION' => $request->AWS_DEFAULT_REGION,
            'AWS_BUCKET' => $request->AWS_BUCKET,
        ];

        Setting::where('type', 'amazon_s3')->update(['description' => json_encode($data)]);
        return ApiResponse::success(null, 'Amazon S3 settings updated successfully');
    }

    public function system_settings_logo_save(Request $request)
    {
        if ($request->hasFile('dark_logo')) {
            $dark_file_ext = $request->dark_logo->extension();
            $dark_file_name = rand(0, 1000) . '.' . $dark_file_ext;
            Setting::where('type', 'system_dark_logo')->update(['description' => $dark_file_name]);
            FileUploader::upload($request->dark_logo, 'public/storage/logo/dark/' . $dark_file_name);
        }

        if ($request->hasFile('light_logo')) {
            $light_file_ext = $request->light_logo->extension();
            $light_file_name = rand(0, 1000) . '.' . $light_file_ext;
            Setting::where('type', 'system_light_logo')->update(['description' => $light_file_name]);
            FileUploader::upload($request->light_logo, 'public/storage/logo/light/' . $light_file_name);
        }

        if ($request->hasFile('favicon')) {
            $favicon_ext = $request->favicon->extension();
            $favicon_file_name = rand(0, 1000) . '.' . $favicon_ext;
            Setting::where('type', 'system_fav_icon')->update(['description' => $favicon_file_name]);
            FileUploader::upload($request->favicon, 'public/storage/logo/favicon/' . $favicon_file_name);
        }

        return ApiResponse::success(null, 'Logos updated successfully');
    }

    public function live_video_edit_form()
    {
        return ApiResponse::success(null, 'Live video settings form retrieved successfully');
    }

    public function live_video_update(Request $request)
    {
        $data = [
            'api_key' => $request->api_key,
            'api_secret' => $request->api_secret,
        ];

        Setting::where('type', 'zoom_configuration')->update(['description' => json_encode($data)]);
        return ApiResponse::success(null, 'Live video settings updated successfully');
    }

    public function system_settings_color_save(Request $request, $themeColor)
    {
        Setting::where('type', 'theme_color')->update(['description' => $themeColor]);
        return ApiResponse::success(null, 'System color updated successfully');
    }

    public function zitsi_video_edit_form()
    {
        return ApiResponse::success(null, 'Zitsi live settings form retrieved successfully');
    }

    public function zitsi_live_video_update(Request $request)
    {
        $data = [
            'account_email' => $request->account_email,
            'jitsi_app_id' => $request->jitsi_app_id,
            'jitsi_jwt' => $request->jitsi_jwt,
        ];

        Setting::where('type', 'zitsi_configuration')->update(['description' => json_encode($data)]);
        return ApiResponse::success(null, 'Zitsi live settings updated successfully');
    }

    public function all_settings_view()
    {
        return ApiResponse::success(null, 'All settings retrieved successfully');
    }
}