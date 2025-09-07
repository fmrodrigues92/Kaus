<?php

namespace Src\diet\food\Domain\Contract;

interface FoodRepositoryInterface
{
    public function all(): array;
}