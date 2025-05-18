<?php

namespace App\Models\Company;

use App\Models\Training\Training;
use Illuminate\Database\Eloquent\Model;

class CompanyTraining extends Model
{
    protected $fillable = ['company_id', 'training_id', 'subscription_date'];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function training()
    {
        return $this->belongsTo(Training::class);
    }
}
