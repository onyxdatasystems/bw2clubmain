<?php

namespace App\Http\Controllers;

use App\Models\Album_image;
use App\Models\Group;
use App\Models\Page;
use App\Models\Group_member;
use App\Models\Friendships;
use App\Models\Media_files;
use App\Models\Posts;
use App\Models\Albums;
use App\Models\Event;
use App\Models\Invite;
use App\Models\Notification;
use App\Models\User;
use App\Models\FileUploader;
use Illuminate\Http\Request;
use Image, Session;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use DB;
use App\Helpers\ApiResponse; // Import the ApiResponse helper

class GroupController extends Controller
{
    public function groups()
    {
        $groups = Group::orderBy('id', 'DESC')
            ->where('privacy', 'public')
            ->where('status', '1')
            ->limit('18')
            ->get();

        $managegroups = Group::orderBy('id', 'DESC')
            ->where('user_id', auth()->user()->id)
            ->limit('6')
            ->get();

        $joinedgroups = Group_member::where('user_id', auth()->user()->id)
            ->where('is_accepted', '1')
            ->limit('6')
            ->get();

        return ApiResponse::success([
            'groups' => $groups,
            'managegroups' => $managegroups,
            'joinedgroups' => $joinedgroups,
        ], 'Groups data fetched successfully');
    }

