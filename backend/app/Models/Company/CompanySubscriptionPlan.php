<?php

namespace App\Models\Company;

use DB;
use Illuminate\Database\Eloquent\Model;

class CompanySubscriptionPlan extends Model
{
    protected $fillable = ['name', 'price', 'duration_days', 'features'];
    protected $casts = ['features' => 'array'];
}