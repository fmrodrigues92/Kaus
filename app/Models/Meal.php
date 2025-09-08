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

    //appends ('total_kcal', 'total_carbohydrates', 'total_proteins', 'total_fats', 'total_fiber', 'total_sodium');
    protected $appends = [
        'total_kcal', 
        'total_carbohydrates', 
        'total_proteins', 
        'total_fats', 
        'total_fiber', 
        'total_sodium'
    ];

    public function getMealDatetimeAttribute($value)
    {
        return $value ? (new \DateTime($value))->format('D, d/m/Y - H:i') : null;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function mealItems()
    {
        return $this->hasMany(MealItem::class);
    }

    public function getTotalKcalAttribute()
    {
        return $this->mealItems->sum(function ($item) {
            return ($item->food->kcal_per_100g * $item->quantity);
        });
    }

    public function getTotalCarbohydratesAttribute()
    {
        return $this->mealItems->sum(function ($item) {
            return ($item->food->carbohydrates_per_100g * $item->quantity);
        });
    }

    public function getTotalProteinsAttribute()
    {
        return $this->mealItems->sum(function ($item) {
            return ($item->food->proteins_per_100g * $item->quantity);
        });
    }

    public function getTotalFatsAttribute()
    {
        return $this->mealItems->sum(function ($item) {
            return ($item->food->fats_per_100g * $item->quantity);
        });
    }

    public function getTotalFiberAttribute()
    {
        return $this->mealItems->sum(function ($item) {
            return ($item->food->fiber_per_100g * $item->quantity);
        });
    }

    public function getTotalSodiumAttribute()
    {
        return $this->mealItems->sum(function ($item) {
            return ($item->food->sodium_per_100g * $item->quantity);
        });
    }
}
