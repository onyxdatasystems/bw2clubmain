<?php

namespace App\Events;

use App\Models\User;
use App\Models\Course;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
class CourseProgressUpdated implements ShouldQueue
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $user;
    public $course;
    public $progress;
    public $connection = 'redis';
    public $queue = 'progress_updates';

    /**
     * Create a new event instance.
     */
    public function __construct(User $user, Course $course, float $progress)
    {
        $this->user = $user;
        $this->course = $course;
        $this->progress = $progress;
    }
}