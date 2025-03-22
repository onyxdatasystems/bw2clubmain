<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Chat;
use App\Models\Friendships;
use App\Models\Media_files;
use App\Models\Message_thrade;
use App\Models\FileUploader;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Session;
use Image;
use DB;
use App\Helpers\ApiResponse; // Import the ApiResponse helper

class ChatController extends Controller
{
    public function chat($reciver = null, $product = null)
    {
        $user_id = auth()->user()->id;
        $messageThrade = Message_thrade::where(function ($query) use ($reciver, $user_id) {
            $query->where('sender_id', $reciver)
                ->where('reciver_id', $user_id);
        })->orWhere(function ($query) use ($reciver, $user_id) {
            $query->where('sender_id', $user_id)
                ->where('reciver_id', $reciver);
        })->first();

        $reciver_data = User::find($reciver);
        if (!$reciver_data) {
            return ApiResponse::error(null, 'Receiver not found', 404);
        }

        if (!empty($messageThrade)) {
            Chat::where('message_thrade', $messageThrade->id)
                ->where('reciver_id', $reciver)
                ->where('read_status', '0')
                ->update(['read_status' => '1']);

            $message = Chat::where('message_thrade', $messageThrade->id)
                ->orderBy('id', 'DESC')
                ->limit('20')
                ->get();
        } else {
            $message = [];
        }

        $product_url = isset($product) && $product != null ? url('/') . '/product/view/' . $product : null;

        $previousChatList = Message_thrade::where('reciver_id', auth()->user()->id)
            ->orWhere('sender_id', auth()->user()->id)
            ->orderBy('id', 'DESC')
            ->get();

        return ApiResponse::success([
            'receiver_data' => $reciver_data,
            'messages' => $message,
            'previous_chat_list' => $previousChatList,
            'product_url' => $product_url,
        ], 'Chat data fetched successfully');
    }

