<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Carbon\Carbon;
use App\Helpers\ApiResponse; // Import the ApiResponse helper

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function create()
    {
        if (get_settings('public_signup') != 1) {
            return ApiResponse::error(null, 'Public signup not allowed', 403, [
                'redirect_url' => route('login'),
            ]);
        }

        return ApiResponse::success(null, 'Registration view retrieved');
    }

    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'user_role' => 'general',
            'username' => rand(100000, 999999),
            'name' => $request->name,
            'email' => $request->email,
            'friends' => json_encode(array()),
            'followers' => json_encode(array()),
            'timezone' => $request->timezone,
            'password' => Hash::make($request->password),
            'status' => 0,
            'lastActive' => Carbon::now(),
            'created_at' => time(),
        ]);

        event(new Registered($user));
        Auth::login($user);

        return ApiResponse::success(null, 'Registration successful', [
            'redirect_url' => RouteServiceProvider::HOME,
        ]);
    }
}