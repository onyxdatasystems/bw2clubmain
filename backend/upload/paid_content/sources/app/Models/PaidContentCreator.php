<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaidContentCreator extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'sub_title',
        'description',
        'bio',
        'cover_photo',
        'logo',
        'social_accounts',
        'status',
        'config_setting',
    ];
}
