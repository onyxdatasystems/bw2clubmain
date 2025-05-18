<?php

namespace App\Models\Company;

use App\Models\Training;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

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
