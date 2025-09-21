<?php

namespace Src\diet\meal\Application;

use Src\diet\meal\Domain\Contract\MealRepositoryInterface;

class ListMealsUseCase
{

    public function __construct(
        private readonly MealRepositoryInterface $mealRepository
    )
    {
        //
    }

    public function execute(array $filters): array
    {
        // Business logic to list all food items
        return $this->mealRepository->all($filters);
    }
}