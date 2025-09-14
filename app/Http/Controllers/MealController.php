<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMealRequest;
use App\Http\Requests\UpdateMealRequest;
use App\Models\Meal;
use Illuminate\Http\Request;
use Src\diet\meal\Application\ListMealsUseCase;
use Inertia\Inertia;
use Src\diet\food\Application\ListFoodsUseCase;
use Src\diet\meal\Application\CreateMealsUseCase;

class MealController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(ListMealsUseCase $listMealsUseCase, ListFoodsUseCase $listFoodsUseCase)
    {
        $meals = $listMealsUseCase->execute();
        $foods = $listFoodsUseCase->execute();

        return Inertia::render('meals', [
            'meals' => $meals,
            'foods' => $foods
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMealRequest $request, CreateMealsUseCase $createMealsUseCase)
    {
        $user = $request->user();
        $data = $request->validated();
        $data['user_id'] = $user->id;

        $meal = $createMealsUseCase->execute($data);

        return redirect()->route('meals.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Meal $meal)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Meal $meal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMealRequest $request, Meal $meal)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Meal $meal)
    {
        //
    }
}
