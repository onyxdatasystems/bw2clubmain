<?php

namespace App\Models;

use DB;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Session;

class Subscription extends Model
{
    use HasFactory;

    public static function subscription_payment($identifier)
    {
        $payment_details = session('payment_details');
        $transaction_keys = session('keys');
        $transaction_keys = json_encode($transaction_keys);
        $admin_commission = DB::table('settings')->where('type', 'commission_rate')->value('description');

        $data['subscriber_id'] = $payment_details['custom_field']['user_id'];
        $data['creator_id'] = $payment_details['custom_field']['creator_id'];
        $data['package_id'] = $payment_details['custom_field']['package_id'];
        $data['issue_date'] = $payment_details['custom_field']['issue_date'];
        $data['expire_date'] = $payment_details['custom_field']['expire_date'];
        $data['admin_commission'] = $admin_commission;
        $data['status'] = 1;
        $data['created_at'] = date('Y-m-d H:i:s');
        $data['updated_at'] = date('Y-m-d H:i:s');

        // new subscription added
        DB::table('paid_content_subscriptions')->insert($data);

        $payment_data['item_type'] = 'subscription';
        $payment_data['item_id'] = $payment_details['items'][0]['id'];
        $payment_data['user_id'] = auth()->user()->id; // subscriber id
        $payment_data['amount'] = $payment_details['payable_amount'];
        $payment_data['currency'] = get_settings('system_currency');
        $payment_data['identifier'] = $identifier;
        $payment_data['transaction_keys'] = $transaction_keys;
        $payment_data['created_at'] = date('Y-m-d H:i:s');
        $payment_data['updated_at'] = date('Y-m-d H:i:s');

        // new payment for subscription
        DB::table('payment_histories')->insert($payment_data);

        session(['payment_details' => array()]);
        Session::flash('success_message', 'Subscription completed.');
        return redirect($payment_details['cancel_url']);
        // cancel url redirects selected creator page
        // it doesn't cancel any process
    }
}
