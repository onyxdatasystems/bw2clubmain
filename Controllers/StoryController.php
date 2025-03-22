<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB, Session;
use App\Models\{Stories, Media_files, FileUploader};
use App\Helpers\ApiResponse; // Import the ApiResponse helper

class StoryController extends Controller
{
    private $user;

    function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->user = Auth()->user();
            return $next($request);
        });
    }

    function stories($offset = 0, $limit = 5)
    {
        // Fetch stories
        $stories = DB::table('stories')
            ->join('users', 'stories.user_id', '=', 'users.id')
            ->select('stories.*', 'users.name', 'users.photo', 'users.friends', 'stories.created_at as created_at')
            ->where(function ($query) {
                $query->whereJsonContains('users.friends', [$this->user->id])
                    ->where('stories.privacy', '!=', 'private')
                    ->orWhere('stories.user_id', $this->user->id);
            })
            ->where('stories.status', 'active')
            ->where('stories.created_at', '>=', (time() - 86400))
            ->skip($offset)->take($limit)->orderBy('stories.story_id', 'DESC')->get();

        return ApiResponse::success([
            'stories' => $stories,
        ], "Stories retrieved successfully");
    }

    function story_details($story_id = "", $offset = 0, $limit = 10)
    {
        // Fetch first 10 stories
        $stories = DB::table('stories')
            ->join('users', 'stories.user_id', '=', 'users.id')
            ->select('stories.*', 'users.name', 'users.photo', 'users.friends', 'stories.created_at as created_at')
            ->where(function ($query) {
                $query->whereJsonContains('users.friends', [$this->user->id])
                    ->orWhere('stories.user_id', [$this->user->id]);
            })
            ->where('stories.privacy', '!=', 'private')
            ->where('stories.created_at', '>=', (time() - 86400))
            ->where('stories.status', 'active')
            ->whereNotIn('stories.story_id', [$story_id])->orderBy('stories.story_id', 'DESC')->get();

        // Fetch story details
        $story_details = DB::table('stories')
            ->select('stories.*', 'users.name', 'users.photo', 'users.friends', 'stories.created_at as created_at')
            ->join('users', 'stories.user_id', '=', 'users.id')
            ->where('stories.story_id', $story_id)->get()->first();

        return ApiResponse::success([
            'stories' => $stories,
            'story_details' => $story_details,
        ], "Story details retrieved successfully");
    }

    function single_story_details($story_id = "")
    {
        // Fetch single story details
        $story_details = DB::table('stories')
            ->select('stories.*', 'users.name', 'users.photo', 'users.friends', 'stories.created_at as created_at')
            ->join('users', 'stories.user_id', '=', 'users.id')
            ->where('stories.story_id', $story_id)->get()->first();

        return ApiResponse::success([
            'story_details' => $story_details,
        ], "Single story details retrieved successfully");
    }

    function create_story(Request $request)
    {
        $all_data = $request->all();

        $data['publisher'] = $all_data['publisher'];
        $data['content_type'] = $all_data['content_type'];

        if ($request->publisher == 'user') {
            $data['publisher_id'] = $this->user->id;
        } else {
            $data['publisher_id'] = $this->user->id;
        }

        if ($request->content_type == 'text') {
            if (!empty($request->description)) {
                $data['description'] = json_encode(
                    array('color' => $all_data['color'], 'bg-color' => $all_data['bg-color'], 'text' => $all_data['description'])
                );
            } else {
                return ApiResponse::error([], "Description is required for text stories", 400);
            }
        }

        $data['privacy'] = $request->privacy;
        $data['created_at'] = time();
        $data['updated_at'] = $data['created_at'];
        $data['user_id'] = $this->user->id;
        $data['status'] = 'active';
        $story_id = Stories::insertGetId($data);

        if ($request->content_type != 'text') {
            if ($request->story_files == '') {
                return ApiResponse::error([], "Please select at least one image or video", 400);
            }

            // Add media files
            foreach ($request->story_files as $key => $media_file) {
                if (!empty($media_file)) {
                    $file_extention = $media_file->getClientOriginalExtension();
                    if ($file_extention == 'avi' || $file_extention == 'mp4' || $file_extention == 'webm' || $file_extention == 'mov' || $file_extention == 'wmv' || $file_extention == 'mkv') {
                        $file_name = FileUploader::upload($media_file, 'public/storage/story/videos');
                        $file_type = 'video';
                    } else {
                        $file_name = FileUploader::upload($media_file, 'public/storage/story/images', 800);
                        $file_type = 'image';
                    }

                    $media_file_data = [
                        'user_id' => $this->user->id,
                        'story_id' => $story_id,
                        'file_name' => $file_name,
                        'file_type' => $file_type,
                        'privacy' => $request->privacy,
                        'created_at' => time(),
                        'updated_at' => time(),
                    ];
                    Media_files::create($media_file_data);
                }
            }
        }

        return ApiResponse::success([], "Story created successfully");
    }
}