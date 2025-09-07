<?php

namespace Src\diet\meal\Domain\Contract;

interface MealRepositoryInterface
{
    public function all(): array;
}