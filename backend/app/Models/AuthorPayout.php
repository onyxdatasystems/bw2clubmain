<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class AuthorPayout extends Model
{
    use HasFactory;

    public static function make_author_payment($identifier)
    {
        $payment_details = session('payment_details');
        $transaction_keys = session('keys');
        $transaction_keys = json_encode($transaction_keys);

        $data['received_date'] = date('Y-m-d H:i:s');
        $data['payment_method'] = $identifier;
        $data['status'] = 1;
        $id = $payment_details['items'][0]['id'];
        $payment = PaidContentPayout::where('id', $id)->update($data);

        if ($payment) {
            $user_id = PaidContentPayout::where('id', $id)->value('user_id');

            $payment_data['item_type'] = 'author_payment';
            $payment_data['item_id'] = $id;
            $payment_data['user_id'] = $user_id;
            $payment_data['amount'] = $payment_details['payable_amount'];
            $payment_data['currency'] = get_settings('system_currency');
            $payment_data['identifier'] = $identifier;
            $payment_data['transaction_keys'] = $transaction_keys;
            $payment_data['created_at'] = date('Y-m-d H:i:s');
            $payment_data['updated_at'] = date('Y-m-d H:i:s');

            // author payment done
            DB::table('payment_histories')->insert($payment_data);
            flash()->addSuccess('Payment successfully done!');
        } else {
            flash()->addSuccess('Something went wrong.');
        }

        Session::forget('payment_details', 'keys');
        return redirect(route('pending.report'));
        //return redirect($payment_details['success_url']);
    }

}
