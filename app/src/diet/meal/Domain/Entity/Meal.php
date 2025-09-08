<?php

namespace Src\diet\meal\Domain\Entity;

class Meal
{
    public int $id;
    public int $user_id;
    public string $name;
    public ?string $meal_datetime = null;
    public ?string $createdAt = null;
    public ?string $updatedAt = null;
    public ?int $total_kcal = null;
    public ?int $total_carbohydrates = null;
    public ?int $total_proteins = null;
    public ?int $total_fats = null;
    public ?int $total_fiber = null;
    public ?int $total_sodium = null;

    public function __construct(
        int $id,
        int $user_id,
        string $name,
        ?string $meal_datetime = null,
        ?string $createdAt = null,
        ?string $updatedAt = null,
        ?int $total_kcal = null,
        ?int $total_carbohydrates = null,
        ?int $total_proteins = null,
        ?int $total_fats = null,
        ?int $total_fiber = null,
        ?int $total_sodium = null
    )
    {
        $this->id = $id;
        $this->user_id = $user_id;
        $this->name = $name;
        $this->meal_datetime = $meal_datetime;
        $this->createdAt = $createdAt;
        $this->updatedAt = $updatedAt;
        $this->total_kcal = $total_kcal;
        $this->total_carbohydrates = $total_carbohydrates;
        $this->total_proteins = $total_proteins;
        $this->total_fats = $total_fats;
        $this->total_fiber = $total_fiber;
        $this->total_sodium = $total_sodium;
    }
}