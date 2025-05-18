<?php

namespace App\Policies;

use App\Models\Training\Course;
use App\Models\User;

class CoursePolicy
{
    public function manage(User $user)
    {
        return in_array($user->role, ['admin', 'trainer']);
    }

    public function create(User $user)
    {
        return $user->isInstructor() || $user->isAdmin();
    }

    public function update(User $user, Course $course)
    {
        return $user->isAdmin() ||
            ($user->isInstructor() && $course->instructor_id === $user->id);
    }

    public function delete(User $user, Course $course)
    {
        return $user->isAdmin();
    }

    public function assignInstructor(User $user, Course $course)
    {
        return $user->isAdmin();
    }

    public function publish(User $user, Course $course)
    {
        return $user->isAdmin() || $course->instructor_id === $user->id;
    }
}