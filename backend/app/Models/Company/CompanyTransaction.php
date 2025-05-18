<?php
namespace App\Models\Company;

use Illuminate\Database\Eloquent\Model;

class CompanyTransaction extends Model
{
    protected $fillable = [
        'company_id',
        'amount',
        'type',
        'reference',
        'description'
    ];

    protected $casts = [
        'amount' => 'float',
        'created_at' => 'datetime'
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}