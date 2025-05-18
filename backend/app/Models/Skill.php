<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    protected $fillable = ['name', 'slug', 'is_active'];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
