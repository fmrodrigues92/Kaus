<?php

namespace Src\diet\meal\Infrastructure\Persistence;

use App\Models\Meal as MealModel;
use Src\diet\meal\Domain\Entity\Meal as MealEntity;
use Src\diet\meal\Domain\Contract\MealRepositoryInterface;

class MealEloquentRepository implements MealRepositoryInterface
{
    /*───────────────────────────────*/
    /*  MAPEIA MODEL → ENTIDADE      */
    /*───────────────────────────────*/
    private function toEntity(MealModel $m): MealEntity
    {
        return new MealEntity(
            id: $m->id,
            user_id: $m->user_id,
            name: $m->name,
            meal_datetime: $m->meal_datetime,
            createdAt: $m->created_at?->toDateTimeString(),
            updatedAt: $m->updated_at?->toDateTimeString(),
            total_kcal: $m->total_kcal,
            total_carbohydrates: $m->total_carbohydrates,
            total_proteins: $m->total_proteins,
            total_fats: $m->total_fats,
            total_fiber: $m->total_fiber,
            total_sodium: $m->total_sodium
        );
    }

    /*───────────────────────────────*/
    /*  MAPEIA ENTIDADE → MODEL      */
    /*───────────────────────────────*/
    private function toModel(MealEntity $e): MealModel
    {
        $m = new MealModel();
        $m->id = $e->id;
        $m->user_id = $e->user_id;
        $m->name = $e->name;
        $m->meal_datetime = $e->meal_datetime;
        $m->created_at = $e->createdAt;
        $m->updated_at = $e->updatedAt;

        return $m;
    }

    public function all(): array
    {
        $models = MealModel::all();
        return $models->map(fn($m) => $this->toEntity($m))->toArray();
    }
}
