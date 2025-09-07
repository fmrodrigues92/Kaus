<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('foods', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->smallInteger('kcal_per_100g');
            $table->smallInteger('carbohydrates_per_100g');
            $table->smallInteger('proteins_per_100g');
            $table->smallInteger('fats_per_100g');
            $table->smallInteger('fiber_per_100g')->nullable();
            $table->smallInteger('sodium_per_100g')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('foods');
    }
};
