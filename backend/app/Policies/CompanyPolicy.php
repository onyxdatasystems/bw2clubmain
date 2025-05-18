<?php

namespace App\Policies;

use App\Models\Company\Company;
use App\Models\User;

class CompanyPolicy
{
    public function manage(User $user, Company $company)
    {
        return $company->staff()
            ->where('user_id', $user->id)
            ->whereIn('role', ['admin', 'hr'])
            ->exists();
    }

    public function view(User $user, Company $company)
    {
        return $company->staff()->where('user_id', $user->id)->exists();
    }

    public function create(User $user)
    {
        return $user->is_admin;
    }

    public function update(User $user, Company $company)
    {
        return $company->staff()
            ->where('user_id', $user->id)
            ->whereIn('role', ['admin', 'hr'])
            ->exists();
    }

    public function delete(User $user, Company $company)
    {
        return $company->staff()
            ->where('user_id', $user->id)
            ->where('role', 'admin')
            ->exists();
    }

    public function addStaff(User $user, Company $company)
    {
        return $company->staff()
            ->where('user_id', $user->id)
            ->whereIn('role', ['admin', 'hr'])
            ->exists();
    }

    public function viewBalance(User $user, Company $company)
    {
        return $company->staff()
            ->where('user_id', $user->id)
            ->whereIn('role', ['admin', 'hr', 'manager'])
            ->exists();
    }

    public function viewTransactions(User $user, Company $company)
    {
        return $company->staff()
            ->where('user_id', $user->id)
            ->whereIn('role', ['admin', 'hr', 'manager'])
            ->exists();
    }

    public function createTransaction(User $user, Company $company)
    {
        return $company->staff()
            ->where('user_id', $user->id)
            ->whereIn('role', ['admin', 'hr'])
            ->exists();
    }

    public function viewTransaction(User $user, Company $company, CompanyTransaction $transaction)
    {
        return $transaction->company_id === $company->id &&
            $this->viewTransactions($user, $company);
    }
}