    public function chat_save(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'reciver_id' => 'required',
            'message' => 'required',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), 'Validation failed', 422);
        }

        $reciver = $request->reciver_id;
        $user_id = auth()->user()->id;

        $firstmessageThrade = Message_thrade::where(function ($query) use ($reciver, $user_id) {
            $query->where('sender_id', $reciver)
                ->where('reciver_id', $user_id);
        })->orWhere(function ($query) use ($reciver, $user_id) {
            $query->where('sender_id', $user_id)
                ->where('reciver_id', $reciver);
        })->first();

        $messageThradeCount = Message_thrade::where(function ($query) use ($reciver, $user_id) {
            $query->where('sender_id', $reciver)
                ->where('reciver_id', $user_id);
        })->orWhere(function ($query) use ($reciver, $user_id) {
            $query->where('sender_id', $user_id)
                ->where('reciver_id', $reciver);
        })->count();

        if ($messageThradeCount <= 0) {
            $messageThrade = new Message_thrade();
            $messageThrade->sender_id = auth()->user()->id;
            $messageThrade->reciver_id = $request->reciver_id;
            $messageThrade->chatcenter = $request->messagecenter;
            $done = $messageThrade->save();

            if ($done) {
                $chat = new Chat();
                $chat->reciver_id = $request->reciver_id;
                $chat->sender_id = auth()->user()->id;
                $chat->chatcenter = $request->messagecenter;
                $chat->message = $request->message;
                $chat->message_thrade = $messageThrade->id;
                $chat->thumbsup = $request->thumbsup;
                $chat->file = '1';
                $chat->save();
                $last_chat_id = $chat->id;

                if (is_array($request->multiple_files) && $request->multiple_files[0] != null) {
                    $rules = ['multiple_files' => 'mimes:jpeg,jpg,png,gif,jfif,mp4,mov,wmv,mkv,webm,avi'];
                    $validator = Validator::make($request->multiple_files, $rules);

                    if ($validator->fails()) {
                        return ApiResponse::error($validator->errors(), 'File validation failed', 422);
                    }

                    foreach ($request->multiple_files as $key => $media_file) {
                        $file_name = random(40);
                        $file_extention = strtolower($media_file->getClientOriginalExtension());

                        if (in_array($file_extention, ['avi', 'mp4', 'webm', 'mov', 'wmv', 'mkv'])) {
                            $media_file->move('storage/chat/videos/', $file_name . '.' . $file_extention);
                            $file_type = 'video';
                        } else {
                            FileUploader::upload($media_file, 'public/storage/chat/images/' . $file_name, 1000, null, 300);
                            $file_type = 'image';
                        }

                        $media_file_data = [
                            'user_id' => auth()->user()->id,
                            'chat_id' => $last_chat_id,
                            'file_name' => $file_name,
                            'file_type' => $file_type,
                            'privacy' => 'public',
                            'created_at' => time(),
                            'updated_at' => time(),
                        ];
                        Media_files::create($media_file_data);
                    }
                }

                $message = Chat::where('message_thrade', $messageThrade->id)
                    ->orderBy('id', 'DESC')
                    ->limit('1')
                    ->get();

                return ApiResponse::success($message, 'Message sent successfully');
            }
        } else {
            $chat = new Chat();
            $chat->reciver_id = $request->reciver_id;
            $chat->sender_id = auth()->user()->id;
            $chat->chatcenter = $request->messagecenter;
            $chat->message = $request->message;
            $chat->message_thrade = $firstmessageThrade->id;
            $chat->thumbsup = $request->thumbsup;
            $chat->file = '1';
            $chat->save();
            $last_chat_id = $chat->id;

            if (is_array($request->multiple_files) && $request->multiple_files[0] != null) {
                $rules = ['multiple_files' => 'mimes:jpeg,jpg,png,gif,jfif,mp4,mov,wmv,mkv,webm,avi'];
                $validator = Validator::make($request->multiple_files, $rules);

                if ($validator->fails()) {
                    return ApiResponse::error($validator->errors(), 'File validation failed', 422);
                }

                foreach ($request->multiple_files as $key => $media_file) {
                    $file_name = random(40);
                    $file_extention = strtolower($media_file->getClientOriginalExtension());

                    if (in_array($file_extention, ['avi', 'mp4', 'webm', 'mov', 'wmv', 'mkv'])) {
                        $media_file->move('storage/chat/videos/', $file_name . '.' . $file_extention);
                        $file_type = 'video';
                    } else {
                        FileUploader::upload($media_file, 'public/storage/chat/images/' . $file_name, 1000, null, 300);
                        $file_type = 'image';
                    }

                    $media_file_data = [
                        'user_id' => auth()->user()->id,
                        'chat_id' => $last_chat_id,
                        'file_name' => $file_name,
                        'file_type' => $file_type,
                        'privacy' => 'public',
                        'created_at' => time(),
                        'updated_at' => time(),
                    ];
                    Media_files::create($media_file_data);
                }
            }

            $message = Chat::where('message_thrade', $firstmessageThrade->id)
                ->orderBy('id', 'DESC')
                ->limit('1')
                ->get();

            return ApiResponse::success($message, 'Message sent successfully');
        }
    }

    public function remove_chat($id)
    {
        $chat = Chat::find($id);
        if (!$chat) {
            return ApiResponse::error(null, 'Chat not found', 404);
        }

        $chat->delete();
        return ApiResponse::success(null, 'Chat deleted successfully');
    }

    public function react_chat(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'messageId' => 'required',
            'react' => 'required',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), 'Validation failed', 422);
        }

        $chat = Chat::find($request->messageId);
        if (!$chat) {
            return ApiResponse::error(null, 'Chat not found', 404);
        }

        $chat->react = $request->react;
        $chat->save();

        return ApiResponse::success($chat, 'Reaction updated successfully');
    }

    public function search_chat()
    {
        $search = $_GET['search'];
        $messageThradesUserId = [];

        $myMessageThrades = Message_thrade::where('sender_id', auth()->user()->id)
            ->orWhere('reciver_id', auth()->user()->id)
            ->get();

        foreach ($myMessageThrades as $myMessageThrade) {
            if ($myMessageThrade->sender_id == auth()->user()->id) {
                array_push($messageThradesUserId, $myMessageThrade->reciver_id);
            } elseif ($myMessageThrade->reciver_id == auth()->user()->id) {
                array_push($messageThradesUserId, $myMessageThrade->sender_id);
            }
        }

        $users = User::whereIn('id', $messageThradesUserId)
            ->where('name', 'like', '%' . $search . '%')
            ->get();

        return ApiResponse::success($users, 'Search results fetched successfully');
    }

    public function chat_load()
    {
        $id = $_GET['id'];
        $messageThrade = Message_thrade::whereIn('sender_id', [auth()->user()->id, $id])
            ->whereIn('reciver_id', [auth()->user()->id, $id])
            ->first();

        if (!$messageThrade) {
            return ApiResponse::error(null, 'Message thread not found', 404);
        }

        $messages = Chat::where('message_thrade', $messageThrade->id)
            ->where('reciver_id', auth()->user()->id)
            ->where('read_status', '0')
            ->get();

        $this->chat_read_option($id);

        return ApiResponse::success($messages, 'Messages fetched successfully');
    }

    public function chat_read_option($id)
    {
        $messageThrade = Message_thrade::whereIn('sender_id', [auth()->user()->id, $id])
            ->whereIn('reciver_id', [auth()->user()->id, $id])
            ->first();

        if (!empty($messageThrade)) {
            Chat::where('message_thrade', $messageThrade->id)
                ->where('read_status', '0')
                ->where('reciver_id', auth()->user()->id)
                ->update(['read_status' => '1']);
        }
    }
}