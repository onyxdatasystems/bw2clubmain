<?php

use App\Http\Controllers\Company\CompanyController;
use App\Http\Controllers\Company\CompanyStaffController;
use App\Http\Controllers\Company\CompanySubscriptionController;
use App\Http\Controllers\Company\CompanyTrainingController;
use App\Http\Controllers\Company\CompanyTransactionController;
use App\Http\Controllers\CompetitionController;
use App\Http\Controllers\EducationController;
use App\Http\Controllers\ScormController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\ThematicGroupController;
use App\Http\Controllers\WorkExperienceController;
use App\Http\Controllers\ZoomController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
Route::prefix('zoom')->group(function () {
    Route::post('/meetings', [ZoomController::class, 'createMeeting']);
    Route::get('/meetings/{meeting}', [ZoomController::class, 'getMeeting']);
    Route::put('/meetings/{meeting}', [ZoomController::class, 'updateMeeting']);
});