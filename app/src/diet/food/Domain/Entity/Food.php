<?php

namespace Src\diet\food\Domain\Entity;

class Food
{
    public int $id;
    public string $name;
    public ?float $kcal_per_100g;
    public ?float $carbohydrates_per_100g;
    public ?float $proteins_per_100g;
    public ?float $fats_per_100g;
    public ?float $fiber_per_100g;
    public ?float $sodium_per_100g;
    public ?string $createdAt;
    public ?string $updatedAt;

    public function __construct(
        int $id,
        string $name,
        ?float $kcal_per_100g,
        ?float $carbohydrates_per_100g,
        ?float $proteins_per_100g,
        ?float $fats_per_100g,
        ?float $fiber_per_100g = null,
        ?float $sodium_per_100g = null,
        ?string $createdAt = null,
        ?string $updatedAt = null
    ) {
        $this->id = $id;
        $this->name = $name;
        $this->kcal_per_100g = $kcal_per_100g;
        $this->carbohydrates_per_100g = $carbohydrates_per_100g;
        $this->proteins_per_100g = $proteins_per_100g;
        $this->fats_per_100g = $fats_per_100g;
        $this->fiber_per_100g = $fiber_per_100g;
        $this->sodium_per_100g = $sodium_per_100g;
        $this->createdAt = $createdAt;
        $this->updatedAt = $updatedAt;
    }
}