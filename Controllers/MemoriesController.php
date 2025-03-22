<?php

namespace App\Http\Controllers;

use App\Models\Posts;
use App\Models\Friendships;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Helpers\ApiResponse; // Import the ApiResponse helper

class MemoriesController extends Controller
{
    private $user;

    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->user = Auth()->user();
            return $next($request);
        });

        header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
        header("Cache-Control: post-check=0, pre-check=0", false);
        header("Pragma: no-cache");
    }

    public function memories()
    {
        $memories_by_post = Posts::join('users', 'posts.user_id', '=', 'users.id')
            ->select('posts.*', 'users.name', 'users.photo', 'users.friends')
            ->whereDay('posts.posted_on', date('d', time()))
            ->whereMonth('posts.posted_on', date('m', time()))
            ->whereYear('posts.posted_on', '!=', date('Y', time()))
            ->where('posts.user_id', auth()->user()->id)
            ->where('posts.status', 'active')
            ->where('posts.privacy', '!=', 'private')
            ->where('posts.report_status', '0')
            ->whereIn('posts.publisher', ['post', 'video_and_shorts'])
            ->orderBy('posts.post_id', 'desc')
            ->take(5)
            ->get();

        $friendships = Friendships::where(function ($query) {
            $query->where('accepter', auth()->user()->id)
                ->orWhere('requester', auth()->user()->id);
        })
            ->where('is_accepted', 1)
            ->orderBy('friendships.importance', 'desc')
            ->get();

        return ApiResponse::success([
            'posts' => $memories_by_post,
            'friendships' => $friendships,
            'has_memories' => $memories_by_post->count(),
        ], 'Memories fetched successfully');
    }

    public function load_memories(Request $request)
    {
        $memories_by_post = Posts::join('users', 'posts.user_id', '=', 'users.id')
            ->select('posts.*', 'users.name', 'users.photo', 'users.friends')
            ->whereDay('posts.posted_on', date('d', time()))
            ->whereMonth('posts.posted_on', date('m', time()))
            ->whereYear('posts.posted_on', '!=', date('Y', time()))
            ->where('posts.user_id', auth()->user()->id)
            ->where('posts.status', 'active')
            ->where('posts.privacy', '!=', 'private')
            ->where('posts.report_status', '0')
            ->whereIn('posts.publisher', ['post', 'video_and_shorts'])
            ->orderBy('posts.post_id', 'desc')
            ->skip($request->offset)
            ->take(3)
            ->get();

        $friendships = Friendships::where(function ($query) {
            $query->where('accepter', auth()->user()->id)
                ->orWhere('requester', auth()->user()->id);
        })
            ->where('is_accepted', 1)
            ->orderBy('friendships.importance', 'desc')
            ->get();

        return ApiResponse::success([
            'posts' => $memories_by_post,
            'friendships' => $friendships,
            'has_memories' => $memories_by_post->count(),
            'user_info' => $this->user,
            'type' => 'user_post',
        ], 'Memories loaded successfully');
    }
}