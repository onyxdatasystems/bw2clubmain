<?php
namespace App\Models;

use App\Models\Company\Company;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ThematicGroup extends Model
{
    protected $fillable = [
        'company_id', 'name', 'theme',
        'purpose', 'tags', 'photo_url'
    ];

    protected $casts = [
        'tags' => 'array'
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function members()
    {
        return $this->belongsToMany(User::class)
            ->withPivot('role')
            ->withTimestamps();
    }

    public function initiatives()
    {
        return $this->hasMany(Initiative::class);
    }
}