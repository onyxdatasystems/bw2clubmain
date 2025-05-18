<?php

namespace App\Models;

use DB;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Session;

class CompanySubscriptionPlan extends Model
{
    protected $fillable = ['name', 'price', 'duration_days', 'features'];
    protected $casts = ['features' => 'array'];
}