    public function single_group($id)
    {
        $group = Group::find($id);
        if (!$group) {
            return ApiResponse::error(null, 'Group not found', 404);
        }

        $posts = Posts::where('posts.privacy', '!=', 'private')
            ->where('posts.publisher', 'group')
            ->where('posts.publisher_id', $id)
            ->where('posts.status', 'active')
            ->join('users', 'posts.user_id', '=', 'users.id')
            ->select('posts.*', 'users.name', 'users.photo', 'users.friends', 'posts.created_at as created_at')
            ->orderBy('posts.post_id', 'DESC')
            ->get();

        $totalmember = Group_member::where('group_id', $id)
            ->where('is_accepted', '1')
            ->count();

        $friendships = Friendships::where(function ($query) {
            $query->where('accepter', auth()->user()->id)
                ->orWhere('requester', auth()->user()->id);
        })
            ->where('is_accepted', 1)
            ->orderBy('friendships.importance', 'desc')
            ->take(15)
            ->get();

        return ApiResponse::success([
            'group' => $group,
            'posts' => $posts,
            'member_count' => $totalmember,
            'friendships' => $friendships,
        ], 'Group data fetched successfully');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'mimes:jpeg,jpg,png,gif|nullable',
            'name' => 'required|max:255',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), 'Validation failed', 422);
        }

        if ($request->image && !empty($request->image)) {
            $file_name = FileUploader::upload($request->image, 'public/storage/groups/logo', 300);
        }

        $group = new Group();
        $group->user_id = auth()->user()->id;
        $group->title = $request->name;
        $group->subtitle = $request->subtitle;
        $group->about = $request->about;
        $group->privacy = $request->privacy;
        $group->status = $request->status;
        if ($request->image && !empty($request->image)) {
            $group->logo = $file_name;
        }
        $group->save();

        $group_member = new Group_member();
        $group_member->group_id = $group->id;
        $group_member->user_id = auth()->user()->id;
        $group_member->role = 'admin';
        $group_member->is_accepted = '1';
        $group_member->save();

        return ApiResponse::success($group, 'Group created successfully', 201);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'mimes:jpeg,jpg,png,gif|nullable',
            'name' => 'required|max:255',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), 'Validation failed', 422);
        }

        $group = Group::find($id);
        if (!$group) {
            return ApiResponse::error(null, 'Group not found', 404);
        }

        $imagename = $group->logo;
        if ($request->image && !empty($request->image)) {
            $file_name = FileUploader::upload($request->image, 'public/storage/groups/logo', 300);
        }

        $group->title = $request->name;
        $group->subtitle = $request->subtitle;
        $group->about = $request->about;
        $group->privacy = $request->privacy;
        $group->status = $request->status;
        $group->location = $request->location;
        $group->group_type = $request->group_type;
        if ($request->image && !empty($request->image)) {
            $group->logo = $file_name;
        }
        $group->save();

        if (!empty($request->image)) {
            if (File::exists(public_path('storage/groups/logo/' . $imagename))) {
                File::delete(public_path('storage/groups/logo/' . $imagename));
            }
        }

        return ApiResponse::success($group, 'Group updated successfully');
    }

    public function updatecoverphoto(Request $request, $id)
    {
        $group = Group::find($id);
        if (!$group) {
            return ApiResponse::error(null, 'Group not found', 404);
        }

        $imagename = $group->coverphoto;
        if ($request->cover_photo && !empty($request->cover_photo)) {
            $file_name = rand(1, 35000) . '.' . $request->cover_photo->getClientOriginalExtension();
            $img = Image::make($request->cover_photo);
            $img->resize(1120, null, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            });
            $img->save(uploadTo('groups/coverphoto') . $file_name);
            $group->banner = $file_name;
        }
        $group->save();

        if (!empty($request->cover_photo)) {
            if (File::exists(public_path('storage/groups/coverphoto/' . $imagename))) {
                File::delete(public_path('storage/groups/coverphoto/' . $imagename));
            }
        }

        return ApiResponse::success($group, 'Cover photo updated successfully');
    }

    public function join($id)
    {
        $group_member = new Group_member();
        $group_member->group_id = $id;
        $group_member->user_id = auth()->user()->id;
        $group_member->role = 'general';
        $group_member->is_accepted = '1';
        $group_member->save();

        return ApiResponse::success(null, 'Group joined successfully');
    }

    public function rjoin($id)
    {
        Group_member::where('group_id', $id)
            ->where('user_id', auth()->user()->id)
            ->delete();

        return ApiResponse::success(null, 'Group joining canceled');
    }

    public function peopelinfo($id)
    {
        $group = Group::find($id);
        if (!$group) {
            return ApiResponse::error(null, 'Group not found', 404);
        }

        $friends = Friendships::where('requester', auth()->user()->id)
            ->orWhere('accepter', auth()->user()->id)
            ->where('is_accepted', '1')
            ->orderBy('id', 'DESC')
            ->limit('20')
            ->get();

        $friends_count = Friendships::where('requester', auth()->user()->id)
            ->orWhere('accepter', auth()->user()->id)
            ->where('is_accepted', '1')
            ->count();

        $users = User::whereJsonDoesntContain('friends', auth()->user()->id)->get();
        $total_member = Group_member::where('is_accepted', '1')
            ->where('group_id', $id)
            ->count();

        $recent_team_member = Group_member::where('is_accepted', '1')
            ->where('group_id', $id)
            ->orderBy('id', 'DESC')
            ->limit('5')
            ->get();

        return ApiResponse::success([
            'group' => $group,
            'friends' => $friends,
            'friends_count' => $friends_count,
            'users' => $users,
            'total_member' => $total_member,
            'recent_team_member' => $recent_team_member,
        ], 'People info fetched successfully');
    }

    public function group_photos($id)
    {
        $group = Group::find($id);
        if (!$group) {
            return ApiResponse::error(null, 'Group not found', 404);
        }

        $all_photos = Media_files::where('group_id', $id)
            ->where('file_type', 'image')
            ->orderBy('id', 'DESC')
            ->get();

        $all_videos = Media_files::where('group_id', $id)
            ->where('file_type', 'video')
            ->orderBy('id', 'DESC')
            ->get();

        $all_albums = Albums::where('group_id', $id)
            ->orderBy('id', 'DESC')
            ->get();

        return ApiResponse::success([
            'group' => $group,
            'all_photos' => $all_photos,
            'all_videos' => $all_videos,
            'all_albums' => $all_albums,
        ], 'Group photos and videos fetched successfully');
    }

    public function all_people_group($id)
    {
        $group = Group::find($id);
        if (!$group) {
            return ApiResponse::error(null, 'Group not found', 404);
        }

        $all_members = Group_member::where('is_accepted', '1')
            ->where('group_id', $id)
            ->orderBy('id', 'DESC')
            ->get();

        $total_member = Group_member::where('is_accepted', '1')
            ->where('group_id', $id)
            ->count();

        return ApiResponse::success([
            'group' => $group,
            'all_members' => $all_members,
            'total_member' => $total_member,
        ], 'All group members fetched successfully');
    }

    public function group_event($id)
    {
        $group = Group::find($id);
        if (!$group) {
            return ApiResponse::error(null, 'Group not found', 404);
        }

        $group_events = Event::where('group_id', $id)
            ->where(function ($query) {
                $query->where('privacy', '!=', 'private')
                    ->orWhere('user_id', auth()->user()->id);
            })
            ->get();

        return ApiResponse::success([
            'group' => $group,
            'group_events' => $group_events,
        ], 'Group events fetched successfully');
    }

    public function add_album_image(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'images' => 'required|array',
            'images.*' => 'mimes:jpeg,jpg,png,gif',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), 'Validation failed', 422);
        }

        foreach ($request->images as $key => $media_file) {
            $file_name = FileUploader::upload($media_file, 'public/storage/album/images', 1000, null, 300);
            $file_type = 'image';

            $albumimage = new Album_image();
            $albumimage->user_id = auth()->user()->id;
            $albumimage->album_id = $request->album;
            $albumimage->image = $file_name;

            if (isset($request->page_id) && !empty($request->page_id)) {
                $albumimage->page_id = $request->page_id;
            } elseif (isset($request->group_id) && !empty($request->group_id)) {
                $albumimage->group_id = $request->group_id;
            }

            $albumimage->save();
        }

        return ApiResponse::success(null, 'Images added to album successfully');
    }

    public function search_group()
    {
        $search = $_GET['search'];
        $searchgroup = Group::where('title', 'like', '%' . $search . '%')->get();
        $managegroups = Group::orderBy('id', 'DESC')
            ->where('user_id', auth()->user()->id)
            ->limit('6')
            ->get();

        $joinedgroups = Group_member::where('user_id', auth()->user()->id)
            ->where('is_accepted', '1')
            ->limit('6')
            ->get();

        return ApiResponse::success([
            'searchgroup' => $searchgroup,
            'managegroups' => $managegroups,
            'joinedgroups' => $joinedgroups,
        ], 'Group search results fetched successfully');
    }

    public function group_all_view()
    {
        $managegroups = Group::orderBy('id', 'DESC')
            ->where('user_id', auth()->user()->id)
            ->limit('6')
            ->get();

        $joinedgroups = Group_member::where('user_id', auth()->user()->id)
            ->where('is_accepted', '1')
            ->limit('6')
            ->get();

        $groups = Group::orderBy('id', 'DESC')
            ->limit('8')
            ->get();

        return ApiResponse::success([
            'managegroups' => $managegroups,
            'joinedgroups' => $joinedgroups,
            'groups' => $groups,
        ], 'All groups fetched successfully');
    }

    public function load_groups_by_scrolling(Request $request)
    {
        $groups = Group::skip($request->offset)
            ->take(6)
            ->orderBy('id', 'DESC')
            ->get();

        return ApiResponse::success($groups, 'Groups fetched successfully');
    }

    public function group_user_create()
    {
        $managegroups = Group::orderBy('id', 'DESC')
            ->where('user_id', auth()->user()->id)
            ->limit('6')
            ->get();

        $joinedgroups = Group_member::where('user_id', auth()->user()->id)
            ->where('is_accepted', '1')
            ->limit('6')
            ->get();

        $groups = Group::where('user_id', auth()->user()->id)->get();

        return ApiResponse::success([
            'managegroups' => $managegroups,
            'joinedgroups' => $joinedgroups,
            'groups' => $groups,
        ], 'User groups fetched successfully');
    }

    public function group_user_joined()
    {
        $managegroups = Group::orderBy('id', 'DESC')
            ->where('user_id', auth()->user()->id)
            ->limit('6')
            ->get();

        $joinedgroups = Group_member::where('user_id', auth()->user()->id)
            ->where('is_accepted', '1')
            ->limit('6')
            ->get();

        $groups = Group_member::where('user_id', auth()->user()->id)
            ->where('is_accepted', '1')
            ->get();

        return ApiResponse::success([
            'managegroups' => $managegroups,
            'joinedgroups' => $joinedgroups,
            'groups' => $groups,
        ], 'User joined groups fetched successfully');
    }

    public function search_friends_for_inviting(Request $request)
    {
        $friends = User::where('name', 'like', '%' . $request->search_value . '%')
            ->take(30)
            ->get();

        return ApiResponse::success([
            'users' => $friends,
            'group_id' => $request->group_id,
        ], 'Friends fetched for inviting');
    }

    public function sent_invition(Request $request)
    {
        $invited_group_users_id = $request->invited_group_users_id;
        $count = count($invited_group_users_id);

        for ($i = 0; $i < $count; $i++) {
            $invite = new Invite();
            $invite->invite_sender_id = auth()->user()->id;
            $invite->invite_reciver_id = $invited_group_users_id[$i];
            $invite->is_accepted = '0';
            $invite->group_id = $request->group_id;
            $invite->save();

            $notify = new Notification();
            $notify->sender_user_id = auth()->user()->id;
            $notify->reciver_user_id = $invited_group_users_id[$i];
            $notify->type = 'group';
            $notify->group_id = $request->group_id;
            $notify->save();
        }

        return ApiResponse::success(null, 'Group invitations sent successfully');
    }

    public function album_details_list($identifire = "", $album_id)
    {
        $response_data = [];
    
        if ($identifire == 'profile' || $identifire == 'customer') {
            $view_path = 'frontend.profile.index';
        } elseif ($identifire == 'albums') {
            $view_path = 'frontend.profile.single_album_list_details';
            $list = Albums::where('id', $album_id)->first();
            if (!$list) {
                return ApiResponse::error(null, 'Album not found', 404);
            }
            $group = Group::find($list->group_id);
            if (!$group) {
                return ApiResponse::error(null, 'Group not found', 404);
            }
            $response_data['group'] = $group;
        } else {
            $view_path = 'frontend.profile.single_album_list_details';
            $list = Albums::where('id', $album_id)->first();
            if (!$list) {
                return ApiResponse::error(null, 'Album not found', 404);
            }
            $page = Page::find($list->page_id);
            if (!$page) {
                return ApiResponse::error(null, 'Page not found', 404);
            }
            $response_data['page'] = $page;
        }
    
        // Fetch friendships
        $friendships = Friendships::where(function ($query) {
            $query->where('accepter', auth()->user()->id)
                ->orWhere('requester', auth()->user()->id);
        })
            ->where('is_accepted', 1)
            ->orderBy('friendships.importance', 'desc')
            ->take(15)
            ->get();
    
        $response_data['friendships'] = $friendships;
        $response_data['album_id'] = $album_id;
        $response_data['identifire'] = $identifire;
        $response_data['view_path'] = $view_path;
    
        return ApiResponse::success($response_data, 'Album details fetched successfully');
    }
}