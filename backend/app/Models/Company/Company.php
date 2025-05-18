<?php

namespace App\Models\Company;

use App\Models\ThematicGroup;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Company extends Model
{
    protected $fillable = [
        'name', 'description', 'required_skills',
        'job_titles', 'location', 'balance'
    ];

    protected $casts = [
        'required_skills' => 'array',
        'job_titles' => 'array',
        'balance' => 'decimal:2'
    ];

    /*public function scopeSearch($query, array $filters)
    {
        return $query->when($filters['skills'] ?? false, function ($query, $skills) {
            $query->whereJsonContains('required_skills', $skills);
        })
            ->when($filters['location'] ?? false, function ($query, $location) {
                $query->where('location', 'like', "%$location%");
            })
            ->when($filters['job_title'] ?? false, function ($query, $jobTitle) {
                $query->whereJsonContains('job_titles', $jobTitle);
            })
            ->when($filters['year_of_study'] ?? false, function ($query, $year) {
                $query->where('year_of_study_target', $year);
            });
    }*/
    public function thematicGroups()
    {
        return $this->hasMany(ThematicGroup::class);
    }
    // Add to Company model
    public function scopeSearch($query, $searchTerm)
    {
        return $query->where('name', 'like', "%$searchTerm%")
            ->orWhere('description', 'like', "%$searchTerm%")
            ->orWhereJsonContains('required_skills', $searchTerm)
            ->orWhereJsonContains('job_titles', $searchTerm);
    }

    public function staff(): BelongsToMany
    {
        return $this->belongsToMany(User::class)
            ->withPivot('role')
            ->withTimestamps();
    }

    public function subscriptions()
    {
        return $this->hasMany(CompanySubscription::class);
    }

    public function transactions()
    {
        return $this->hasMany(CompanyTransaction::class);
    }

    public function getBalanceAttribute($value): float
    {
        return (float) $value;
    }

    public function advertisements(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(CompanyAdvertisement::class);
    }
}