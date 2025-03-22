<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\payment_gateway\Paypal;
use DB;
use App\Helpers\ApiResponse; // Import the ApiResponse helper

class PaymentHistory extends Controller
{
    public function index()
    {
        // Check if the user is an admin
        if (auth()->user()->user_role == 'admin') {
            $payment_histories = DB::table('payment_histories')->get();
        } else {
            $payment_histories = DB::table('payment_histories')->where('user_id', auth()->user()->id)->get();
        }

        // Prepare the response data
        $response_data = [
            'payment_histories' => $payment_histories,
        ];

        // Return the response using ApiResponse
        return ApiResponse::success($response_data, 'Payment histories retrieved successfully');
    }
}