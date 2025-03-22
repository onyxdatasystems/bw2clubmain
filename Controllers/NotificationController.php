<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Friendships;
use App\Models\Fundraiser;
use App\Models\Invite;
use App\Models\Notification;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Helpers\ApiResponse; // Import the ApiResponse helper

class NotificationController extends Controller
{
    public function notifications()
    {
        $date = Carbon::today();
        $new_notification = Notification::where('reciver_user_id', auth()->user()->id)
            ->where('status', '0')
            ->orderBy('id', 'DESC')
            ->get();

        $older_notification = Notification::where('reciver_user_id', auth()->user()->id)
            ->where('created_at', '<', $date)
            ->orderBy('id', 'DESC')
            ->get();

        return ApiResponse::success([
            'new_notification' => $new_notification,
            'older_notification' => $older_notification,
        ], 'Notifications fetched successfully');
    }

    public function accept_friend_notification($id)
    {
        $is_updated = Friendships::where('requester', $id)
            ->where('accepter', auth()->user()->id)
            ->update(['is_accepted' => '1']);

        Notification::where('sender_user_id', $id)
            ->where('reciver_user_id', auth()->user()->id)
            ->update(['status' => '1', 'view' => '1']);

        if ($is_updated) {
            // Update my id to my friend list
            $my_friends = User::where('id', auth()->user()->id)->value('friends');
            $my_friends = json_decode($my_friends, true) ?? [];
            $my_friends[] = (int) $id;
            User::where('id', auth()->user()->id)->update(['friends' => json_encode($my_friends)]);

            // Update my id to my friend's friend list
            $my_friends_of_friends = User::where('id', $id)->value('friends');
            $my_friends_of_friends = json_decode($my_friends_of_friends, true) ?? [];
            $my_friends_of_friends[] = (int) auth()->user()->id;
            User::where('id', $id)->update(['friends' => json_encode($my_friends_of_friends)]);
        }

        $notify = new Notification();
        $notify->sender_user_id = auth()->user()->id;
        $notify->reciver_user_id = $id;
        $notify->type = "friend_request_accept";
        $notify->save();

        return ApiResponse::success(null, 'Friend request accepted successfully');
    }

    public function decline_friend_notification($id)
    {
        Friendships::where('requester', $id)
            ->where('accepter', auth()->user()->id)
            ->delete();

        Notification::where('sender_user_id', $id)
            ->where('reciver_user_id', auth()->user()->id)
            ->delete();

        return ApiResponse::success(null, 'Friend request declined successfully');
    }

    public function accept_group_notification($id, $group_id)
    {
        $is_updated = Invite::where('invite_sender_id', $id)
            ->where('invite_reciver_id', auth()->user()->id)
            ->where('group_id', $group_id)
            ->update(['is_accepted' => '1']);

        Notification::where('sender_user_id', $id)
            ->where('reciver_user_id', auth()->user()->id)
            ->update(['status' => '1', 'view' => '1']);

        $notify = new Notification();
        $notify->sender_user_id = auth()->user()->id;
        $notify->reciver_user_id = $id;
        $notify->type = "group_invitation_accept";
        $notify->save();

        return ApiResponse::success(null, 'Group invitation accepted successfully');
    }

    public function decline_group_notification($id, $group_id)
    {
        Invite::where('invite_sender_id', $id)
            ->where('invite_reciver_id', auth()->user()->id)
            ->where('group_id', $group_id)
            ->delete();

        Notification::where('sender_user_id', $id)
            ->where('reciver_user_id', auth()->user()->id)
            ->delete();

        return ApiResponse::success(null, 'Group invitation declined successfully');
    }

    public function accept_event_notification($id, $event_id)
    {
        $is_updated = Invite::where('invite_sender_id', $id)
            ->where('invite_reciver_id', auth()->user()->id)
            ->where('event_id', $event_id)
            ->update(['is_accepted' => '1']);

        Notification::where('sender_user_id', $id)
            ->where('reciver_user_id', auth()->user()->id)
            ->update(['status' => '1', 'view' => '1']);

        if ($is_updated) {
            $going_users_id = Event::where('id', $event_id)->value('going_users_id');
            $going_users_id = json_decode($going_users_id, true) ?? [];
            $going_users_id[] = (int) $id;
            Event::where('id', $event_id)->update(['going_users_id' => json_encode($going_users_id)]);
        }

        $notify = new Notification();
        $notify->sender_user_id = auth()->user()->id;
        $notify->reciver_user_id = $id;
        $notify->type = "event_invitation_accept";
        $notify->save();

        return ApiResponse::success(null, 'Event invitation accepted successfully');
    }

    public function decline_event_notification($id, $event_id)
    {
        Invite::where('invite_sender_id', $id)
            ->where('invite_reciver_id', auth()->user()->id)
            ->where('event_id', $event_id)
            ->delete();

        Notification::where('sender_user_id', $id)
            ->where('reciver_user_id', auth()->user()->id)
            ->delete();

        return ApiResponse::success(null, 'Event invitation declined successfully');
    }

    public function mark_as_read($id)
    {
        Notification::where('id', $id)->update(['status' => '1', 'view' => '1']);
        return ApiResponse::success(null, 'Notification marked as read');
    }

    // Fundraiser
    public function accept_fundraiser_notification($id, $fundraiser_id)
    {
        $is_updated = Invite::where('invite_sender_id', $id)
            ->where('invite_reciver_id', auth()->user()->id)
            ->where('fundraiser_id', $fundraiser_id)
            ->update(['is_accepted' => '1']);

        Notification::where('sender_user_id', $id)
            ->where('reciver_user_id', auth()->user()->id)
            ->update(['status' => '1', 'view' => '1']);

        $notify = new Notification();
        $notify->sender_user_id = auth()->user()->id;
        $notify->reciver_user_id = $id;
        $notify->type = "fundraiser_request_accept";
        $notify->save();

        return ApiResponse::success(null, 'Fundraiser invitation accepted successfully');
    }

    public function decline_fundraiser_notification($id, $fundraiser_id)
    {
        Invite::where('invite_sender_id', $id)
            ->where('invite_reciver_id', auth()->user()->id)
            ->where('fundraiser_id', $fundraiser_id)
            ->delete();

        Notification::where('sender_user_id', $id)
            ->where('reciver_user_id', auth()->user()->id)
            ->delete();

        return ApiResponse::success(null, 'Fundraiser invitation declined successfully');
    }
}