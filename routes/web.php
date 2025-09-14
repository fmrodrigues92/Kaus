<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\FoodController;
use App\Http\Controllers\MealController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('foods', [FoodController::class, 'index'])->name('foods.index');

    Route::get('meals', [MealController::class, 'index'])->name('meals.index');
    Route::post('meals', [MealController::class, 'store'])->name('meals.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
