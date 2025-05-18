<?php

// app/Models/CourseEnrollment.php
namespace App\Models\Training;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class CourseEnrollment extends Model
{
    protected $fillable = [
        'user_id',
        'course_id',
        'enrolled_at',
        'progress',
        'completed_at',
        'payment_reference'
    ];

    protected $casts = [
        'enrolled_at' => 'datetime',
        'completed_at' => 'datetime',
        'progress' => 'decimal:2'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function scopeCompleted($query)
    {
        return $query->whereNotNull('completed_at');
    }

    public function markCompleted()
    {
        return $this->update([
            'progress' => 100,
            'completed_at' => now()
        ]);
    }
}
