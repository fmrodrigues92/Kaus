<?php

namespace Src\diet\meal\Application;

use Src\diet\meal\Domain\Contract\MealRepositoryInterface;

class CreateMealsUseCase
{

    public function __construct(
        private readonly MealRepositoryInterface $mealRepository
    )
    {
        //
    }

    public function execute(array $data): array
    {
        // Business logic to create a new meal
        return $this->mealRepository->create($data['meal'], $data['user_id']);  
    }
}