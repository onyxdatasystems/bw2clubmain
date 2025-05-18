<?php

namespace App\Policies;

use App\Models\User;
use App\Models\ThematicGroup;

class ThematicGroupPolicy
{
    public function manageMembers(User $user, ThematicGroup $group)
    {
        return $group->members()
            ->where('user_id', $user->id)
            ->where('role', 'leader')
            ->exists();
    }

    public function update(User $user, ThematicGroup $group)
    {
        return $group->members()
            ->where('user_id', $user->id)
            ->whereIn('role', ['leader', 'contributor'])
            ->exists();
    }

    public function delete(User $user, ThematicGroup $group)
    {
        return $group->company->staff()
            ->where('user_id', $user->id)
            ->whereIn('role', ['admin', 'hr'])
            ->exists();
    }

    public function addInitiative(User $user, ThematicGroup $group)
    {
        return $group->members()
            ->where('user_id', $user->id)
            ->whereIn('role', ['leader', 'contributor', 'members'])
            ->exists();
    }

    public function viewMembers(User $user, ThematicGroup $group)
    {
        return $group->members()->where('user_id', $user->id)->exists();
    }
}