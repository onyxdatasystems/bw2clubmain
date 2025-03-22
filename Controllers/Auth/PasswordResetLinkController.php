<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use App\Helpers\ApiResponse; // Import the ApiResponse helper

class PasswordResetLinkController extends Controller
{
    /**
     * Display the password reset link request view.
     */
    public function create()
    {
        // If you still need to return a view for some reason, you can use:
        // return view('auth.forgot-password');
        // Otherwise, for an API, you can return a success response with a message.
        return ApiResponse::success([], "Password reset link request form retrieved successfully");
    }

    /**
     * Handle an incoming password reset link request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
        ]);

        // Send the password reset link to the user
        $status = Password::sendResetLink(
            $request->only('email')
        );

        // Handle the response
        if ($status == Password::RESET_LINK_SENT) {
            return ApiResponse::success([], __($status));
        } else {
            return ApiResponse::error(['email' => __($status)], "Failed to send password reset link", 400);
        }
    }
}