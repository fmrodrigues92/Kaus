<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Meal extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'meal_datetime',
    ];

    protected $casts = [
        'meal_datetime' => 'datetime',
    ];

    public function getMealDatetimeAttribute($value)
    {
        return $value ? (new \DateTime($value))->format('D, d/m/Y - H:i') : null;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
