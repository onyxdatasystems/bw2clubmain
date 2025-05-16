<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobWishlist extends Model
{
    use HasFactory;
    protected $table = 'job_wishlists';
    public function getUser(){
        return $this->belongsTo(User::class,'user_id');
    }

}

