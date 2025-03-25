<?php

namespace App\Models;
use DB;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Session;

class Job extends Model
{
    use HasFactory;

    public function getUser(){
        return $this->belongsTo(User::class,'user_id');
    }

    public function cagtegory(){
        return $this->belongsTo(JobCategory::class,'category_id');
    }


    
    public static function add_payment_success($identifier, $transaction_keys = array())
    {
        $payment_details = session('payment_details');
        $transaction_keys = json_encode($transaction_keys);
        $data['paid_amount'] = $payment_details['payable_amount'];
        $data['is_published'] = 1;
        $data['start_date'] = $payment_details['custom_field']['start_date'];
        $dateString = $payment_details['custom_field']['end_date'];
        $newTimestamp = strtotime($dateString);
        $newDateString = date('Y-m-d H:i:s', $newTimestamp);
        $data['end_date'] = $newDateString ;
       
        $data['updated_at'] = date('Y-m-d H:i:s');
        $data['id'] = $payment_details['items'][0]['id'];
        DB::table('jobs')->updateOrInsert(['id' => $data['id']], $data);
        

        $payment_data['item_type'] = 'job';
        $payment_data['item_id'] = $payment_details['items'][0]['id'];
        $payment_data['user_id'] = auth()->user()->id;
        $payment_data['amount'] = $payment_details['payable_amount'];
        $payment_data['identifier'] = $identifier;
        $payment_data['transaction_keys'] = $transaction_keys;
        $payment_data['currency'] = get_settings('system_currency');
        $payment_data['created_at'] = date('Y-m-d H:i:s');
        $payment_data['updated_at'] = date('Y-m-d H:i:s');
        DB::table('payment_histories')->insert($payment_data);

        session(['payment_details' => array()]);
        Session::flash('success_message', get_phrase('Payment successfully done!'));
        return redirect()->route('job.myjob');
    }



    

}
