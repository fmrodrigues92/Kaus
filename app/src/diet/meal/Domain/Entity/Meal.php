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

    public function __construct(
        int $id,
        int $user_id,
        string $name,
        ?string $meal_datetime = null,
        ?string $createdAt = null,
        ?string $updatedAt = null
    )
    {
        $this->id = $id;
        $this->user_id = $user_id;
        $this->name = $name;
        $this->meal_datetime = $meal_datetime;
        $this->createdAt = $createdAt;
        $this->updatedAt = $updatedAt;
    }
}