<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaidContentPayout extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'requested_amount',
        'issue_date',
        'received_date',
        'payment_method',
        'status',
    ];
}
