<?php

namespace Src\diet\food\Application;

use Src\diet\food\Domain\Contract\FoodRepositoryInterface;

class ListFoodsUseCase
{

    public function __construct(
        private readonly FoodRepositoryInterface $foodRepository
    )
    {
        //
    }

    public function execute(): array
    {
        // Business logic to list all food items
        return $this->foodRepository->all();
    }
}