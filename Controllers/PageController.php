<?php

namespace App\Http\Controllers;

use App\Models\Friendships;
use App\Models\Page;
use App\Models\Posts;
use App\Models\Page_like;
use App\Models\Media_files;
use App\Models\Albums;
use App\Models\Pagecategory;
use App\Models\FileUploader;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;
use App\Helpers\ApiResponse; // Import the ApiResponse helper

class PageController extends Controller
{
    public function pages()
    {
        $pageLiked = [];
        $likepages = Page_like::where('user_id', auth()->user()->id)->get();
        foreach ($likepages as $likepage) {
            $pageLiked[] = $likepage->page_id;
        }

        $mypages = Page::where('user_id', auth()->user()->id)
            ->orderBy('id', 'DESC')
            ->limit('5')
            ->get();

        $suggestedpages = Page::whereNotIn('id', $pageLiked)->get();
        $likedpage = Page_like::where('user_id', auth()->user()->id)
            ->orderBy('id', 'DESC')
            ->limit('10')
            ->get();

        return ApiResponse::success([
            'mypages' => $mypages,
            'suggestedpages' => $suggestedpages,
            'likedpage' => $likedpage,
        ], 'Pages fetched successfully');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'mimes:jpeg,jpg,png,gif|nullable',
            'name' => 'required|max:255',
            'category' => 'required',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), 'Validation failed', 422);
        }

        if ($request->image && !empty($request->image)) {
            $file_name = FileUploader::upload($request->image, 'public/storage/pages/logo', 250);
        }

        $page = new Page();
        $page->user_id = auth()->user()->id;
        $page->title = $request->name;
        $page->category_id = $request->category;
        $page->description = $request->description;
        if ($request->image && !empty($request->image)) {
            $page->logo = $file_name;
        }
        $page->save();

        return ApiResponse::success($page, 'Page created successfully');
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'mimes:jpeg,jpg,png,gif|nullable',
            'name' => 'required|max:255',
            'category' => 'required',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), 'Validation failed', 422);
        }

        $page = Page::find($id);
        if (!$page) {
            return ApiResponse::error(null, 'Page not found', 404);
        }

        $imagename = $page->logo;
        if ($request->image && !empty($request->image)) {
            $file_name = FileUploader::upload($request->image, 'public/storage/pages/logo', 250);
        }

        $page->title = $request->name;
        $page->category_id = $request->category;
        $page->description = $request->description;
        if ($request->image && !empty($request->image)) {
            $page->logo = $file_name;
        }
        $page->save();

        if (!empty($request->image)) {
            if (File::exists(public_path('storage/pages/logo/' . $imagename))) {
                File::delete(public_path('storage/pages/logo/' . $imagename));
            }
        }

        return ApiResponse::success($page, 'Page updated successfully');
    }

    public function updatecoverphoto(Request $request, $id)
    {
        $page = Page::find($id);
        if (!$page) {
            return ApiResponse::error(null, 'Page not found', 404);
        }

        $imagename = $page->coverphoto;
        if ($request->cover_photo && !empty($request->cover_photo)) {
            $file_name = FileUploader::upload($request->cover_photo, 'public/storage/pages/coverphoto', 1120);
            $page->coverphoto = $file_name;
        }
        $page->save();

        if (!empty($request->cover_photo)) {
            if (File::exists(public_path('storage/pages/coverphoto/' . $imagename))) {
                File::delete(public_path('storage/pages/coverphoto/' . $imagename));
            }
        }

        return ApiResponse::success($page, 'Cover photo updated successfully');
    }

    public function updateinfo(Request $request, $id)
    {
        $page = Page::find($id);
        if (!$page) {
            return ApiResponse::error(null, 'Page not found', 404);
        }

        $page->job = $request->job;
        $page->lifestyle = $request->lifestyle;
        $page->location = $request->location;
        $page->save();

        return ApiResponse::success($page, 'Page info updated successfully');
    }

    public function load_page_by_scrolling(Request $request)
    {
        $mypages = Page::where('user_id', auth()->user()->id)
            ->skip($request->offset)
            ->take(6)
            ->orderBy('id', 'DESC')
            ->get();

        return ApiResponse::success($mypages, 'Pages loaded successfully');
    }

    public function single_page($id)
    {
        $friendsid = [];
        $friends = Friendships::where('requester', auth()->user()->id)
            ->orWhere('accepter', auth()->user()->id)
            ->where('is_accepted', '1')
            ->get();

        foreach ($friends as $friend) {
            $friendidfind = $friend->accepter == auth()->user()->id ? $friend->requester : $friend->accepter;
            $friendsid[] = $friendidfind;
        }

        $all_videos = Media_files::where('page_id', $id)
            ->where('file_type', 'video')
            ->take(20)
            ->orderBy('id', 'DESC')
            ->get();

        $all_photos = Media_files::where('page_id', $id)
            ->take(30)
            ->orderBy('id', 'DESC')
            ->get();

        $posts = Posts::where('posts.privacy', '!=', 'private')
            ->where('posts.publisher', 'page')
            ->where('posts.publisher_id', $id)
            ->where('posts.status', 'active')
            ->join('pages', 'posts.publisher_id', '=', 'pages.id')
            ->select('posts.*', 'pages.id', 'pages.title', 'pages.logo', 'posts.created_at as created_at')
            ->orderBy('posts.post_id', 'DESC')
            ->get();

        $suggestedpages = Page_like::whereIn('user_id', $friendsid)
            ->where('user_id', '!=', auth()->user()->id)
            ->limit('1')
            ->get();

        $page = Page::find($id);
        if (!$page) {
            return ApiResponse::error(null, 'Page not found', 404);
        }

        $friendships = Friendships::where(function ($query) {
            $query->where('accepter', auth()->user()->id)
                ->orWhere('requester', auth()->user()->id);
        })
            ->where('is_accepted', 1)
            ->orderBy('friendships.importance', 'desc')
            ->take(15)
            ->get();

        return ApiResponse::success([
            'all_videos' => $all_videos,
            'all_photos' => $all_photos,
            'posts' => $posts,
            'suggestedpages' => $suggestedpages,
            'page' => $page,
            'friendships' => $friendships,
        ], 'Page data fetched successfully');
    }

    public function page_photos($id)
    {
        $friendsid = [];
        $friends = Friendships::where('requester', auth()->user()->id)
            ->orWhere('accepter', auth()->user()->id)
            ->where('is_accepted', '1')
            ->get();

        foreach ($friends as $friend) {
            $friendidfind = $friend->accepter == auth()->user()->id ? $friend->requester : $friend->accepter;
            $friendsid[] = $friendidfind;
        }

        $all_photos = Media_files::where('page_id', $id)
            ->where('file_type', 'image')
            ->take(20)
            ->orderBy('id', 'DESC')
            ->get();

        $all_albums = Albums::where('page_id', $id)
            ->take(6)
            ->orderBy('id', 'DESC')
            ->get();

        $all_videos = Media_files::where('page_id', $id)
            ->where('file_type', 'video')
            ->take(20)
            ->orderBy('id', 'DESC')
            ->get();

        $page = Page::find($id);
        if (!$page) {
            return ApiResponse::error(null, 'Page not found', 404);
        }

        $suggestedpages = Page_like::whereIn('user_id', $friendsid)
            ->where('user_id', '!=', auth()->user()->id)
            ->limit('1')
            ->get();

        return ApiResponse::success([
            'all_photos' => $all_photos,
            'all_albums' => $all_albums,
            'all_videos' => $all_videos,
            'page' => $page,
            'suggestedpages' => $suggestedpages,
        ], 'Page photos fetched successfully');
    }

    public function videos($id)
    {
        $friendsid = [];
        $friends = Friendships::where('requester', auth()->user()->id)
            ->orWhere('accepter', auth()->user()->id)
            ->where('is_accepted', '1')
            ->get();

        foreach ($friends as $friend) {
            $friendidfind = $friend->accepter == auth()->user()->id ? $friend->requester : $friend->accepter;
            $friendsid[] = $friendidfind;
        }

        $all_videos = Media_files::where('page_id', $id)
            ->where('file_type', 'video')
            ->take(20)
            ->orderBy('id', 'DESC')
            ->get();

        $page = Page::find($id);
        if (!$page) {
            return ApiResponse::error(null, 'Page not found', 404);
        }

        $all_photos = Media_files::where('page_id', $id)
            ->where('file_type', 'image')
            ->take(20)
            ->orderBy('id', 'DESC')
            ->get();

        $suggestedpages = Page_like::whereIn('user_id', $friendsid)
            ->where('user_id', '!=', auth()->user()->id)
            ->limit('1')
            ->get();

        return ApiResponse::success([
            'all_videos' => $all_videos,
            'page' => $page,
            'all_photos' => $all_photos,
            'suggestedpages' => $suggestedpages,
        ], 'Page videos fetched successfully');
    }

    public function load_videos(Request $request)
    {
        $all_videos = Media_files::where('user_id', auth()->user()->id)
            ->where('file_type', 'video')
            ->skip($request->offset)
            ->take(12)
            ->orderBy('id', 'DESC')
            ->get();

        return ApiResponse::success($all_videos, 'Videos loaded successfully');
    }

    public function like($id)
    {
        $pagelike = new Page_like();
        $pagelike->page_id = $id;
        $pagelike->user_id = auth()->user()->id;
        $pagelike->role = 'general';
        $pagelike->save();

        return ApiResponse::success(null, 'Page liked successfully');
    }

    public function dislike($id)
    {
        $pagelike = Page_like::where('page_id', $id)
            ->where('user_id', auth()->user()->id)
            ->first();

        if ($pagelike) {
            $pagelike->delete();
            return ApiResponse::success(null, 'Page disliked successfully');
        } else {
            return ApiResponse::error(null, 'Page like not found', 404);
        }
    }
}