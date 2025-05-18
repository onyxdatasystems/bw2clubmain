<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Assessment extends Model
{
    protected $casts = [
        'questions' => 'array',
        'auto_grade' => 'boolean',
        'available_from' => 'datetime',
        'available_to' => 'datetime',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function questions()
    {
        return $this->hasMany(AssessmentQuestion::class);
    }

    public function submissions()
    {
        return $this->hasMany(AssessmentSubmission::class);
    }

    public function results()
    {
        return $this->hasMany(AssessmentResult::class);
    }
}
