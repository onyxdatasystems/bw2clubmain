<?php

namespace App\Http\Controllers;

use App\Models\Albums;
use App\Models\Friendships;
use App\Models\Media_files;
use App\Models\Notification;
use App\Models\Posts;
use App\Models\User;
use App\Models\Follower;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Auth;
use Session;
use App\Helpers\ApiResponse; // Import the ApiResponse helper

class CustomUserController extends Controller
{
    // Change password
    public function changepass()
    {
        return ApiResponse::success(null, 'Change password page data');
    }

    public function updatepass(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'prevpass' => 'required',
            'password' => 'required|confirmed|min:8|different:prevpass',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), 'Validation failed', 422);
        }

        if (Hash::check($request->prevpass, auth()->user()->password)) {
            $user = User::find(auth()->user()->id);
            $user->password = Hash::make($request->password);
            $user->save();
            return ApiResponse::success(null, 'Password changed successfully');
        } else {
            return ApiResponse::error(null, 'Previous password does not match', 400);
        }
    }

    public function view_profile_data($id)
    {
        $posts = Posts::where('user_id', $id)
            ->where('publisher', 'post')
            ->where('privacy', 'public')
            ->orderBy('post_id', 'DESC')
            ->limit('10')
            ->get();

        $friendships = Friendships::where(function ($query) {
            $query->where('accepter', auth()->user()->id)
                ->orWhere('requester', auth()->user()->id);
        })
            ->where('is_accepted', 1)
            ->orderBy('friendships.importance', 'desc')
            ->get();

        $user_data = User::find($id);
        if (!$user_data) {
            return ApiResponse::error(null, 'User not found', 404);
        }

        return ApiResponse::success([
            'posts' => $posts,
            'friendships' => $friendships,
            'user_data' => $user_data,
        ], 'Profile data fetched successfully');
    }

    public function load_post_by_scrolling(Request $request)
    {
        $friendships = Friendships::where(function ($query) {
            $query->where('accepter', auth()->user()->id)
                ->orWhere('requester', auth()->user()->id);
        })
            ->where('is_accepted', 1)
            ->orderBy('friendships.importance', 'desc')
            ->get();

        $posts = Posts::where('user_id', $request->id)
            ->where('publisher', 'post')
            ->where('privacy', 'public')
            ->skip($request->offset)
            ->take(3)
            ->orderBy('post_id', 'DESC')
            ->get();

        $user_info = User::find($request->id);
        if (!$user_info) {
            return ApiResponse::error(null, 'User not found', 404);
        }

        return ApiResponse::success([
            'friendships' => $friendships,
            'posts' => $posts,
            'user_info' => $user_info,
        ], 'Posts fetched successfully');
    }

    public function friend($id)
    {
        $friendship = new Friendships();
        $friendship->accepter = $id;
        $friendship->requester = auth()->user()->id;
        $friendship->is_accepted = '0';
        $friendship->save();

        $notify = new Notification();
        $notify->sender_user_id = auth()->user()->id;
        $notify->reciver_user_id = $id;
        $notify->type = 'profile';
        $notify->save();

        $follower = new Follower();
        $follower->follow_id = $id;
        $follower->user_id = auth()->user()->id;
        $follower->save();

        return ApiResponse::success(null, 'Friend request sent successfully');
    }

    public function unfriend($id)
    {
        // Remove the friendship from the friendships table
        Friendships::where(function ($query) use ($id) {
            $query->where('accepter', $id)
                ->where('requester', auth()->user()->id);
        })->orWhere(function ($query) use ($id) {
            $query->where('requester', $id)
                ->where('accepter', auth()->user()->id);
        })->delete();

        // Update the unfriended user's friends list
        $unfriended_user_friends = User::where('id', $id)->value('friends');
        $unfriended_user_friends = json_decode($unfriended_user_friends, true);

        if (is_array($unfriended_user_friends)) {
            $array_key = array_search(auth()->user()->id, $unfriended_user_friends, true);
            if ($array_key !== false) {
                unset($unfriended_user_friends[$array_key]);
            }
            $unfriended_user_friends = array_values($unfriended_user_friends);
        } else {
            $unfriended_user_friends = [];
        }
        $unfriended_user_friends = json_encode($unfriended_user_friends);
        User::where('id', $id)->update(['friends' => $unfriended_user_friends]);

        // Update my friends list
        $my_friends = User::where('id', auth()->user()->id)->value('friends');
        $my_friends = json_decode($my_friends, true);

        if (is_array($my_friends)) {
            $array_key = array_search($id, $my_friends, true);
            if ($array_key !== false) {
                unset($my_friends[$array_key]);
            }
            $my_friends = array_values($my_friends);
        } else {
            $my_friends = [];
        }
        $my_friends = json_encode($my_friends);
        User::where('id', auth()->user()->id)->update(['friends' => $my_friends]);

        // Remove notifications between these users
        Notification::where('sender_user_id', auth()->user()->id)
            ->where('reciver_user_id', $id)
            ->delete();

        Notification::where('sender_user_id', $id)
            ->where('reciver_user_id', auth()->user()->id)
            ->delete();

        Follower::where('follow_id', $id)->delete();

        return ApiResponse::success(null, 'Removed from friend list');
    }

    public function friends($id)
    {
        $friendships = Friendships::where(function ($query) use ($id) {
            $query->where('accepter', $id)
                ->orWhere('requester', $id);
        })
            ->where('is_accepted', 1)
            ->orderBy('friendships.importance', 'desc')
            ->get();

        $friend_requests = Friendships::where('accepter', $id)
            ->where('is_accepted', '!=', 1)
            ->take(15)
            ->get();

        $user_data = User::find($id);
        if (!$user_data) {
            return ApiResponse::error(null, 'User not found', 404);
        }

        return ApiResponse::success([
            'friendships' => $friendships,
            'friend_requests' => $friend_requests,
            'user_data' => $user_data,
        ], 'Friends data fetched successfully');
    }

    public function photos($id)
    {
        $all_photos = Media_files::where('user_id', $id)
            ->where('file_type', 'image')
            ->whereNull('page_id')
            ->whereNull('story_id')
            ->whereNull('product_id')
            ->whereNull('group_id')
            ->whereNull('chat_id')
            ->orderBy('id', 'DESC')
            ->get();

        $all_albums = Albums::where('user_id', $id)
            ->whereNull('page_id')
            ->whereNull('group_id')
            ->take(6)
            ->orderBy('id', 'DESC')
            ->get();

        $user_data = User::find($id);
        if (!$user_data) {
            return ApiResponse::error(null, 'User not found', 404);
        }

        return ApiResponse::success([
            'all_photos' => $all_photos,
            'all_albums' => $all_albums,
            'user_data' => $user_data,
        ], 'Photos and albums fetched successfully');
    }

    public function videos($id)
    {
        $all_videos = Media_files::where('user_id', $id)
            ->where('file_type', 'video')
            ->whereNull('story_id')
            ->whereNull('page_id')
            ->whereNull('album_id')
            ->whereNull('product_id')
            ->whereNull('chat_id')
            ->orderBy('id', 'DESC')
            ->get();

        $user_data = User::find($id);
        if (!$user_data) {
            return ApiResponse::error(null, 'User not found', 404);
        }

        return ApiResponse::success([
            'all_videos' => $all_videos,
            'user_data' => $user_data,
        ], 'Videos fetched successfully');
    }

    public function delete_mediafile($id)
    {
        $media_file = Media_files::find($id);
        if (!$media_file) {
            return ApiResponse::error(null, 'Media file not found', 404);
        }

        $media_file->delete();
        return ApiResponse::success(null, 'Media file deleted successfully');
    }

    public function download_mediafile($id)
    {
        $media_file = Media_files::find($id);
        if (!$media_file) {
            return ApiResponse::error(null, 'Media file not found', 404);
        }

        $filename = public_path() . "/storage/post/videos/" . $media_file->file_name;
        if (File::exists($filename)) {
            return Response::download($filename);
        } else {
            return ApiResponse::error(null, 'File not found', 404);
        }
    }

    public function download_mediafile_image($id)
    {
        $media_file = Media_files::find($id);
        if (!$media_file) {
            return ApiResponse::error(null, 'Media file not found', 404);
        }

        $filename = public_path() . "/storage/post/images/" . $media_file->file_name;
        if (File::exists($filename)) {
            return Response::download($filename);
        } else {
            return ApiResponse::error(null, 'File not found', 404);
        }
    }

    public function account_status($id)
    {
        $user = User::find($id);
        if (!$user) {
            return ApiResponse::error(null, 'User not found', 404);
        }

        $user->status = 0;
        $user->update();

        Auth::logout();

        return ApiResponse::success(['url' => route('login')], 'Account deactivated successfully');
    }
}