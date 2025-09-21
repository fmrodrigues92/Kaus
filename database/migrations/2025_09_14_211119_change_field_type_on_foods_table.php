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
        Schema::table('foods', function (Blueprint $table) {
            $table->float('kcal_per_100g', 6, 2)->nullable()->change();
            $table->float('carbohydrates_per_100g', 6, 2)->nullable()->change();
            $table->float('proteins_per_100g', 6, 2)->nullable()->change();
            $table->float('fats_per_100g', 6, 2)->nullable()->change();
            $table->float('fiber_per_100g', 6, 2)->nullable()->change();
            $table->float('sodium_per_100g', 6, 2)->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('foods', function (Blueprint $table) {
            $table->smallInteger('kcal_per_100g')->nullable()->change();
            $table->smallInteger('carbohydrates_per_100g')->nullable()->change();
            $table->smallInteger('proteins_per_100g')->nullable()->change();
            $table->smallInteger('fats_per_100g')->nullable()->change();
            $table->smallInteger('fiber_per_100g')->nullable()->change();
            $table->smallInteger('sodium_per_100g')->nullable()->change();
        });
    }
};
