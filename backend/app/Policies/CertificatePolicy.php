<?php

namespace App\Policies;

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