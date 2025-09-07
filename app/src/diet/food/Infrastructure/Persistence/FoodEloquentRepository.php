<?php

namespace Src\diet\food\Infrastructure\Persistence;

use App\Models\Food as FoodModel;
use Src\diet\food\Domain\Entity\Food as FoodEntity;
use Src\diet\food\Domain\Contract\FoodRepositoryInterface;

class FoodEloquentRepository implements FoodRepositoryInterface
{
    /*───────────────────────────────*/
    /*  MAPEIA MODEL → ENTIDADE      */
    /*───────────────────────────────*/
    private function toEntity(FoodModel $m): FoodEntity
    {
        return new FoodEntity(
            id: $m->id,
            name: $m->name,
            kcal_per_100g: $m->kcal_per_100g,
            carbohydrates_per_100g: $m->carbohydrates_per_100g,
            proteins_per_100g: $m->proteins_per_100g,
            fats_per_100g: $m->fats_per_100g,
            fiber_per_100g: $m->fiber_per_100g,
            sodium_per_100g: $m->sodium_per_100g,
            createdAt: $m->created_at?->toDateTimeString(),
            updatedAt: $m->updated_at?->toDateTimeString()
        );
    }

    /*───────────────────────────────*/
    /*  MAPEIA ENTIDADE → MODEL      */
    /*───────────────────────────────*/
    private function toModel(FoodEntity $e): FoodModel
    {
        $m = new FoodModel();
        $m->id = $e->id;
        $m->name = $e->name;
        $m->kcal_per_100g = $e->kcal_per_100g;
        $m->carbohydrates_per_100g = $e->carbohydrates_per_100g;
        $m->proteins_per_100g = $e->proteins_per_100g;
        $m->fats_per_100g = $e->fats_per_100g;
        $m->fiber_per_100g = $e->fiber_per_100g;
        $m->sodium_per_100g = $e->sodium_per_100g;

        return $m;
    }

    public function all(): array
    {
        $models = FoodModel::all();
        return $models->map(fn($m) => $this->toEntity($m))->toArray();
    }
}
