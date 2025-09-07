<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Food extends Model
{
    protected $table = 'foods';

    protected $fillable = [
        'name',
        'kcal_per_100g',
        'carbohydrates_per_100g',
        'proteins_per_100g',
        'fats_per_100g',
        'fiber_per_100g',
        'sodium_per_100g',
    ];
}
