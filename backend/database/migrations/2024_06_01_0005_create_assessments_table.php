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
        // 2024_06_01_0005_create_assessments_table.php
        Schema::create('assessments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained();
            $table->string('title');
            $table->enum('type', ['quiz', 'exam', 'assignment']);
            $table->integer('time_limit')->nullable(); // Minutes
            $table->timestamp('available_from')->nullable();
            $table->timestamp('available_to')->nullable();
            $table->boolean('auto_grade')->default(true);
            $table->timestamps();
        });

        // 2024_06_01_0006_create_assessment_questions_table.php
        Schema::create('assessment_questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('assessment_id')->constrained();
            $table->enum('type', ['mcq', 'true_false', 'essay']);
            $table->text('question');
            $table->json('options')->nullable(); // For MCQs
            $table->string('correct_answer')->nullable();
            $table->integer('points')->default(1);
            $table->timestamps();
        });

        // 2024_06_01_0007_create_assessment_submissions_table.php
        Schema::create('assessment_submissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('assessment_id')->constrained();
            $table->json('answers');
            $table->decimal('score', 5, 2)->nullable();
            $table->text('feedback')->nullable();
            $table->timestamp('submitted_at');
            $table->timestamps();

            $table->unique(['user_id', 'assessment_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assessments');
    }
};
