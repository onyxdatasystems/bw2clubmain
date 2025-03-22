<?php

namespace App\Http\Controllers;

use Anand\LaravelPaytmWallet\Facades\PaytmWallet;
use App\Models\Users;
use App\Models\Paystack;
use DB;
use Illuminate\Http\Request;
use Session;
use App\Helpers\ApiResponse; // Import the ApiResponse helper

class PaymentController extends Controller
{
    public function index()
    {
        $payment_details = session('payment_details');
        if (!$payment_details || !is_array($payment_details) || count($payment_details) <= 0) {
            return ApiResponse::error(null, 'Payment not configured yet', 400);
        }
        if ($payment_details['payable_amount'] <= 0) {
            return ApiResponse::error(null, 'Payable amount cannot be less than 1', 400);
        }

        $page_data['payment_details'] = $payment_details;
        $page_data['payment_gateways'] = DB::table('payment_gateways')->get();
        return ApiResponse::success($page_data, 'Payment details retrieved successfully');
    }

    public function show_payment_gateway_by_ajax($identifier)
    {
        $page_data['payment_details'] = session('payment_details');
        $page_data['payment_gateway'] = DB::table('payment_gateways')->where('identifier', $identifier)->first();

        if (!$page_data['payment_gateway']) {
            return ApiResponse::error(null, 'Payment gateway not found', 404);
        }

        return ApiResponse::success($page_data, 'Payment gateway details retrieved successfully');
    }

    public function payment_success($identifier, Request $request)
    {
        $payment_details = session('payment_details');
        $payment_gateway = DB::table('payment_gateways')->where('identifier', $identifier)->first();

        if (!$payment_gateway) {
            return ApiResponse::error(null, 'Payment gateway not found', 404);
        }

        $model_name = $payment_gateway->model_name;
        $model_full_path = 'App\Models\payment_gateway\\' . str_replace(' ', '', $model_name);

        // Instantiate the payment gateway class
        $paystack = new $model_full_path();

        // Call the payment_status method on the instantiated object
        if ($paystack) {
            $status = $paystack->payment_status($identifier, $request->all());
        } else {
            $status = $model_full_path::payment_status($identifier, $request->all());
        }

        if ($status === true) {
            $success_model = $payment_details['success_method']['model_name'];
            $success_function = $payment_details['success_method']['function_name'];
            $model_full_path = 'App\Models\\' . str_replace(' ', '', $success_model);

            return ApiResponse::success(null, 'Payment successful');
        } else {
            return ApiResponse::error(null, 'Payment failed! Please try again.', 400);
        }
    }

    public function payment_create($identifier)
    {
        $payment_details = session('payment_details');
        $payment_gateway = DB::table('payment_gateways')->where('identifier', $identifier)->first();

        if (!$payment_gateway) {
            return ApiResponse::error(null, 'Payment gateway not found', 404);
        }

        $model_name = $payment_gateway->model_name;
        $model_full_path = 'App\Models\payment_gateway\\' . str_replace(' ', '', $model_name);
        $created_payment_link = $model_full_path::payment_create($identifier);

        return ApiResponse::success(['payment_link' => $created_payment_link], 'Payment link created successfully');
    }

    public function payment_razorpay($identifier)
    {
        $payment_details = session('payment_details');
        $payment_gateway = DB::table('payment_gateways')->where('identifier', $identifier)->first();

        if (!$payment_gateway) {
            return ApiResponse::error(null, 'Payment gateway not found', 404);
        }

        $model_name = $payment_gateway->model_name;
        $model_full_path = 'App\Models\payment_gateway\\' . str_replace(' ', '', $model_name);
        $data = $model_full_path::payment_create($identifier);

        return ApiResponse::success($data, 'Razorpay payment data retrieved successfully');
    }

    public function payment_paytm(Request $request)
    {
        $user = Users::where('id', $request->user)->first();

        if (!$user) {
            return ApiResponse::error(null, 'User not found', 404);
        }

        $payment = PaytmWallet::with('receive');
        $payment->prepare([
            'order' => $user->phone . "_" . rand(1, 1000),
            'user' => auth()->user()->id,
            'mobile_number' => $user->phone,
            'email' => $user->email,
            'amount' => $request->amount,
            'callback_url' => route('payment.status', ['identifier' => 'paytm']),
        ]);

        return ApiResponse::success(['payment_data' => $payment->receive()], 'Paytm payment initiated successfully');
    }

    public function paytm_paymentCallback()
    {
        $transaction = PaytmWallet::with('receive');
        $response = $transaction->response();
        $order_id = $transaction->getOrderId();

        if ($transaction->isSuccessful()) {
            Paytm::where('order_id', $order_id)->update(['status' => 1, 'transaction_id' => $transaction->getTransactionId()]);
            return ApiResponse::success(null, 'Your payment is successful');
        } else if ($transaction->isFailed()) {
            Paytm::where('order_id', $order_id)->update(['status' => 0, 'transaction_id' => $transaction->getTransactionId()]);
            return ApiResponse::error(null, 'Your payment is failed', 400);
        } else if ($transaction->isOpen()) {
            Paytm::where('order_id', $order_id)->update(['status' => 2, 'transaction_id' => $transaction->getTransactionId()]);
            return ApiResponse::error(null, 'Your payment is processing', 202);
        }

        return ApiResponse::error(null, 'Payment callback failed', 400);
    }
}