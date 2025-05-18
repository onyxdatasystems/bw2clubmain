<?php

use App\Http\Controllers\AssessmentController;
use App\Http\Controllers\CertificateController;
use App\Http\Controllers\Company\CompanyController;
use App\Http\Controllers\Company\CompanyStaffController;
use App\Http\Controllers\Company\CompanySubscriptionController;
use App\Http\Controllers\Company\CompanyTrainingController;
use App\Http\Controllers\Company\CompanyTransactionController;
use App\Http\Controllers\CompetitionController;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\EducationController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\ThematicGroupController;
use App\Http\Controllers\WorkExperienceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// routes/api.php
Route::middleware('auth:sanctum')->group(function () {
    // Course Management
    //Route::apiResource('courses', CourseController::class)
    //    ->middleware('can:manage,course');

    // Content Delivery
    Route::post('courses/{course}/content', [ContentController::class, 'uploadContent']);

    // Progress Tracking
    //Route::post('courses/{course}/progress', [ProgressController::class, 'update']);

    // Assessments
    Route::apiResource('assessments', AssessmentController::class);
    //Route::apiResource('assessments', AssessmentController::class)
    //    ->only(['show', 'update', 'destroy']);

    // Certificates
    Route::get('certificates/{course}', [CertificateController::class, 'generate']);
    Route::get('/certificates/verify/{user}/{course}', [CertificateController::class, 'verify']);
});

Route::prefix('courses')->group(function () {
    Route::get('/', [CourseController::class, 'index']);
    Route::post('/', [CourseController::class, 'store']);
    Route::get('/{course}', [CourseController::class, 'show']);
    Route::put('/{course}', [CourseController::class, 'update']);
    Route::delete('/{course}', [CourseController::class, 'destroy']);

    Route::post('/{course}/enroll', [CourseController::class, 'enroll']);
    Route::put('/{course}/progress', [CourseController::class, 'updateProgress']);
    Route::post('/{course}/assign-instructor', [CourseController::class, 'assignInstructor']);
    Route::post('/{course}/publish', [CourseController::class, 'publish']);
});

Route::prefix('courses/{course}/assessments')->group(function () {
    Route::get('/', [AssessmentController::class, 'index']);
    Route::post('/', [AssessmentController::class, 'store']);
    Route::post('/{assessment}/submit', [AssessmentController::class, 'submit']);
});

Route::prefix('certificates')->group(function () {
    Route::get('/{course}', [CertificateController::class, 'generate']);
    Route::get('/verify/{user}/{course}', [CertificateController::class, 'verify'])
        ->name('certificates.verify');
});