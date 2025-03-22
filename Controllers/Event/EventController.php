<?php

namespace App\Http\Controllers\Event;

use Image, Session;
use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Posts;
use App\Models\Friendships;
use App\Models\Invite;
use App\Models\Notification;
use App\Models\Share;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\Rule;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use App\Helpers\ApiResponse; // Import the ApiResponse helper

class EventController extends Controller
{
    // Event view
    public function allevents()
    {
        $events = Event::where('privacy', 'public')->whereNull('group_id')->orderBy('id', 'DESC')->limit(20)->get();
        return ApiResponse::success($events, "Public events fetched successfully", 200);
    }

    // User event
    public function userevent()
    {
        $events = Event::where('user_id', Auth::user()->id)->whereNull('group_id')->orderBy('id', 'DESC')->get();
        return ApiResponse::success($events, "User events fetched successfully", 200);
    }

    // Event store
    public function store(Request $request)
    {
        $rules = array(
            'coverphoto' => 'mimes:jpeg,jpg,png,gif|nullable',
            'eventname' => 'required|max:255',
            'eventdate' => 'required',
            'eventtime' => 'required',
            'eventlocation' => 'required',
        );
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), "Validation error", 422);
        }

        $file_name = null;
        if ($request->coverphoto && !empty($request->coverphoto)) {
            $file_name = rand(1, 35000) . '.' . $request->coverphoto->getClientOriginalExtension();

            // Thumbnail
            $img = Image::make($request->coverphoto);
            $img->resize(325, null, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            });
            $img->save(uploadTo('event/thumbnail') . $file_name);

            // Cover photo
            $img = Image::make($request->coverphoto);
            $img->resize(1120, null, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            });
            $img->save(uploadTo('event/coverphoto') . $file_name);
        }

        $event = new Event();
        $event->user_id = Auth::user()->id;
        $event->title = $request->eventname;
        $event->description = $request->description;
        $event->event_date = $request->eventdate;
        $event->event_time = $request->eventtime;
        $event->location = $request->eventlocation;
        if (isset($request->group_id)) {
            $event->group_id = $request->group_id;
        }
        $event->banner = $file_name;
        $event->going_users_id = "[]";
        $event->interested_users_id = "[]";
        $event->privacy = $request->privacy;
        $event->save();

        $post = Posts::create([
            'user_id' => auth()->user()->id,
            'privacy' => $request->privacy,
            'publisher' => 'event',
            'publisher_id' => $event->id,
            'post_type' => "event",
            'status' => 'active',
            'description' => $request->description,
            'user_reacts' => json_encode(array()),
            'tagged_user_ids' => json_encode(array()),
            'created_at' => time(),
            'updated_at' => time(),
        ]);

        return ApiResponse::success($event, "Event created successfully", 201);
    }

    // Update event
    public function update(Request $request, $id)
    {
        $rules = array(
            'coverphoto' => 'mimes:jpeg,jpg,png,gif|nullable',
            'eventname' => 'required|max:255',
            'eventdate' => 'required',
            'eventtime' => 'required',
            'eventlocation' => 'required',
        );
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), "Validation error", 422);
        }

        $event = Event::find($id);
        if (!$event) {
            return ApiResponse::error(null, "Event not found", 404);
        }

        $file_name = $event->banner;
        if ($request->coverphoto && !empty($request->coverphoto)) {
            $file_name = rand(1, 35000) . '.' . $request->coverphoto->getClientOriginalExtension();

            // Thumbnail
            $img = Image::make($request->coverphoto);
            $img->resize(325, null, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            });
            $img->save(uploadTo('event/thumbnail') . $file_name);

            // Cover photo
            $img = Image::make($request->coverphoto);
            $img->resize(1120, null, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            });
            $img->save(uploadTo('event/coverphoto') . $file_name);

            // Remove old image
            removeFile('event', $event->banner);
        }

        $event->title = $request->eventname;
        $event->description = $request->description;
        $event->event_date = $request->eventdate;
        $event->event_time = $request->eventtime;
        $event->location = $request->eventlocation;
        $event->banner = $file_name;
        $event->privacy = $request->privacy;
        $event->save();

        return ApiResponse::success($event, "Event updated successfully", 200);
    }

    // Delete event
    public function event_delete()
    {
        $event = Event::find($_GET['event_id']);
        if (!$event) {
            return ApiResponse::error(null, "Event not found", 404);
        }

        $imagename = $event->banner;
        $event->delete();
        removeFile('event', $imagename);

        return ApiResponse::success(null, "Event deleted successfully", 200);
    }

    // Single event view
    public function single_event($id)
    {
        $event = Event::find($id);
        if (!$event) {
            return ApiResponse::error(null, "Event not found", 404);
        }

        // Calculation of popular event
        $events = Event::where('privacy', 'public')->orderBy('id', 'DESC')->where('user_id', '!=', auth()->user()->id)->where('id', '!=', $id)->limit('500')->get();
        $popularrate = [];
        foreach ($events as $event) {
            $goingusercount = count(json_decode($event->going_users_id));
            $interestedusercount = count(json_decode($event->interested_users_id));
            $total = $goingusercount + $interestedusercount;
            array_push($popularrate, [
                'id' => $event->id,
                'popular' => $total,
                'banner' => $event->banner,
                'event_date' => $event->event_date,
                'event_time' => $event->event_time,
                'location' => $event->location,
                'title' => $event->title,
                'post_user' => $event->getUser->name,
                'user_id' => $event->getUser->id,
                'photo' => $event->getUser->photo,
                'interested_users_id' => $event->interested_users_id,
            ]);
        }

        // Custom function for descending order
        aasort($popularrate, "popular");

        // Friend find
        $friends = Friendships::where('requester', auth()->user()->id)->orWhere('accepter', auth()->user()->id)->where('is_accepted', '1')->orderBy('id', 'DESC')->get();
        $invited_friend_going = Invite::where('event_id', $id)->where('is_accepted', "1")->count();

        // For sending user invite
        $users = User::orderBy('id', 'DESC')->limit('10')->get();

        $posts = Posts::where(function ($query) {
            $query->where('posts.privacy', '!=', 'private')
                ->orWhere('posts.user_id', auth()->user()->id);
        })
            ->where('publisher_id', $id)->where('publisher', 'event')
            ->where('posts.status', 'active')
            ->join('users', 'posts.user_id', '=', 'users.id')
            ->select('posts.*', 'users.name', 'users.photo', 'users.friends', 'posts.created_at as created_at')
            ->orderBy('posts.post_id', 'DESC')->get();

        // New
        $friendships = Friendships::where(function ($query) {
            $query->where('accepter', auth()->user()->id)
                ->orWhere('requester', auth()->user()->id);
        })
            ->where('is_accepted', 1)
            ->orderBy('friendships.importance', 'desc')
            ->take(15)->get();

        $data = [
            'users' => $users,
            'posts' => $posts,
            'invited_friend_going' => $invited_friend_going,
            'friends' => $friends,
            'popularevents' => $popularrate,
            'event' => $event,
            'event_going' => $event,
            'friendships' => $friendships,
        ];

        return ApiResponse::success($data, "Single event data fetched successfully", 200);
    }

    // Event going
    public function event_going($id)
    {
        $event = Event::find($id);
        if (!$event) {
            return ApiResponse::error(null, "Event not found", 404);
        }

        $going_user_id = auth()->user()->id;
        $event_going_user = json_decode($event->going_users_id);
        array_push($event_going_user, $going_user_id);
        $event->going_users_id = json_encode($event_going_user);
        $event->save();

        return ApiResponse::success(null, "Going to event", 200);
    }

    // Event not going
    public function event_notgoing($id)
    {
        $event = Event::find($id);
        if (!$event) {
            return ApiResponse::error(null, "Event not found", 404);
        }

        $going_user_id = auth()->user()->id;
        $event_going_user = json_decode($event->going_users_id, true);
        $this_user_key = array_search($going_user_id, $event_going_user);
        array_splice($event_going_user, $this_user_key);
        $event->going_users_id = json_encode($event_going_user);
        $event->save();

        return ApiResponse::success(null, "Cancelled going to event", 200);
    }

    // Event interested
    public function event_interested($id)
    {
        $event = Event::find($id);
        if (!$event) {
            return ApiResponse::error(null, "Event not found", 404);
        }

        $interested_user_id = auth()->user()->id;
        $event_interested_user = json_decode($event->interested_users_id);
        array_push($event_interested_user, $interested_user_id);
        $event->interested_users_id = json_encode($event_interested_user);
        $event->save();

        return ApiResponse::success(null, "Interested in event", 200);
    }

    // Event not interested
    public function event_notinterested($id)
    {
        $event = Event::find($id);
        if (!$event) {
            return ApiResponse::error(null, "Event not found", 404);
        }

        $interested_user_id = auth()->user()->id;
        $event_interested_user = json_decode($event->interested_users_id, true);
        $this_user_key = array_search($interested_user_id, $event_interested_user);
        array_splice($event_interested_user, $this_user_key);
        $event->interested_users_id = json_encode($event_interested_user);
        $event->save();

        return ApiResponse::success(null, "Not interested in event", 200);
    }

    // Event cancel
    public function event_cancel($id)
    {
        $event = Event::find($id);
        if (!$event) {
            return ApiResponse::error(null, "Event not found", 404);
        }

        $user_id = auth()->user()->id;

        // Remove from interested users
        $event_interested_user = json_decode($event->interested_users_id, true);
        $this_user_key = array_search($user_id, $event_interested_user);
        array_splice($event_interested_user, $this_user_key);
        $event->interested_users_id = json_encode($event_interested_user);

        // Remove from going users
        $event_going_user = json_decode($event->going_users_id, true);
        $this_user_key = array_search($user_id, $event_going_user);
        array_splice($event_going_user, $this_user_key);
        $event->going_users_id = json_encode($event_going_user);

        $event->save();

        return ApiResponse::success(null, "Event has been canceled", 200);
    }

    // Invite to friend
    public function event_invite($invited_friend_id, $requester_id, $event_id)
    {
        $invite = new Invite();
        $invite->invite_reciver_id = $invited_friend_id;
        $invite->invite_sender_id = $requester_id;
        $invite->event_id = $event_id;
        $invite->save();

        $notify = new Notification();
        $notify->sender_user_id = auth()->user()->id;
        $notify->reciver_user_id = $invited_friend_id;
        $notify->type = 'event';
        $notify->event_id = $event_id;
        $notify->save();

        return ApiResponse::success(null, "Invite sent successfully", 200);
    }

    // Load event on scroll
    public function load_event_by_scrolling(Request $request)
    {
        $events = Event::where('privacy', 'public')->whereNull('group_id')->skip($request->offset)->take(20)->orderBy('id', 'DESC')->get();
        return ApiResponse::success($events, "Events loaded successfully", 200);
    }

    // Share event
    public function shareevent()
    {
        $id = $_GET['event_id'];
        $url = url('/') . '/event/' . $id;

        $share = new Share();
        $share->share_user_id = auth()->user()->id;
        $share->event_id = $id;
        $share->url = $url;
        $share->save();

        return ApiResponse::success(null, "Event shared successfully", 200);
    }

    // Search user for event inviting
    public function search_user_for_event_inviting(Request $request)
    {
        $users = User::where('name', 'like', '%' . $request->search_value . '%')->take(30)->get();
        return ApiResponse::success($users, "Users fetched successfully", 200);
    }

    // Sent invitation
    public function sent_invition(Request $request)
    {
        $invited_event_users_id = $request->invited_event_users_id;
        $count = count($invited_event_users_id);

        for ($i = 0; $i < $count; $i++) {
            $invite = new Invite();
            $invite->invite_sender_id = auth()->user()->id;
            $invite->invite_reciver_id = $invited_event_users_id[$i];
            $invite->is_accepted = '0';
            $invite->event_id = $request->event_id;
            $invite->save();

            $notify = new Notification();
            $notify->sender_user_id = auth()->user()->id;
            $notify->reciver_user_id = $invited_event_users_id[$i];
            $notify->type = 'event';
            $notify->event_id = $request->event_id;
            $notify->save();
        }

        return ApiResponse::success(null, "Event invitations sent successfully", 200);
    }
}