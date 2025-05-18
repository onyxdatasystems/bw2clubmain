<?php

namespace App\Models\Training;

use App\Models\Initiative;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Cheer extends Model
{
    protected $fillable = ['initiative_id', 'user_id'];

    public function initiative()
    {
        return $this->belongsTo(Initiative::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}