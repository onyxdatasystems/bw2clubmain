<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\JobWishlist;

class JobWishlistController extends Controller
{
    function __construct(){
        $this->middleware(function ($request, $next) {
            $this->user = Auth()->user();
            return $next($request);
        });
    }

    public function index(Request $request)
    {
        $wishlistItems = JobWishlist::where('user_id', $this->user)
            ->with(['job' => function($query) {
                $query->with(['company', 'category'])
                    ->where('status', 'active');
            }])
            ->paginate(15);

        return response()->json([
            'wishlist' => $wishlistItems->map(function($item) {
                return [
                    'job_id' => $item->job_id,
                    'title' => $item->job->title,
                    'company' => $item->job->company->name,
                    'location' => $item->job->location,
                    'added_at' => $item->created_at
                ];
            }),
            'meta' => [
                'total_items' => $wishlistItems->total(),
                'current_page' => $wishlistItems->currentPage()
            ]
        ]);
    }
}