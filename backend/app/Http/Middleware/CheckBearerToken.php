<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckBearerToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\JsonResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if(auth('sanctum')->user()->user_role !=='admin') {
            $token = $request->bearerToken();

            if (!isset($token) || $token === '') {
                return response()->json([
                    'error' => 'Unauthorized: Bearer token not provided'
                ], 401);
            }

            // Check if token exists in the database (Sanctum example)
            $validToken = \Laravel\Sanctum\PersonalAccessToken::findToken($token);

            if (!$validToken) {
                return response()->json(['error' => 'Invalid token'], 403);
            }

        }

        return $next($request);
    }
}
