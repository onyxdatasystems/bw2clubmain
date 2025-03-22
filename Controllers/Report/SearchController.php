<?php

namespace App\Http\Controllers\Report;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Group;
use App\Models\Marketplace;
use App\Models\Page;
use App\Models\Posts;
use App\Models\User;
use App\Models\Video;
use App\Models\Friendships;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    // General search
    public function search(Request $request)
    {
        $search_param = $request->query('search');
        if (!$search_param) {
            return response()->json(['error' => 'Search parameter is required'], 400);
        }

        $results = [
            'photos' => Posts::where('description', 'LIKE', '%' . $search_param . '%')->limit(50)->get(),
            'posts' => Posts::where(function ($query) use ($search_param) {
                $query->where('description', 'LIKE', '%' . $search_param . '%')
                    ->orWhere('hashtag', 'LIKE', '%' . $search_param . '%');
            })->limit(50)->get(),
            'peoples' => User::where('name', 'LIKE', '%' . $search_param . '%')->limit(50)->get(),
            'products' => Marketplace::where('title', 'LIKE', '%' . $search_param . '%')->limit(50)->get(),
            'pages' => Page::where('title', 'LIKE', '%' . $search_param . '%')->limit(50)->get(),
            'groups' => Group::where('title', 'LIKE', '%' . $search_param . '%')->where('privacy', 'public')->limit(50)->get(),
            'events' => Event::where('title', 'LIKE', '%' . $search_param . '%')->where('privacy', 'public')->limit(50)->get(),
            'videos' => Video::where('title', 'LIKE', '%' . $search_param . '%')->where('privacy', 'public')->limit(50)->get(),
        ];

        if (strpos($search_param, '#') === 0) {
            $hashtag = substr($search_param, 1);
            $results['is_hashtag_search'] = true;
            $results['hashtag'] = $hashtag;
            $results['hashtag_count'] = Posts::where('hashtag', 'LIKE', '%' . $hashtag . '%')->count();
        } else {
            $results['is_hashtag_search'] = false;
        }

        return response()->json($results, 200);
    }

    // Search people
    public function search_people(Request $request)
    {
        $search_param = $request->query('search');
        if (!$search_param) {
            return response()->json(['error' => 'Search parameter is required'], 400);
        }

        $peoples = User::where('name', 'LIKE', '%' . $search_param . '%')->limit(100)->get();
        return response()->json(['peoples' => $peoples], 200);
    }

    // Search posts
    public function search_post(Request $request)
    {
        $search_param = $request->query('search');
        if (!$search_param) {
            return response()->json(['error' => 'Search parameter is required'], 400);
        }

        $posts = Posts::where('description', 'LIKE', '%' . $search_param . '%')->limit(100)->get();
        return response()->json(['posts' => $posts], 200);
    }

    // Search videos
    public function search_video(Request $request)
    {
        $search_param = $request->query('search');
        if (!$search_param) {
            return response()->json(['error' => 'Search parameter is required'], 400);
        }

        $videos = Video::where('title', 'LIKE', '%' . $search_param . '%')->where('privacy', 'public')->limit(100)->get();
        return response()->json(['videos' => $videos], 200);
    }

    // Search products
    public function search_product(Request $request)
    {
        $search_param = $request->query('search');
        if (!$search_param) {
            return response()->json(['error' => 'Search parameter is required'], 400);
        }

        $products = Marketplace::where('title', 'LIKE', '%' . $search_param . '%')->limit(100)->get();
        return response()->json(['products' => $products], 200);
    }

    // Search pages
    public function search_page(Request $request)
    {
        $search_param = $request->query('search');
        if (!$search_param) {
            return response()->json(['error' => 'Search parameter is required'], 400);
        }

        $pages = Page::where('title', 'LIKE', '%' . $search_param . '%')->limit(100)->get();
        return response()->json(['pages' => $pages], 200);
    }

    // Search groups
    public function search_group(Request $request)
    {
        $search_param = $request->query('search');
        if (!$search_param) {
            return response()->json(['error' => 'Search parameter is required'], 400);
        }

        $groups = Group::where('title', 'LIKE', '%' . $search_param . '%')->where('privacy', 'public')->limit(100)->get();
        return response()->json(['groups' => $groups], 200);
    }

    // Search events
    public function search_event(Request $request)
    {
        $search_param = $request->query('search');
        if (!$search_param) {
            return response()->json(['error' => 'Search parameter is required'], 400);
        }

        $events = Event::where('title', 'LIKE', '%' . $search_param . '%')->where('privacy', 'public')->limit(100)->get();
        return response()->json(['events' => $events], 200);
    }
}