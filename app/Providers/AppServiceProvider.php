<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Src\diet\food\Domain\Contract\FoodRepositoryInterface;
use Src\diet\food\Infrastructure\Persistence\FoodEloquentRepository;

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
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
