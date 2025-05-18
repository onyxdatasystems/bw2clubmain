<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class AssessmentSubmission extends Model
{
    protected $casts = [
        'answers' => 'array',
        'submitted_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function assessment()
    {
        return $this->belongsTo(Assessment::class);
    }
}