<?php

namespace App\Http\Controllers;

use App\Models\FileUploader;
use App\Models\Sponsor;
use Illuminate\Http\Request;
use App\Helpers\ApiResponse; // Import the ApiResponse helper
use Carbon\Carbon;

class UserController extends Controller
{
    public function dashboard()
    {
        // For API-only applications, return a JSON response instead of a view.
        return ApiResponse::success([], "Dashboard data fetched successfully", 200);
    }

    public function ads()
    {
        $ads = Sponsor::where('user_id', auth()->user()->id)->get();
        return ApiResponse::success($ads, "Ads fetched successfully", 200);
    }

    public function ad_create()
    {
        // For API-only applications, return a JSON response instead of a view.
        return ApiResponse::success([], "Ad creation form data", 200);
    }

    public function ad_store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|max:255|string',
            'image' => ['required', 'mimes:jpg,jpeg,png'],
        ]);

        $data = [
            'status' => 1,
            'user_id' => auth()->user()->id,
            'name' => $request->name,
            'description' => $request->description,
            'ext_url' => $request->ext_url,
            'image' => random(40) . '.' . $request->image->extension(),
        ];

        Sponsor::create($data);
        FileUploader::upload($request->image, 'public/storage/sponsor/thumbnail/' . $data['image'], 300);

        return ApiResponse::success($data, "Ad created successfully", 201);
    }

    public function ad_edit($id)
    {
        $ad = Sponsor::where('id', $id)->where('user_id', auth()->user()->id)->first();
        if (!$ad) {
            return ApiResponse::error(null, "Ad not found", 404);
        }

        return ApiResponse::success($ad, "Ad data fetched successfully", 200);
    }

    public function ad_update($id, Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|max:255|string',
        ]);

        $ad = Sponsor::where('id', $id)->where('user_id', auth()->user()->id)->first();
        if (!$ad) {
            return ApiResponse::error(null, "Ad not found", 404);
        }

        $data = [
            'name' => $request->name,
            'description' => $request->description,
            'ext_url' => $request->ext_url,
        ];

        if ($request->hasFile('image')) {
            $data['image'] = random(40) . '.' . $request->image->extension();
            remove_file('public/storage/sponsor/thumbnail/' . $ad->image);
            FileUploader::upload($request->image, 'public/storage/sponsor/thumbnail/' . $data['image'], 300);
        }

        $ad->update($data);

        return ApiResponse::success($ad, "Ad updated successfully", 200);
    }

    public function ad_delete($id)
    {
        $ad = Sponsor::where('id', $id)->where('user_id', auth()->user()->id)->first();
        if (!$ad) {
            return ApiResponse::error(null, "Ad not found", 404);
        }

        remove_file('public/storage/sponsor/thumbnail/' . $ad->image);
        $ad->delete();

        return ApiResponse::success(null, "Ad deleted successfully", 200);
    }

    public function ad_activation($id, Request $request)
    {
        $ad = Sponsor::where('id', $id)->where('user_id', auth()->user()->id)->first();
        if (!$ad) {
            return ApiResponse::error(null, "Ad not found", 404);
        }

        return ApiResponse::success($ad, "Ad activation data fetched successfully", 200);
    }

    public function ad_charge_by_daterange(Request $request)
    {
        $total_days = Carbon::parse($request->start_date)->diffInDays($request->end_date);

        if (strtotime($request->start_date) < strtotime($request->end_date)) {
            $charge = $total_days * get_settings('ad_charge_per_day');
            return ApiResponse::success(['charge' => $charge], "Ad charge calculated successfully", 200);
        }

        return ApiResponse::error(null, "Invalid date range", 400);
    }

    public function payment_configuration($id, Request $request)
    {
        $request->validate([
            'start_date' => 'required',
            'end_date' => 'required',
        ]);

        $total_days = Carbon::parse($request->start_date)->diffInDays($request->end_date);
        $payable_amount = ($total_days * get_settings('ad_charge_per_day')) + get_settings('ad_charge_per_day');
        $start_timestamp = strtotime($request->start_date . ' ' . date('H:i:s'));
        $end_timestamp = strtotime($request->end_date . ' ' . date('H:i:s'));

        $payment_details = [
            'items' => [
                [
                    'id' => $id,
                    'title' => get_phrase('Ad Activation for ____ days', [$total_days]),
                    'subtitle' => get_phrase('Your ad will be published on ____', [$request->start_date]),
                    'price' => $payable_amount,
                    'discount_price' => $payable_amount,
                    'discount_percentage' => 0,
                ],
            ],
            'custom_field' => [
                'start_date' => date('Y-m-d H:i:s', $start_timestamp),
                'end_date' => date('Y-m-d H:i:s', $end_timestamp),
                'user_id' => auth()->user()->id,
            ],
            'success_method' => [
                'model_name' => 'Sponsor',
                'function_name' => 'add_payment_success',
            ],
            'tax' => 0,
            'coupon' => null,
            'payable_amount' => $payable_amount,
            'cancel_url' => route('user.ads'),
            'success_url' => route('payment.success', ''),
        ];

        return ApiResponse::success($payment_details, "Payment configuration fetched successfully", 200);
    }
}