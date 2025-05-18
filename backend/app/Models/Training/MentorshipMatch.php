<?php

namespace App\Models\Training;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class MentorshipMatch extends Model
{
    protected $fillable = [
        'mentee_id',
        'mentor_id',
        'topics',
        'status'
    ];

    protected $casts = [
        'topics' => 'array'
    ];

    // Relationships
    public function mentee()
    {
        return $this->belongsTo(User::class, 'mentee_id');
    }

    public function mentor()
    {
        return $this->belongsTo(User::class, 'mentor_id');
    }
}