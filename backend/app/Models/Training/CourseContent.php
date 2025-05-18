<?php
namespace App\Models\Training;
use Illuminate\Database\Eloquent\Model;

class CourseContent extends Model
{
    protected $casts = [
        'is_downloadable' => 'boolean',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}