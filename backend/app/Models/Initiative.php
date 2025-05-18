<?php

namespace App\Models;

use App\Models\Training\Cheer;
use App\Models\Training\Feedback;
use Illuminate\Database\Eloquent\Model;

class Initiative extends Model
{
    protected $fillable = [
        'thematic_group_id', 'title', 'description',
        'target_outcomes', 'start_date', 'end_date', 'created_by'
    ];

    protected $casts = [
        'target_outcomes' => 'array',
        'start_date' => 'date',
        'end_date' => 'date'
    ];

    // Relationships
    public function thematicGroup()
    {
        return $this->belongsTo(ThematicGroup::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function cheers()
    {
        return $this->hasMany(Cheer::class);
    }

    public function feedbacks()
    {
        return $this->hasMany(Feedback::class);
    }

    public function group()
    {
        return $this->belongsTo(ThematicGroup::class);
    }
}