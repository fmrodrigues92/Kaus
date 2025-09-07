<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Src\diet\food\Domain\Contract\FoodRepositoryInterface;
use Src\diet\food\Infrastructure\Persistence\FoodEloquentRepository;
use Src\diet\meal\Domain\Contract\MealRepositoryInterface;
use Src\diet\meal\Infrastructure\Persistence\MealEloquentRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(
            FoodRepositoryInterface::class,
            FoodEloquentRepository::class
        );

        $this->app->bind(
            MealRepositoryInterface::class,
            MealEloquentRepository::class
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
