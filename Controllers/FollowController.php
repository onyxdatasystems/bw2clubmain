<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\Follower;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class FollowController extends Controller
{
    public function follow($id)
    {
        $validator = Validator::make(['id' => $id], [
            'id' => 'required|integer|exists:users,id|not_in:'.Auth::id()
        ]);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), 'Invalid user', 422);
        }

        try {
            // Check if already following
            if (Follower::where([
                'user_id' => Auth::id(),
                'follow_id' => $id
            ])->exists()) {
                return ApiResponse::error('Already following this user', 'Conflict', 409);
            }

            $follower = Follower::create([
                'user_id' => Auth::id(),
                'follow_id' => $id
            ]);

            return ApiResponse::success(
                $follower,
                'You are now following this user',
                201
            );

        } catch (\Exception $e) {
            return ApiResponse::error('Follow operation failed: '.$e->getMessage());
        }
    }

    public function unfollow($id)
    {
        $validator = Validator::make(['id' => $id], [
            'id' => 'required|integer|exists:users,id'
        ]);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), 'Invalid user', 422);
        }

        try {
            $deleted = Follower::where([
                'user_id' => Auth::id(),
                'follow_id' => $id
            ])->delete();

            if ($deleted === 0) {
                return ApiResponse::error('Not following this user', 'Not Found', 404);
            }

            return ApiResponse::success(
                null,
                'Successfully unfollowed user'
            );

        } catch (\Exception $e) {
            return ApiResponse::error('Unfollow operation failed: '.$e->getMessage());
        }
    }
}