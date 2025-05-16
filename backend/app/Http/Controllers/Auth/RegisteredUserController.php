<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rules;
use Carbon\Carbon;
use Session;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Validator; // Add this import

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     *
     * @return \Illuminate\View\View
     */
    /*public function create()
    {
        if(get_settings('public_signup') != 1){
            Session::flash('error_message', get_phrase('Public signup not allowed'));
            return redirect()->route('login');
        }
        return view('auth.register');
    }*/

    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $response = [];

        // Validation rules (simplified example)
        $validator = Validator::make($request->all(), [
           // 'name' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users')->whereNull('deleted_at')
            ],
            'password' => 'required|min:8',
           // 'timezone' => 'required|timezone',
        ]);

        // Return validation errors
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Check if user exists with soft-deletes
            if (User::withTrashed()->where('email', $request->email)->exists()) {
                return response()->json([
                    'success' => false,
                    'message' => 'This email was previously registered'
                ], 409);
            }

            // Generate unique username
            do {
                $username = rand(100000, 999999);
            } while (User::where('username', $username)->exists());

            $user = User::create([
                'user_role' => 'general',
               // 'username' => $username,
               // 'name' => $request->name,
                'email' => $request->email,
                'friends' => json_encode([]),
                'followers' => json_encode([]),
                //'timezone' => $request->timezone,
                'password' => Hash::make($request->password),
                'status' => 0,
                'last_active' => now(),
                'email_verified_at' => null,
            ]);

            event(new Registered($user));

            return response()->json([
                'success' => true,
                'message' => 'User created successfully',
                'data' => $user->makeHidden(['password'])
            ], 201);

        } catch (\Exception $e) {
            Log::error('Registration Error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Registration failed. Please try again.'
            ], 500);
        }
    }
}
