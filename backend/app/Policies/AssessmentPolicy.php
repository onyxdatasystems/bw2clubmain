<?php

namespace App\Policies;

use App\Models\Assessment;
use App\Models\Course;
use App\Models\User;

class AssessmentPolicy
{
    public function update(User $user, Assessment $assessment)
    {
        return $user->isAdmin() || $assessment->course->instructors->contains($user->id);
    }

    public function delete(User $user, Assessment $assessment)
    {
        return $user->isAdmin() || $assessment->course->instructors->contains($user->id);
    }
    public function createAssessment(User $user, Course $course)
    {
        return $user->isAdmin() || $course->instructor_id === $user->id;
    }

    public function grade(User $user, Assessment $assessment)
    {
        return $user->isAdmin() || $assessment->course->instructor_id === $user->id;
    }
}