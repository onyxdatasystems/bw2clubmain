<?php

namespace App\Listeners;

use App\Events\CourseProgressUpdated;
use App\Models\Training\CourseEnrollment;

class UpdateCourseProgress
{
    public function handle(CourseProgressUpdated $event)
    {
        // Update the course enrollment progress
        CourseEnrollment::updateOrCreate(
            [
                'user_id' => $event->user->id,
                'course_id' => $event->course->id
            ],
            ['progress' => $event->progress]
        );

        // Add additional logic if needed
    }
}