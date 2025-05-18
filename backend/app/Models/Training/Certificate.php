<?php
namespace App\Models\Training;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    protected $casts = [
        'issue_date' => 'date',
        'expiry_date' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
