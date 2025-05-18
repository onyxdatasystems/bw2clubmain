<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('mentorship_matches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mentee_id')->constrained('users');
            $table->foreignId('mentor_id')->constrained('users');
            $table->json('topics')->nullable();
            $table->tinyInteger('status')->default(0);
            $table->timestamps();
        });

        // Subscription plans
        Schema::create('subscription_plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->decimal('price', 8, 2);
            $table->integer('duration_days');
            $table->json('features')->nullable();
            $table->timestamps();
        });

        Schema::create('company_advertisements', function (Blueprint $table) { // Changed
            $table->id();
            $table->foreignId('company_id')->constrained();
            $table->string('title');
            $table->text('description');
            $table->json('target_audience')->nullable();
            $table->decimal('budget', 10, 2);
            $table->date('start_date');
            $table->date('end_date');
            $table->tinyInteger('status')->default(0);
            $table->timestamps();
        });
    }



    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mentorship_matches');
    }
};
