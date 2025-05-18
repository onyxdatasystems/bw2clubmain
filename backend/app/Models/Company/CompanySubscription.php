<?php

namespace App\Models\Company;

use App\Models\CompanySubscriptionPlan;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class CompanySubscription extends Model
{
    protected $fillable = [
        'company_id', 'plan_type', 'features',
        'start_date', 'end_date', 'payment_history'
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function plan()
    {
        return $this->belongsTo(CompanySubscriptionPlan::class, 'subscription_plan_id');
    }
}
