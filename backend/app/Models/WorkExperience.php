<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WorkExperience extends Model
{
    protected $fillable = [
        'user_id',
        'company',
        'position',
        'description',
        'start_date',
        'end_date',
        'is_current_position'
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'is_current_position' => 'boolean'
    ];

    /**
     * Get the user that owns the work experience.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope to get current positions
     */
    public function scopeCurrent($query)
    {
        return $query->where('is_current_position', true);
    }
}