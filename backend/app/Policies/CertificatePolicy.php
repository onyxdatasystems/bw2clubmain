<?php

namespace App\Policies;

use App\Models\Company\Company;
use App\Models\Course;
use App\Models\User;

class CertificatePolicy
{
    public function view(User $user, Certificate $certificate)
    {
        return $user->id === $certificate->user_id ||
            $user->isAdmin() ||
            $certificate->course->instructor_id === $user->id;
    }
}