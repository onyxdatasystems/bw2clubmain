<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class Donation extends Model
{
    use HasFactory;

    public static function make_donation($identifier)
    {
        $payment_details = session('payment_details');
        $transaction_keys = session('keys');
        $transaction_keys = json_encode($transaction_keys);

        $data['fundraiser_id'] = $payment_details['items'][0]['id'];
        $data['doner_id'] = auth()->user()->id;
        $data['user_id'] = $payment_details['custom_field']['user_id'];
        $data['amount'] = $payment_details['items'][0]['price'];
        $data['payment_getway'] = $identifier;
        $data['created_at'] = date('Y-m-d H:i:s');
        $data['updated_at'] = date('Y-m-d H:i:s');

        // new subscription added
        DB::table('fundraiser_donations')->insert($data);

        $payment_data['item_type'] = 'donation';
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

        //fundraiser_raised_amount_update
        $payment = DB::table('fundraiser_donations')
            ->where('fundraiser_id', $payment_details['items'][0]['id'])
            ->where('user_id', $data['user_id'])
            ->sum('amount');

        DB::table('fundraisers')->where('id', $payment_details['items'][0]['id'])->update(['raised_amount' => $payment]);

        session(['payment_details' => array()]);
        Session::flash('success_message', 'Donation completed.');
        return redirect($payment_details['cancel_url']);
        // cancel url redirects selected creator page
        // it doesn't cancel any process
    }
}
