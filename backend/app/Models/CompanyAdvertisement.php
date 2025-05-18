<?php

namespace App\Models;

use App\Models\Company\Company;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyAdvertisement extends Model
{
    use HasFactory;

    protected $table = 'company_advertisements'; // Explicit table name

    protected $fillable = [
        'company_id',
        'title',
        'description',
        'target_audience',
        'budget',
        'start_date',
        'end_date',
        'status'
    ];

    protected $casts = [
        'target_audience' => 'array',
        'start_date' => 'date',
        'end_date' => 'date'
    ];

    public const STATUSES = [
        'active' => 0,
        'paused' => 1,
        'ended' => 2
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}