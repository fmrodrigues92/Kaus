<?php

namespace Src\diet\meal\Domain\Contract;

interface MealRepositoryInterface
{
    public function all(): array;
    public function create(array $data, int $userId): array;
}