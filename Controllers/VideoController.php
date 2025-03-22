<?php

namespace App\Http\Controllers;

use App\Models\{Posts, Saveforlater, Video, FileUploader};
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Helpers\ApiResponse; // Import the ApiResponse helper

class VideoController extends Controller
{
    public function videos()
    {
        $videos = Video::where('category', 'video')
            ->where('privacy', 'public')
            ->orderBy('id', 'DESC')
            ->limit(5)
            ->get();

        return ApiResponse::success([
            'videos' => $videos,
        ], "Videos retrieved successfully");
    }

    public function store(Request $request)
    {
        $rules = [
            'video' => 'required|file|mimes:mp4,mov,wmv,mkv,webm,avi,m4v|max:500000',
            'title' => 'required',
            'privacy' => 'required',
            'category' => 'required',
        ];
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), "Validation failed", 422);
        }

        $file_name = FileUploader::upload($request->video, 'public/storage/videos');
        $mobile_app_image = FileUploader::upload($request->mobile_app_image, 'public/storage/videos');

        $video = new Video();
        $video->title = $request->title;
        $video->user_id = auth()->user()->id;
        $video->privacy = $request->privacy;
        $video->category = $request->category;
        $video->mobile_app_image = $mobile_app_image;
        $video->file = $file_name;
        $video->view = json_encode([]);
        $done = $video->save();

        if ($done) {
            $post = new Posts();
            $post->user_id = auth()->user()->id;
            $post->publisher = 'video_and_shorts';
            $post->publisher_id = $video->id;
            $post->post_type = $request->category;
            $post->privacy = $request->privacy;
            $post->description = $request->title;
            $post->mobile_app_image = $mobile_app_image;
            $post->tagged_user_ids = json_encode([]);
            $post->user_reacts = json_encode([]);
            $post->status = 'active';
            $post->created_at = time();
            $post->updated_at = time();
            $post->save();
        }

        return ApiResponse::success([], "Video/Shorts created successfully");
    }

    public function videoinfo($id)
    {
        $post = Posts::where('posts.privacy', '!=', 'private')
            ->where('posts.publisher', 'video_and_shorts')
            ->where('posts.publisher_id', $id)
            ->where('posts.status', 'active')
            ->first();

        $video = Video::find($id);
        $video_view_data = json_decode($video->view);

        if (!in_array(auth()->user()->id, $video_view_data)) {
            array_push($video_view_data, auth()->user()->id);
            $video->view = json_encode($video_view_data);
            $video->save();
        }

        $latestVideos = Video::where('category', 'video')
            ->where('privacy', 'public')
            ->orderBy('id', 'DESC')
            ->limit(5)
            ->get();

        $last_data = Video::latest()->first();
        if ($last_data->id == $id) {
            $videos = Video::where('id', '<', $id)
                ->where('category', 'video')
                ->where('privacy', 'public')
                ->orderBy('id', 'DESC')
                ->limit(2)
                ->get();
        } else {
            $videos = Video::where('id', '>', $id)
                ->where('category', 'video')
                ->where('privacy', 'public')
                ->orderBy('id', 'ASC')
                ->limit(2)
                ->get();
        }

        return ApiResponse::success([
            'post' => $post,
            'video' => $video,
            'latest_videos' => $latestVideos,
            'videos' => $videos,
        ], "Video details retrieved successfully");
    }

    public function load_videos_by_scrolling(Request $request)
    {
        $videos = Video::where('category', 'video')
            ->where('privacy', 'public')
            ->skip($request->offset)
            ->take(5)
            ->orderBy('id', 'DESC')
            ->get();

        return ApiResponse::success([
            'videos' => $videos,
        ], "Videos loaded successfully");
    }

    public function shorts()
    {
        $shorts = Video::where('category', 'shorts')
            ->where('privacy', 'public')
            ->orderBy('id', 'DESC')
            ->limit(5)
            ->get();

        return ApiResponse::success([
            'shorts' => $shorts,
        ], "Shorts retrieved successfully");
    }

    public function load_shorts_by_scrolling(Request $request)
    {
        $shorts = Video::where('category', 'shorts')
            ->where('privacy', 'public')
            ->skip($request->offset)
            ->take(5)
            ->orderBy('id', 'DESC')
            ->get();

        return ApiResponse::success([
            'shorts' => $shorts,
        ], "Shorts loaded successfully");
    }

    public function save_for_later($id)
    {
        $saveForLater = new Saveforlater();
        $saveForLater->user_id = auth()->user()->id;
        $saveForLater->video_id = $id;
        $saveForLater->save();

        return ApiResponse::success([], "Video saved for later successfully");
    }

    public function unsave_for_later($id)
    {
        $done = Saveforlater::where('video_id', $id)
            ->where('user_id', auth()->user()->id)
            ->delete();

        if ($done) {
            return ApiResponse::success([], "Video unsaved successfully");
        }

        return ApiResponse::error([], "Failed to unsave video", 500);
    }

    public function save_all()
    {
        $videos = Saveforlater::where('user_id', auth()->user()->id)
            ->whereNotNull('video_id')
            ->whereNull('group_id')
            ->whereNull('post_id')
            ->whereNull('marketplace_id')
            ->whereNull('event_id')
            ->whereNull('blog_id')
            ->get();

        return ApiResponse::success([
            'videos' => $videos,
        ], "Saved videos retrieved successfully");
    }

    public function video_delete(Request $request)
    {
        $video = Video::find($request->video_id);

        if (!$video) {
            return ApiResponse::error([], "Video not found", 404);
        }

        $file = $video->file;
        $done = $video->delete();

        if ($done) {
            // Remove the file from storage
            removeFile('video', $file);
            return ApiResponse::success([], "Video deleted successfully");
        }

        return ApiResponse::error([], "Failed to delete video", 500);
    }
}