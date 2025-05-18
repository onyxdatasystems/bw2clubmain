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
        Schema::create('trainings', function (Blueprint $table) {
            $table->id();

            // Basic Training Info
            $table->string('title');
            $table->text('description')->nullable();
            $table->dateTime('start_time');
            $table->dateTime('end_time');
            $table->enum('type', ['virtual', 'in_person']);
            $table->string('location_link')->nullable(); // For virtual trainings
            $table->string('location_address')->nullable(); // For physical locations

            // Relationships
            $table->foreignId('user_id')->constrained()->comment('Trainer/Organizer');
            $table->foreignId('company_id')->constrained()->comment('Host company');

            // Additional Fields
            $table->integer('duration_minutes')->nullable();
            $table->integer('capacity')->default(0);
            $table->enum('status', ['draft', 'published', 'completed', 'cancelled'])->default('draft');

            // Timestamps
            $table->timestamps();
            $table->softDeletes();

            // Indexes
            $table->index(['status', 'start_time']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('trainings');
    }
};
