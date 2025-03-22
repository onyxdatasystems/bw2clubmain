<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Query\JoinClause;
use App\Models\{Stories, Posts, Comments, Feeling_and_activities, CommonModels, Live_streamings, Users, Friendships, Media_files, Albums, Notification, User, FileUploader, Album_image, Follower};
use Session, Image;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\Rule;
use DB;
use App\Helpers\ApiResponse; // Import the ApiResponse helper

class Profile extends Controller
{
    private $user;

    function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->user = Auth()->user();
            return $next($request);
        });
    }

    function profile()
    {
        // For my own profile
        $posts = Posts::where(function ($query) {
            $query->whereJsonContains('posts.tagged_user_ids', [$this->user->id])
                ->where('posts.privacy', '!=', 'private')
                ->orWhere('posts.user_id', $this->user->id);
        })
            ->where('posts.publisher', 'post')
            ->join('users', 'posts.user_id', '=', 'users.id')
            ->select('posts.*', 'users.name', 'users.photo', 'users.friends', 'posts.created_at as created_at')
            ->take(5)->orderBy('posts.post_id', 'DESC')->get();

        // New
        $friendships = Friendships::where(function ($query) {
            $query->where('accepter', auth()->user()->id)
                ->orWhere('requester', auth()->user()->id);
        })
            ->where('is_accepted', 1)
            ->orderBy('friendships.importance', 'desc')->get();

        return ApiResponse::success([
            'posts' => $posts,
            'friendships' => $friendships,
            'user' => $this->user,
        ], "Profile data retrieved successfully");
    }

    function load_post_by_scrolling(Request $request)
    {
        // For my own profile
        $posts = Posts::where(function ($query) {
            $query->whereJsonContains('posts.tagged_user_ids', [$this->user->id])
                ->where('posts.privacy', '!=', 'private')
                ->orWhere('posts.user_id', $this->user->id);
        })
            ->where('posts.publisher', 'post')
            ->join('users', 'posts.user_id', '=', 'users.id')
            ->select('posts.*', 'users.name', 'users.photo', 'users.friends', 'posts.created_at as created_at')
            ->skip($request->offset)->take(3)->orderBy('posts.post_id', 'DESC')->get();

        // New
        $friendships = Friendships::where(function ($query) {
            $query->where('accepter', auth()->user()->id)
                ->orWhere('requester', auth()->user()->id);
        })
            ->where('is_accepted', 1)
            ->orderBy('friendships.importance', 'desc')
            ->get();

        return ApiResponse::success([
            'posts' => $posts,
            'friendships' => $friendships,
            'user_info' => $this->user,
        ], "Posts loaded successfully");
    }

    function friends()
    {
        $friendships = Friendships::where(function ($query) {
            $query->where('accepter', $this->user->id)
                ->orWhere('requester', $this->user->id);
        })
            ->where('is_accepted', 1)
            ->orderBy('friendships.importance', 'desc')
            ->take(15)->get();

        $friend_requests = Friendships::where('accepter', $this->user->id)
            ->where('is_accepted', '!=', 1)
            ->take(15)->get();

        $userId = auth()->user()->id;
        $add_friend = User::whereNotIn('id', [$userId])->get();

        return ApiResponse::success([
            'friendships' => $friendships,
            'friend_requests' => $friend_requests,
            'add_friend' => $add_friend,
            'info' => auth()->user()->id,
            'user_info' => $this->user,
        ], "Friends data retrieved successfully");
    }

    function photos()
    {
        $all_photos = Media_files::where('user_id', $this->user->id)
            ->where('file_type', 'image')
            ->whereNull('story_id')
            ->whereNull('product_id')
            ->whereNull('page_id')
            ->whereNull('group_id')
            ->whereNull('chat_id')
            ->orderBy('id', 'DESC')->get();

        $all_albums = Albums::where('user_id', $this->user->id)
            ->whereNull('page_id')
            ->whereNull('group_id')
            ->take(6)->orderBy('id', 'DESC')->get();

        return ApiResponse::success([
            'all_photos' => $all_photos,
            'all_albums' => $all_albums,
            'user_info' => $this->user,
        ], "Photos data retrieved successfully");
    }

    function load_photos(Request $request)
    {
        $all_photos = Media_files::where('user_id', $this->user->id)
            ->where('file_type', 'image')
            ->whereNull('story_id')
            ->whereNull('product_id')
            ->whereNull('page_id')
            ->whereNull('group_id')
            ->whereNull('chat_id')
            ->skip($request->offset)->take(12)->orderBy('id', 'DESC')->get();

        return ApiResponse::success([
            'all_photos' => $all_photos,
            'user_info' => $this->user,
        ], "Photos loaded successfully");
    }

    function album($action_type, Request $request)
    {
        $error = null;

        if ($action_type == 'form') {
            return ApiResponse::success([], "Album form retrieved successfully");
        } elseif ($action_type == 'delete') {
            DB::table('albums')->where('id', $request->album_id)->delete();
            DB::table('media_files')->where('album_id', $request->album_id)->delete();

            return ApiResponse::success([], "Album deleted successfully");
        } elseif ($action_type == 'store') {
            $rules = array('title' => 'required|max:255', 'privacy' => 'required', 'thumbnail' => 'image|nullable');
            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                return ApiResponse::error($validator->errors(), "Validation failed", 422);
            }

            $data = [
                'user_id' => $this->user->id,
                'title' => $request->title,
                'sub_title' => $request->sub_title,
                'privacy' => $request->privacy,
                'created_at' => time(),
                'updated_at' => time(),
            ];

            if ($request->thumbnail) {
                $file_name = FileUploader::upload($request->thumbnail, 'public/storage/thumbnails/album', 800);
                $data['thumbnail'] = $file_name;
            }

            $album_id = Albums::insertGetId($data);
            $all_albums = Albums::where('id', $album_id)->get();

            return ApiResponse::success([
                'all_albums' => $all_albums,
            ], "Album created successfully");
        }
    }

    function load_albums(Request $request)
    {
        $all_albums = Albums::where('user_id', $this->user->id)
            ->whereNull('page_id')
            ->whereNull('group_id')
            ->skip($request->offset)->take(20)->orderBy('id', 'DESC')->get();

        return ApiResponse::success([
            'all_albums' => $all_albums,
            'user_info' => $this->user,
        ], "Albums loaded successfully");
    }

    function videos()
    {
        $all_videos = Media_files::where('user_id', $this->user->id)
            ->where('file_type', 'video')
            ->take(24)->orderBy('id', 'DESC')->get();

        return ApiResponse::success([
            'all_videos' => $all_videos,
            'user_info' => $this->user,
        ], "Videos data retrieved successfully");
    }

    function load_videos(Request $request)
    {
        $all_videos = Media_files::where('user_id', $this->user->id)
            ->where('file_type', 'video')
            ->skip($request->offset)->take(12)->orderBy('id', 'DESC')->get();

        return ApiResponse::success([
            'all_videos' => $all_videos,
            'user_info' => $this->user,
        ], "Videos loaded successfully");
    }

    function load_my_friends(Request $request)
    {
        $friendships = Friendships::where(function ($query) {
            $query->where('accepter', $this->user->id)
                ->orWhere('requester', $this->user->id);
        })
            ->where('is_accepted', 1)
            ->orderBy('friendships.importance', 'desc')
            ->skip($request->offset)->take(15)->get();

        return ApiResponse::success([
            'friendships' => $friendships,
            'user_info' => $this->user,
        ], "Friends loaded successfully");
    }

    function load_my_friend_requests(Request $request)
    {
        $friend_requests = Friendships::where('accepter', $this->user->id)
            ->where('is_accepted', '!=', 1)
            ->skip($request->offset)->take(15)->get();

        return ApiResponse::success([
            'friend_requests' => $friend_requests,
            'user_info' => $this->user,
        ], "Friend requests loaded successfully");
    }

    function accept_friend_request(Request $request)
    {
        $follwer = new Follower();
        $follwer->follow_id = $request->user_id;
        $follwer->user_id = auth()->user()->id;
        $follwer->save();

        $is_updated = Friendships::where('accepter', $this->user->id)
            ->where('requester', $request->user_id)
            ->update(['is_accepted' => 1]);

        if ($is_updated == 1) {
            // Update my friends list
            $my_friends = User::where('id', $this->user->id)->value('friends');
            $my_friends = json_decode($my_friends);
            if (is_array($my_friends)) {
                array_push($my_friends, (int)$request->user_id);
            } else {
                $my_friends = [(int)$request->user_id];
            }
            $my_friends = json_encode($my_friends);
            User::where('id', $this->user->id)->update(['friends' => $my_friends]);

            // Update my friend's friends list
            $my_friends_of_friends = User::where('id', $request->user_id)->value('friends');
            $my_friends_of_friends = json_decode($my_friends_of_friends);
            if (is_array($my_friends_of_friends)) {
                array_push($my_friends_of_friends, (int)$this->user->id);
            } else {
                $my_friends_of_friends = [(int)$this->user->id];
            }
            $my_friends_of_friends = json_encode($my_friends_of_friends);
            User::where('id', $request->user_id)->update(['friends' => $my_friends_of_friends]);

            // Send notification
            Notification::where('sender_user_id', (int)$request->user_id)
                ->where('reciver_user_id', $this->user->id)
                ->update(['status' => '1', 'view' => '1']);

            $notify = new Notification();
            $notify->sender_user_id = auth()->user()->id;
            $notify->reciver_user_id = (int)$request->user_id;
            $notify->type = "friend_request_accept";
            $notify->save();

            return ApiResponse::success([], "Friend request accepted successfully");
        }

        return ApiResponse::error([], "Failed to accept friend request", 500);
    }

    function delete_friend_request(Request $request)
    {
        $row = Friendships::where('accepter', $this->user->id)
            ->where('requester', $request->user_id)
            ->where('is_accepted', '!=', 1);

        if ($row->get()->count() > 0) {
            Friendships::where('id', $row->value('id'))->delete();
            return ApiResponse::success(null, 'Friend request deleted');
        }

        return ApiResponse::error(null, 'Friend request not found', 404);
    }

    function about($action_type, Request $request)
    {
        if ($action_type == 'update') {
            $data['about'] = $request->about;
            Users::where('id', $this->user->id)->update($data);
            return ApiResponse::success(null, 'Your bio updated');
        }

        return ApiResponse::error(null, 'Invalid action type', 400);
    }

    function my_info($action_type, Request $request)
    {
        if ($action_type == 'edit') {
            $user_info = Users::where('id', $this->user->id)->first();
            return ApiResponse::success($user_info, 'User info retrieved');
        } elseif ($action_type == 'update') {
            $data['job'] = $request->job;
            $data['studied_at'] = $request->studied_at;
            $data['address'] = $request->address;
            $data['gender'] = $request->gender;

            Users::where('id', $this->user->id)->update($data);
            return ApiResponse::success(null, 'Profile info updated');
        }

        return ApiResponse::error(null, 'Invalid action type', 400);
    }

    function upload_photo($photo_type, Request $request)
    {
        if ($photo_type == 'cover_photo') {
            $rules = array('cover_photo' => 'mimes:jpeg,jpg,png,gif|required');
            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                return ApiResponse::error($validator->errors(), 'Validation error', 400);
            }

            $file_name = FileUploader::upload($request->cover_photo, 'public/storage/cover_photo', 1120);
            $data['cover_photo'] = $file_name;
            Users::where('id', $this->user->id)->update($data);

            return ApiResponse::success(null, 'Cover photo updated');
        }

        return ApiResponse::error(null, 'Invalid photo type', 400);
    }

    function update_profile(Request $request)
    {
        $rules = array(
            'profile_photo' => 'mimes:jpeg,jpg,png,gif|nullable',
            'name' => 'max:255|required',
            'nickname' => 'max:255|nullable',
            'marital_status' => 'max:255|nullable',
            'phone' => 'max:20|nullable',
            'date_of_birth' => 'required'
        );
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), 'Validation error', 400);
        }

        if ($request->profile_photo && !empty($request->profile_photo)) {
            $file_name = FileUploader::upload($request->profile_photo, 'public/storage/userimage', 800);
            $data['photo'] = $file_name;
            $this->create_profile_photo_post($request->profile_photo, $file_name);
        }

        $data['name'] = $request->name;
        $data['nickname'] = $request->nickname;
        $data['marital_status'] = $request->marital_status;
        $data['phone'] = $request->phone;
        $data['date_of_birth'] = strtotime($request->date_of_birth);
        Users::where('id', $this->user->id)->update($data);

        return ApiResponse::success(null, 'Profile updated successfully');
    }

    function create_profile_photo_post($image, $file_name)
    {
        FileUploader::upload($image, 'public/storage/post/images/' . $file_name, 800);

        $data['user_id'] = $this->user->id;
        $data['privacy'] = 'public';
        $data['publisher'] = 'post';
        $data['publisher_id'] = $this->user->id;
        $data['post_type'] = 'profile_picture';
        $data['tagged_user_ids'] = json_encode(array());
        $data['activity_id'] = 0;
        $data['location'] = '';
        $data['description'] = '';
        $data['status'] = 'active';
        $data['user_reacts'] = json_encode(array());
        $data['created_at'] = time();
        $data['updated_at'] = $data['created_at'];
        $post_id = Posts::insertGetId($data);

        $media_file_data = array(
            'user_id' => $this->user->id,
            'post_id' => $post_id,
            'file_name' => $file_name,
            'file_type' => 'image',
            'privacy' => 'public',
            'created_at' => time(),
            'updated_at' => time()
        );
        Media_files::create($media_file_data);
    }

    function create_cover_photo_post($image, $file_name)
    {
        FileUploader::upload($image, 'public/storage/post/images/' . $file_name, 800);

        $data['user_id'] = $this->user->id;
        $data['privacy'] = 'public';
        $data['publisher'] = 'post';
        $data['publisher_id'] = $this->user->id;
        $data['post_type'] = 'cover_photo';
        $data['tagged_user_ids'] = json_encode(array());
        $data['activity_id'] = 0;
        $data['location'] = '';
        $data['description'] = '';
        $data['status'] = 'active';
        $data['user_reacts'] = json_encode(array());
        $data['created_at'] = time();
        $data['updated_at'] = $data['created_at'];
        $post_id = Posts::insertGetId($data);

        $media_file_data = array(
            'user_id' => $this->user->id,
            'post_id' => $post_id,
            'file_name' => $file_name,
            'file_type' => 'image',
            'privacy' => 'public',
            'created_at' => time(),
            'updated_at' => time()
        );
        Media_files::create($media_file_data);
    }

    public function single_post2($id)
    {
        $album_image = Album_image::where('id', $id)->first();
        if (!$album_image) {
            return ApiResponse::error(null, 'Album image not found', 404);
        }

        return ApiResponse::success($album_image, 'Album image retrieved successfully');
    }

    public function savePostList(Request $request)
    {
        $user = auth()->user();
        $savedPostsJson = $user->save_post;
        $save_posts_ids = json_decode($savedPostsJson, true) ?? [];

        if (!is_array($save_posts_ids)) {
            $save_posts_ids = [];
        }

        $posts = Posts::whereIn('post_id', $save_posts_ids)
            ->orderBy('created_at', 'desc')
            ->get();

        $friendships = Friendships::where(function ($query) {
            $query->where('accepter', auth()->user()->id)
                ->orWhere('requester', auth()->user()->id);
        })
            ->where('is_accepted', 1)
            ->orderBy('friendships.importance', 'desc')
            ->get();

        $response_data = [
            'friendships' => $friendships,
            'user_info' => $this->user,
            'posts' => $posts,
            'type' => 'user_post',
        ];

        return ApiResponse::success($response_data, 'Saved posts retrieved successfully');
    }

    public function profileLock()
    {
        $id = auth()->user()->id;
        $user = User::findOrFail($id);
        $user->profile_status = 'lock';
        $user->save();

        Posts::where('user_id', $id)
            ->where('privacy', 'public')
            ->update(['privacy' => 'friends']);

        return ApiResponse::success(null, 'Profile locked successfully and privacy updated');
    }

    public function profileUnlock()
    {
        $id = auth()->user()->id;
        $profile_status = User::findOrFail($id);
        $profile_status->profile_status = 'unlock';
        $profile_status->save();

        return ApiResponse::success(null, 'Profile unlocked successfully');
    }

    public function checkinsView()
    {
        $user = auth()->user();
        $posts = Posts::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        $friendships = Friendships::where(function ($query) {
            $query->where('accepter', auth()->user()->id)
                ->orWhere('requester', auth()->user()->id);
        })
            ->where('is_accepted', 1)
            ->orderBy('friendships.importance', 'desc')
            ->get();

        $response_data = [
            'friendships' => $friendships,
            'user_info' => $this->user,
            'posts' => $posts,
            'type' => 'user_post',
        ];

        return ApiResponse::success($response_data, 'Check-ins retrieved successfully');
    }
}