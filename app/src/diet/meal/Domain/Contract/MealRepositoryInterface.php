<?php

namespace Src\diet\meal\Domain\Contract;

interface MealRepositoryInterface
{
    public function all(array $filters): array;
    public function create(array $data, int $userId): array;
}