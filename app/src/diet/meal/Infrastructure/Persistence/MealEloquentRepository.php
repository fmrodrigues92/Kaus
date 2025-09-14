<?php

namespace Src\diet\meal\Infrastructure\Persistence;

use App\Models\Meal as MealModel;
use Src\diet\food\Domain\Entity\Food;
use Src\diet\meal\Domain\Entity\Meal as MealEntity;
use Src\diet\meal\Domain\Contract\MealRepositoryInterface;
use Src\diet\meal\Domain\Entity\MealItem;

class MealEloquentRepository implements MealRepositoryInterface
{
    /*───────────────────────────────*/
    /*  MAPEIA MODEL → ENTIDADE      */
    /*───────────────────────────────*/
    private function toEntity(MealModel $m): MealEntity
    {
        $mealItems = [];

        foreach ($m->mealItems as $item) {
            $foodModel = $item->food;

            $food = new Food(
                id: $foodModel->id,
                name: $foodModel->name,
                kcal_per_100g: $foodModel->kcal_per_100g,
                carbohydrates_per_100g: $foodModel->carbohydrates_per_100g,
                proteins_per_100g: $foodModel->proteins_per_100g,
                fats_per_100g: $foodModel->fats_per_100g,
                fiber_per_100g: $foodModel->fiber_per_100g,
                sodium_per_100g: $foodModel->sodium_per_100g,
                createdAt: $foodModel->created_at?->toDateTimeString(),
                updatedAt: $foodModel->updated_at?->toDateTimeString()
            );

            $mealItems[] = new MealItem(
                id: $item->id,
                food: $food,
                quantity: $item->quantity
            );
        }

        $return = new MealEntity(
            id: $m->id,
            user_id: $m->user_id,
            name: $m->name,
            meal_datetime: $m->meal_datetime,
            createdAt: $m->created_at?->toDateTimeString(),
            updatedAt: $m->updated_at?->toDateTimeString(),
            mealItems: $mealItems
        );

        return $return;
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
        $models = MealModel::with(['mealItems.food', 'mealItems.meal'])->orderBy('id', 'desc')->get();
        return $models->map(fn($m) => $this->toEntity($m))->toArray();
    }

    public function create(array $data, int $userId): array
    {
        $mealModel = new MealModel();
        $mealModel->user_id = $userId;
        $mealModel->name = $data['name'];
        $mealModel->meal_datetime = $data['meal_datetime'];
        $mealModel->save();

        // Save meal items
        foreach ($data['mealItems'] as $itemData) {
            $mealModel->mealItems()->create([
                'food_id' => $itemData['food_id'],
                'quantity' => $itemData['quantity'],
            ]);
        }

        // Reload the meal with its items and associated foods
        $mealModel->load(['mealItems.food']);

        return [$this->toEntity($mealModel)];
    }
}
