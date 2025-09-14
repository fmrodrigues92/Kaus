<?php

namespace Src\diet\meal\Domain\Entity;

use Src\diet\food\Domain\Entity\Food;

class MealItem
{
    public int $id;
    public Food $food;
    public float $quantity;

    public function __construct(
        int $id,
        Food $food,
        float $quantity
    )
    {
        $this->id = $id;
        $this->food = $food;
        $this->quantity = $quantity;
        $this->food = $food;
    }
}