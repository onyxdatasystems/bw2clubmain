<?php

use App\Http\Controllers\Company\CompanyAdvertisementController;
use App\Http\Controllers\Company\MentorshipController;
use App\Http\Controllers\Company\CompanyController;
use App\Http\Controllers\Company\CompanyStaffController;
use App\Http\Controllers\Company\CompanySubscriptionController;
use App\Http\Controllers\Company\CompanyTrainingController;
use App\Http\Controllers\Company\CompanyTransactionController;
use App\Http\Controllers\CompetitionController;
use App\Http\Controllers\EducationController;
use App\Http\Controllers\Event\EventController;
use App\Http\Controllers\InitiativeController;
use App\Http\Controllers\ScormController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\ThematicGroupController;
use App\Http\Controllers\WorkExperienceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Skills Routes
Route::prefix('skills')->middleware(['check.token'])->group(function () {
    Route::get('/', [SkillController::class, 'index']);
    Route::put('/', [SkillController::class, 'update']);
});

// Education Routes
Route::prefix('education')->middleware(['check.token'])->group(function () {
    Route::get('/', [EducationController::class, 'index']);
    Route::post('/', [EducationController::class, 'store']);
    Route::put('/{education}', [EducationController::class, 'update']);
    Route::delete('/{education}', [EducationController::class, 'destroy']);
});

// Work Experience Routes
Route::prefix('work-experience')->middleware(['check.token'])->group(function () {
    Route::get('/', [WorkExperienceController::class, 'index']);
    Route::post('/', [WorkExperienceController::class, 'store']);
    Route::put('/{workExperience}', [WorkExperienceController::class, 'update']);
    Route::delete('/{workExperience}', [WorkExperienceController::class, 'destroy']);
});

// Competitions Routes
Route::prefix('competitions')->middleware(['check.token'])->group(function () {
    Route::get('/ongoing', [CompetitionController::class, 'ongoing']);
    Route::get('/past', [CompetitionController::class, 'past']);
    Route::get('/upcoming', [CompetitionController::class, 'upcoming']);
});

// Initiatives Routes
Route::prefix('initiatives')->middleware(['check.token'])->group(function () {
    Route::apiResource('initiatives', InitiativeController::class);

    Route::get('/initiatives', [InitiativeController::class, 'index']);
    Route::post('/{initiative}/cheer', [InitiativeController::class, 'cheer']);
    Route::post('/{initiative}/feedback', [InitiativeController::class, 'feedback']);
    Route::post('/{initiative}/spread', [InitiativeController::class, 'spread']);
});


//Route::get('/relationship-options', [RelationshipController::class, 'index']);

// routes/api.php
Route::prefix('thematic-groups')->middleware(['check.token'])->group(function () {
    Route::post('/{company}/create', [ThematicGroupController::class, 'create']);
    Route::get('/search', [ThematicGroupController::class, 'search']);
    Route::post('/{group}/add-member', [ThematicGroupController::class, 'addMember']);
    Route::post('/{group}/add-initiative', [ThematicGroupController::class, 'addInitiative']);
    //Route::post('/{group}/members', [ThematicGroupController::class, 'addMember']);
    Route::delete('/{group}/members/{user}', [ThematicGroupController::class, 'removeMember']);
    Route::put('/{group}', [ThematicGroupController::class, 'update']);
    Route::delete('/{group}', [ThematicGroupController::class, 'destroy']);
    Route::post('/{group}/photo', [ThematicGroupController::class, 'updatePhoto']);

    Route::post('/{group}/initiatives', [ThematicGroupController::class, 'addInitiative']);
    Route::get('/{group}/members', [ThematicGroupController::class, 'viewMembers']);
});

// Companies Routes
Route::prefix('companies')->middleware(['check.token'])->group(function () {
    Route::post('/', [CompanyController::class, 'store']);
    Route::put('/{company}', [CompanyController::class, 'update']);
    Route::delete('/{company}', [CompanyController::class, 'destroy']);

    // Subscription Management
    Route::post('/{company}/subscribe', [CompanySubscriptionController::class, 'subscribe']);
    Route::get('/{company}/payment-history', [CompanySubscriptionController::class, 'paymentHistory']);
    Route::delete('/{subscription}', [CompanySubscriptionController::class, 'cancelSubscription']);

    Route::post('/create-plan', [CompanySubscriptionController::class, 'createPlan']);
    Route::delete('/delete-plan/{plan}', [CompanySubscriptionController::class, 'deletePlan']);


    // Staff Management
    Route::post('/{company}/staff', [CompanyStaffController::class, 'addStaff']);
    Route::delete('/{company}/staff/{staff}', [CompanyStaffController::class, 'removeStaff']);

    // Group Management
    Route::post('/{company}/groups', [CompanyStaffController::class, 'createGroup']);

    // Training Management
    Route::post('/{company}/trainings', [CompanyTrainingController::class, 'subscribeToTraining']);

    Route::get('/{company}/balance', [CompanyController::class, 'checkBalance']);
});

// routes/api.php
Route::prefix('companies/{company}')->middleware(['check.token'])->group(function () {
    Route::get('/transactions', [CompanyTransactionController::class, 'index']);
    Route::post('/transactions', [CompanyTransactionController::class, 'store']);
    Route::get('/transactions/{transaction}', [CompanyTransactionController::class, 'show']);
});

// routes/web.php (for file serving)
Route::get('/scorm/{scormCourse}', [ScormController::class, 'launch'])
    ->name('scorm.launch')
    ->middleware('auth:sanctum');

Route::prefix('mentorship')->group(function () {
    Route::post('/match', [MentorshipController::class, 'createMatch']);
    Route::get('/matches', [MentorshipController::class, 'listMatches']);
    Route::delete('/matches/{match}', [MentorshipController::class, 'endMatch']);
});

Route::get('/events/suggestions', [EventController::class, 'getSuggestions']);

Route::prefix('company-advertisements')->group(function () { // Changed
    Route::post('/', [CompanyAdvertisementController::class, 'store']);
    Route::get('/active', [CompanyAdvertisementController::class, 'activeAds']);
    Route::get('/{advertisement}', [CompanyAdvertisementController::class, 'show']);
    Route::put('/{advertisement}', [CompanyAdvertisementController::class, 'update']);
    Route::delete('/{advertisement}', [CompanyAdvertisementController::class, 'destroy']);
});


