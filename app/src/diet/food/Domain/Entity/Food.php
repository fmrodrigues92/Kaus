<?php

namespace Src\diet\food\Domain\Entity;

class Food
{
    public int $id;
    public string $name;
    public int $kcal_per_100g;
    public int $carbohydrates_per_100g;
    public int $proteins_per_100g;
    public int $fats_per_100g;
    public ?int $fiber_per_100g;
    public ?int $sodium_per_100g;
    public ?string $createdAt;
    public ?string $updatedAt;

    public function __construct(
        int $id,
        string $name,
        int $kcal_per_100g,
        int $carbohydrates_per_100g,
        int $proteins_per_100g,
        int $fats_per_100g,
        ?int $fiber_per_100g = null,
        ?int $sodium_per_100g = null,
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