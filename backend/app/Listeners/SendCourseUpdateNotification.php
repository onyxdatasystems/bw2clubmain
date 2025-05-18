<?php
namespace App\Listeners;
class SendCourseUpdateNotification
{
    public function handle(CourseUpdated $event)
    {
        $event->course->enrolledUsers->each(function ($user) use ($event) {
            $user->notify(new CourseUpdatedNotification($event->course));
        });
    }
}