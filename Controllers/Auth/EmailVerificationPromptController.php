<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use App\Helpers\ApiResponse; // Import the ApiResponse helper

class EmailVerificationPromptController extends Controller
{
    /**
     * Display the email verification prompt.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke(Request $request)
    {
        if ($request->user()->hasVerifiedEmail()) {
            return ApiResponse::success(null, 'Email already verified', [
                'redirect_url' => RouteServiceProvider::HOME,
            ]);
        }

        return ApiResponse::success(null, 'Email verification required', [
            'redirect_url' => route('verification.notice'),
        ]);
    }
}