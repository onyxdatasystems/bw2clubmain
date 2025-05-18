<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class AssessmentQuestion extends Model
{
    protected $casts = [
        'options' => 'array',
    ];

    public function assessment()
    {
        return $this->belongsTo(Assessment::class);
    }
}