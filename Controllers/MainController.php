<?php

namespace App\Http\Controllers;

use App\Models\Comments;
use App\Models\Album_image;
use App\Models\FileUploader;
use App\Models\Live_streamings;
use App\Models\Media_files;
use App\Models\Posts;
use App\Models\Post_share;
use App\Models\Report;
use App\Models\Stories;
use App\Models\User;
use App\Models\Setting;
use App\Models\BlockUser;
use App\Models\Friendships;
use App\Traits\ZoomMeetingTrait;
use App\Helpers\ApiResponse; // Import the ApiResponse helper
use DB;
use Illuminate\Database\Query\JoinClause;
use Str;
use Intervention\Image\Facades\Image;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class MainController extends Controller
{
    use ZoomMeetingTrait;

    const MEETING_TYPE_INSTANT = 1;
    const MEETING_TYPE_SCHEDULE = 2;
    const MEETING_TYPE_RECURRING = 3;
    const MEETING_TYPE_FIXED_RECURRING_FIXED = 8;

    private $user;

    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->user = Auth()->user();
            return $next($request);
        });

        header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
        header("Cache-Control: post-check=0, pre-check=0", false);
        header("Pragma: no-cache");
    }

    public function timeline()
    {
        // First 10 stories
        $stories = Stories::where(function ($query) {
            $query->whereJsonContains('users.friends', [$this->user->id])
                ->where('stories.privacy', '!=', 'private')
                ->orWhere('stories.user_id', $this->user->id);
        })
            ->where('stories.status', 'active')
            ->where('stories.created_at', '>=', (time() - 86400))
            ->join('users', 'stories.user_id', '=', 'users.id')
            ->select('stories.*', 'users.name', 'users.photo', 'users.friends', 'stories.created_at as created_at')
            ->take(5)->orderBy('stories.story_id', 'DESC')->get();

        // First 10 posts
        $posts = Posts::where(function ($query) {
            $query->whereJsonContains('users.friends', [$this->user->id])
                ->where('posts.privacy', '!=', 'private')
                ->orWhere('posts.user_id', $this->user->id)
                ->orWhere(function ($query3) {
                    $query3->where('posts.privacy', 'public')
                        ->where(function ($query4) {
                            $query4->where('posts.publisher', 'post')
                                ->join('followers', function (JoinClause $join) {
                                    $join->on('posts.publisher_id', '=', 'followers.follow_id')
                                        ->where('followers.user_id', auth()->user()->id);
                                });
                        })
                        ->orWhere(function ($query5) {
                            $query5->where('posts.publisher', 'profile_picture')
                                ->join('followers', function (JoinClause $join1) {
                                    $join1->on('posts.publisher_id', '=', 'followers.follow_id')
                                        ->where('followers.user_id', auth()->user()->id);
                                });
                        })
                        ->orWhere(function ($query6) {
                            $query6->where('posts.publisher', 'page')
                                ->join('followers', function (JoinClause $join2) {
                                    $join2->on('posts.publisher_id', '=', 'followers.page_id')
                                        ->where('followers.user_id', auth()->user()->id);
                                });
                        })
                        ->orWhere(function ($query7) {
                            $query7->where('posts.publisher', 'group')
                                ->join('followers', function (JoinClause $join3) {
                                    $join3->on('posts.publisher_id', '=', 'followers.group_id')
                                        ->where('followers.user_id', auth()->user()->id);
                                });
                        });
                });
        })
            ->where('posts.status', 'active')
            ->where('posts.report_status', '0')
            ->where('publisher', '!=', 'paid_content')
            ->join('users', 'posts.user_id', '=', 'users.id')
            ->where(function ($query) {
                $query->where('posts.publisher', '!=', 'video_and_shorts')
                    ->orWhere(function ($query2) {
                        $query2->join('group_members', function (JoinClause $join) {
                            $join->on('posts.publisher_id', '=', 'group_members.group_id')
                                ->where('posts.publisher', '=', 'group')
                                ->where('group_members.user_id', '=', auth()->user()->id);
                        });
                    });
            })
            ->select('posts.*', 'users.name', 'users.photo', 'users.friends', 'posts.created_at as created_at')
            ->take(15)->orderBy('posts.post_id', 'DESC')->get();

        // Friendships
        $friendships = Friendships::where(function ($query) {
            $query->where('accepter', auth()->user()->id)
                ->orWhere('requester', auth()->user()->id);
        })
            ->where('is_accepted', 1)
            ->orderBy('friendships.importance', 'desc')
            ->get();

        $page_data = [
            'stories' => $stories,
            'posts' => $posts,
            'friendships' => $friendships,
        ];

        return ApiResponse::success($page_data, "Timeline data fetched successfully", 200);
    }

    public function load_post_by_scrolling(Request $request)
    {
        $posts = Posts::where(function ($query) {
            $query->whereJsonContains('users.friends', [$this->user->id])
                ->where('posts.privacy', '!=', 'private')
                ->orWhere('posts.user_id', $this->user->id)
                ->orWhere(function ($query3) {
                    $query3->where('posts.privacy', 'public')
                        ->where(function ($query4) {
                            $query4->where('posts.publisher', 'post')
                                ->join('followers', function (JoinClause $join) {
                                    $join->on('posts.publisher_id', '=', 'followers.follow_id')
                                        ->where('followers.user_id', auth()->user()->id);
                                });
                        })
                        ->orWhere(function ($query5) {
                            $query5->where('posts.publisher', 'profile_picture')
                                ->join('followers', function (JoinClause $join1) {
                                    $join1->on('posts.publisher_id', '=', 'followers.follow_id')
                                        ->where('followers.user_id', auth()->user()->id);
                                });
                        })
                        ->orWhere(function ($query6) {
                            $query6->where('posts.publisher', 'page')
                                ->join('followers', function (JoinClause $join2) {
                                    $join2->on('posts.publisher_id', '=', 'followers.page_id')
                                        ->where('followers.user_id', auth()->user()->id);
                                });
                        })
                        ->orWhere(function ($query7) {
                            $query7->where('posts.publisher', 'group')
                                ->join('followers', function (JoinClause $join3) {
                                    $join3->on('posts.publisher_id', '=', 'followers.group_id')
                                        ->where('followers.user_id', auth()->user()->id);
                                });
                        });
                });
        })
            ->where('posts.status', 'active')
            ->where('posts.publisher', 'post')
            ->where('posts.report_status', '0')
            ->join('users', 'posts.user_id', '=', 'users.id')
            ->select('posts.*', 'users.name', 'users.photo', 'users.friends', 'posts.created_at as created_at')
            ->skip($request->offset)->take(3)->orderBy('posts.post_id', 'DESC')->get();

        $friendships = Friendships::where(function ($query) {
            $query->where('accepter', auth()->user()->id)
                ->orWhere('requester', auth()->user()->id);
        })
            ->where('is_accepted', 1)
            ->orderBy('friendships.importance', 'desc')
            ->get();

        $page_data = [
            'user_info' => $this->user,
            'posts' => $posts,
            'friendships' => $friendships,
        ];

        return ApiResponse::success($page_data, "Posts loaded successfully", 200);
    }

    public function create_post(Request $request)
    {
        // Data validation
        $rules = array('privacy' => ['required', Rule::in(['private', 'public', 'friends'])]);
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), "Validation error", 422);
        }

        // Handle file uploads and other logic here...

        $response = [
            'reload' => 1,
            'message' => 'Post created successfully',
        ];

        return ApiResponse::success($response, "Post created successfully", 201);
    }

    public function live_streaming($post_id)
    {
        $user_id = Posts::where('post_id', $post_id)->value('user_id');
        $user = User::where('id', $user_id)->first();
        $make_pass = str_shuffle($user->name . $user->email);
        $make_pass = explode(' ', $make_pass);
        $join_pass = implode('', $make_pass);

        Live_streamings::where('publisher_id', $user_id)->update(['details->join_pass' => $join_pass]);

        $room = get_settings('system_name');
        $data = [
            'user' => $user,
            'join_pass' => $join_pass,
            'room' => $room,
        ];

        return ApiResponse::success($data, "Live streaming data fetched", 200);
    }

    public function edit_post_form($id)
    {
        $post = Posts::where('post_id', $id)->first();
        return ApiResponse::success($post, "Post data fetched", 200);
    }

    public function edit_post($id, Request $request)
    {
        // Data validation
        $rules = array('privacy' => ['required', Rule::in(['private', 'public', 'friends'])]);
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), "Validation error", 422);
        }

        // Handle file uploads and other logic here...

        $response = [
            'reload' => 1,
            'message' => 'Post updated successfully',
        ];

        return ApiResponse::success($response, "Post updated successfully", 200);
    }

public function create_live_streaming($publisher, $publisher_id)
{
    $post_details = Posts::where('posts.status', 'active')
        ->where('posts.post_id', $publisher_id)
        ->join('users', 'posts.user_id', '=', 'users.id')
        ->first();

    if (!$post_details) {
        return ApiResponse::error(null, 'Post not found', 404);
    }

    $live_streaming = Live_streamings::where('publisher', $publisher)
        ->where('user_id', $this->user->id)
        ->where('publisher_id', $publisher_id);

    if ($live_streaming->exists()) {
        // Update existing live streaming
        $meeting_details = json_decode($live_streaming->value('details'), true);
        $live_topic = !empty($post_details->description) ? ellipsis($post_details->description, 200) : "Live";

        $meeting_details['topic'] = $live_topic;
        $meeting_details['start_time'] = $this->toZoomTimeFormat(time());

        $path = 'meetings/' . $meeting_details['id'];
        $response = $this->zoomPatch($path, [
            'topic' => $meeting_details['topic'],
            'type' => self::MEETING_TYPE_SCHEDULE,
            'start_time' => $meeting_details['start_time'],
            'duration' => 40,
            'agenda' => null,
            'settings' => [
                'host_video' => true,
                'participant_video' => true,
                'waiting_room' => false,
            ],
        ]);

        $data = [
            'publisher' => $publisher,
            'publisher_id' => $publisher_id,
            'details' => json_encode($meeting_details),
            'updated_at' => time(),
        ];

        $live_streaming->update($data);
    } else {
        // Create new live streaming
        $live_topic = !empty($post_details->description) ? ellipsis($post_details->description, 200) : "Live";

        $path = 'users/me/meetings';
        $response = $this->zoomPost($path, [
            'topic' => $live_topic,
            'type' => self::MEETING_TYPE_SCHEDULE,
            'start_time' => $this->toZoomTimeFormat(time()),
            'duration' => 40,
            'agenda' => null,
            'settings' => [
                'host_video' => true,
                'participant_video' => true,
                'waiting_room' => false,
            ],
        ]);

        $data = [
            'publisher' => $publisher,
            'publisher_id' => $publisher_id,
            'user_id' => $this->user->id,
            'details' => $response->body(),
            'created_at' => time(),
            'updated_at' => time(),
        ];

        Live_streamings::create($data);
    }

    return ApiResponse::success(null, 'Live streaming setup successfully');
}

public function live($post_id)
{
    $post_details = Posts::where(function ($query) {
        $query->whereJsonContains('users.friends', [$this->user->id])
            ->where('posts.privacy', '!=', 'private')
            ->orWhere('posts.user_id', $this->user->id);
    })
        ->where('posts.post_id', $post_id)
        ->where('posts.status', 'active')
        ->join('users', 'posts.user_id', '=', 'users.id')
        ->first();

    if (!$post_details) {
        return ApiResponse::error(null, 'Post not found', 404);
    }

    $live_streaming = Live_streamings::where('publisher', 'post')
        ->where('publisher_id', $post_id)
        ->where('user_id', $post_details->user_id)
        ->first();

    if (!$live_streaming) {
        return ApiResponse::error(null, 'Live streaming not found', 404);
    }

    $meeting_details = json_decode($live_streaming->details, true);

    $data = [
        'meeting_details' => $meeting_details,
        'host' => $post_details->user_id == $this->user->id ? 1 : 0,
        'isSupportAV' => $post_details->user_id == $this->user->id ? 1 : 0,
        'disableJoinAudio' => $post_details->user_id == $this->user->id ? 0 : 1,
        'post_details' => $post_details,
    ];

    return ApiResponse::success($data, 'Live streaming details retrieved successfully');
}

public function live_ended($post_id)
{
    Posts::where('post_id', $post_id)->update(['description' => json_encode(['live_video_ended' => 'yes'])]);
    return ApiResponse::success(null, 'Live stream ended successfully');
}

public function search_friends_for_tagging(Request $request)
{
    $friends = DB::table('users')
        ->whereJsonContains('friends', [$this->user->id])
        ->where('name', 'like', '%' . $request->search_value . '%')
        ->take(30)
        ->get();

    return ApiResponse::success($friends, 'Friends retrieved successfully');
}

public function my_react(Request $request)
{
    $validator = Validator::make($request->all(), [
        'type' => 'required|in:post',
        'post_id' => 'required|exists:posts,post_id',
        'request_type' => 'required|in:update,toggle',
        'react' => 'nullable|string',
        'response_type' => 'nullable|in:number',
    ]);

    if ($validator->fails()) {
        return ApiResponse::error($validator->errors(), 'Validation failed', 422);
    }

    $post = Posts::find($request->post_id);
    if (!$post) {
        return ApiResponse::error(null, 'Post not found', 404);
    }

    $all_reacts = json_decode($post->user_reacts, true);

    if ($request->request_type == 'update') {
        $all_reacts[$this->user->id] = $request->react;
    } elseif ($request->request_type == 'toggle') {
        if (array_key_exists($this->user->id, $all_reacts)) {
            unset($all_reacts[$this->user->id]);
        } else {
            $all_reacts[$this->user->id] = 'like';
        }
    }

    $post->user_reacts = json_encode($all_reacts);
    $post->save();

    if ($request->response_type == 'number') {
        return ApiResponse::success(['count' => count($all_reacts)], 'Reaction count retrieved successfully');
    }

    $data = [
        'user_reacts' => $all_reacts,
        'user_info' => $this->user,
    ];

    return ApiResponse::success($data, 'Reactions retrieved successfully');
}

public function my_comment_react(Request $request)
{
    $validator = Validator::make($request->all(), [
        'comment_id' => 'required|exists:comments,comment_id',
        'request_type' => 'required|in:update,toggle',
        'react' => 'nullable|string',
    ]);

    if ($validator->fails()) {
        return ApiResponse::error($validator->errors(), 'Validation failed', 422);
    }

    $comment = Comments::find($request->comment_id);
    if (!$comment) {
        return ApiResponse::error(null, 'Comment not found', 404);
    }

    $all_reacts = json_decode($comment->user_reacts, true);

    if ($request->request_type == 'update') {
        $all_reacts[$this->user->id] = $request->react;
    } elseif ($request->request_type == 'toggle') {
        if (array_key_exists($this->user->id, $all_reacts)) {
            unset($all_reacts[$this->user->id]);
        } else {
            $all_reacts[$this->user->id] = 'like';
        }
    }

    $comment->user_reacts = json_encode($all_reacts);
    $comment->save();

    $data = [
        'user_comment_reacts' => $all_reacts,
        'user_info' => $this->user,
    ];

    return ApiResponse::success($data, 'Comment reactions retrieved successfully');
}

public function load_post_comments(Request $request)
{
    $validator = Validator::make($request->all(), [
        'post_id' => 'required|exists:posts,post_id',
        'type' => 'required|string',
        'parent_id' => 'nullable|integer',
        'total_loaded_comments' => 'nullable|integer',
    ]);

    if ($validator->fails()) {
        return ApiResponse::error($validator->errors(), 'Validation failed', 422);
    }

    $post = Posts::where('posts.status', 'active')
        ->where('posts.post_id', $request->post_id)
        ->join('users', 'posts.user_id', '=', 'users.id')
        ->select('posts.*', 'users.name', 'users.photo', 'users.friends', 'posts.created_at as created_at')
        ->first();

    if (!$post) {
        return ApiResponse::error(null, 'Post not found', 404);
    }

    $comments = DB::table('comments')
        ->join('users', 'comments.user_id', '=', 'users.id')
        ->where('comments.is_type', $request->type)
        ->where('comments.id_of_type', $request->post_id)
        ->where('comments.parent_id', $request->parent_id ?? 0)
        ->select('comments.*', 'users.name', 'users.photo')
        ->orderBy('comment_id', 'DESC')
        ->skip($request->total_loaded_comments ?? 0)
        ->take(3)
        ->get();

    $data = [
        'post' => $post,
        'type' => $request->type,
        'post_id' => $request->post_id,
        'comments' => $comments,
    ];

    return ApiResponse::success($data, 'Comments retrieved successfully');
}

public function post_comment(Request $request)
{
    $validator = Validator::make($request->all(), [
        'post_id' => 'required|exists:posts,post_id',
        'type' => 'required|string',
        'description' => 'required|string',
        'comment_id' => 'nullable|exists:comments,comment_id',
        'parent_id' => 'nullable|integer',
    ]);

    if ($validator->fails()) {
        return ApiResponse::error($validator->errors(), 'Validation failed', 422);
    }

    $data = [
        'description' => $request->description,
    ];

    if ($request->comment_id) {
        $comment = Comments::find($request->comment_id);
        if (!$comment) {
            return ApiResponse::error(null, 'Comment not found', 404);
        }

        $comment->update($data);
        $comment_id = $request->comment_id;
    } else {
        $data['parent_id'] = $request->parent_id ?? 0;
        $data['user_id'] = $this->user->id;
        $data['is_type'] = $request->type;
        $data['id_of_type'] = $request->post_id;
        $data['user_reacts'] = json_encode([]);
        $data['created_at'] = time();
        $data['updated_at'] = time();

        $comment_id = Comments::insertGetId($data);
    }

    $comment = Comments::find($comment_id);
    return ApiResponse::success($comment, 'Comment saved successfully');
}

public function preview_post(Request $request)
{
    $validator = Validator::make($request->all(), [
        'post_id' => 'required|exists:posts,post_id',
        'file_name' => 'nullable|string',
    ]);

    if ($validator->fails()) {
        return ApiResponse::error($validator->errors(), 'Validation failed', 422);
    }

    $post = Posts::where('posts.post_id', $request->post_id)
        ->where('posts.status', 'active')
        ->join('users', 'posts.user_id', '=', 'users.id')
        ->select('posts.*', 'users.name', 'users.photo', 'users.friends', 'posts.created_at as created_at')
        ->first();

    if (!$post) {
        return ApiResponse::error(null, 'Post not found', 404);
    }

    $friendships = Friendships::where(function ($query) {
        $query->where('accepter', auth()->user()->id)
            ->orWhere('requester', auth()->user()->id);
    })
        ->where('is_accepted', 1)
        ->orderBy('friendships.importance', 'desc')
        ->take(15)
        ->get();

    $data = [
        'post' => $post,
        'file_name' => $request->file_name,
        'user_info' => $this->user,
        'friendships' => $friendships,
    ];

    return ApiResponse::success($data, 'Post preview retrieved successfully');
}

public function post_comment_count(Request $request)
{
    $validator = Validator::make($request->all(), [
        'type' => 'required|string',
        'post_id' => 'required|exists:posts,post_id',
    ]);

    if ($validator->fails()) {
        return ApiResponse::error($validator->errors(), 'Validation failed', 422);
    }

    $count = Comments::where('is_type', $request->type)
        ->where('id_of_type', $request->post_id)
        ->count();

    return ApiResponse::success(['count' => $count], 'Comment count retrieved successfully');
}

public function single_post($id, $type = null)
{
    $post = Posts::where('post_id', $id)->first();
    if (!$post) {
        return ApiResponse::error(null, 'Post not found', 404);
    }

    $data = [
        'post' => $post,
        'user_info' => auth()->user(),
        'type' => 'user_post',
        'image_id' => $type,
    ];

    return ApiResponse::success($data, 'Post details retrieved successfully');
}

    public function save_post_report(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'post_id' => 'required|exists:posts,post_id',
            'report' => 'required|string',
        ]);
    
        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), 'Validation failed', 422);
        }
    
        $report = new Report();
        $report->user_id = auth()->user()->id;
        $report->post_id = $request->post_id;
        $report->report = $request->report;
        $report->save();
    
        return ApiResponse::success(null, 'Report submitted successfully');
    }
    
    public function comment_delete($comment_id)
    {
        $comment = Comments::find($comment_id);
        if (!$comment) {
            return ApiResponse::error(null, 'Comment not found', 404);
        }
    
        $comment->delete();
        return ApiResponse::success(null, 'Comment deleted successfully');
    }
    
    public function share_group(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'shared_post_id' => 'required|exists:posts,post_id',
            'group_id' => 'required|exists:groups,id',
            'message' => 'nullable|string',
        ]);
    
        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), 'Validation failed', 422);
        }
    
        $postshare = new Post_share();
        $postshare->user_id = auth()->user()->id;
        $postshare->post_id = $request->shared_post_id;
        $postshare->shared_on = 'group';
        $postshare->save();
    
        $post = new Posts();
        $post->user_id = auth()->user()->id;
        $post->publisher = 'group';
        $post->publisher_id = $request->group_id;
        $post->post_type = "share";
        $post->privacy = "public";
        $post->tagged_user_ids = json_encode([]);
        $post->description = $request->message ?? '';
        $post->status = 'active';
        $post->user_reacts = json_encode([]);
        $post->shared_user = json_encode([]);
        $post->created_at = time();
        $post->updated_at = time();
        $post->save();
    
        return ApiResponse::success(null, 'Post shared in group successfully');
    }
    
    public function share_my_timeline(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'shared_post_id' => 'required|exists:posts,post_id',
            'postUrl' => 'nullable|string',
            'is_memory' => 'nullable|boolean',
        ]);
    
        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), 'Validation failed', 422);
        }
    
        $postshare = new Post_share();
        $postshare->user_id = auth()->user()->id;
        $postshare->post_id = $request->shared_post_id;
        $postshare->shared_on = 'group';
        $postshare->save();
    
        $post = new Posts();
        $post->user_id = auth()->user()->id;
        $post->publisher = $request->is_memory ? 'memory' : 'post';
        $post->publisher_id = auth()->user()->id;
        $post->post_type = "share";
        $post->privacy = "public";
        $post->tagged_user_ids = json_encode([]);
        $post->description = $request->postUrl ?? '';
        $post->status = 'active';
        $post->user_reacts = json_encode([]);
        $post->shared_user = json_encode([]);
        $post->created_at = time();
        $post->updated_at = time();
        $post->save();
    
        return ApiResponse::success(null, 'Post shared on your timeline successfully');
    }
    
    public function post_delete($post_id)
    {
        $post = Posts::find($post_id);
        if (!$post) {
            return ApiResponse::error(null, 'Post not found', 404);
        }
    
        $post->delete();
        return ApiResponse::success(null, 'Post deleted successfully');
    }
    
    public function custom_shared_post_view($id)
    {
        $post = Posts::where(function ($query) {
            $query->whereJsonContains('users.friends', [$this->user->id])
                ->where('posts.privacy', '!=', 'private')
                ->orWhere('posts.user_id', $this->user->id);
        })
            ->where('posts.post_id', $id)
            ->where('posts.status', 'active')
            ->where('posts.report_status', '0')
            ->join('users', 'posts.user_id', '=', 'users.id')
            ->select('posts.*', 'users.name', 'users.photo', 'users.friends', 'posts.created_at as created_at')
            ->first();
    
        if (!$post) {
            return ApiResponse::error(null, 'Post not found', 404);
        }
    
        return ApiResponse::success($post, 'Post details retrieved successfully');
    }
    
    public function delete_media_file($id)
    {
        $media_file = Media_files::where('id', $id)->where('user_id', auth()->user()->id)->first();
        if (!$media_file) {
            return ApiResponse::error(null, 'Media file not found', 404);
        }
    
        remove_file('public/storage/post/images/' . $media_file->file_name);
        $media_file->delete();
    
        return ApiResponse::success(null, 'Media file deleted successfully');
    }
    
    public function addons_manager()
    {
        $user_info = User::where('id', auth()->user()->id)->first();
        $data = [
            'section_title' => '',
            'user_info' => $user_info,
            'layout' => 'addons_layout',
            'link_name' => 'Timeline',
            'head_link' => route('timeline'),
            'view_path' => 'frontend.addons.index',
            'content_view' => 'frontend.addons.addon_layout',
        ];
    
        return ApiResponse::success($data, 'Addons manager data retrieved successfully');
    }
    
    public function user_settings()
    {
        $payment_settings = User::where('id', auth()->user()->id)->value('payment_settings');
        if (!$payment_settings) {
            $settings = [
                'raz_key_id' => '',
                'raz_secret_key' => '',
                'theme_color' => '',
                'stripe_public_key' => '',
                'stripe_secret_key' => '',
                'stripe_public_live_key' => '',
                'stripe_secret_live_key' => '',
                'paypal_client_id' => '',
                'paypal_secret_key' => '',
                'paypal_production_client_id' => '',
                'paypal_production_secret_key' => '',
                'flutterwave_public_key' => '',
                'flutterwave_secret_key' => '',
                'flutterwave_encryption_key' => '',
                'stripe_live' => false,
                'paypal_live' => false,
                'flutterwave_live' => false,
            ];
            $data = json_encode($settings);
            User::where('id', auth()->user()->id)->update(['payment_settings' => $data]);
        }
    
        $settings = User::where('id', auth()->user()->id)->value('payment_settings');
        $settings = json_decode($settings);
    
        $data = [
            'section_title' => 'User Settings',
            'link_name' => 'Timeline',
            'head_link' => route('timeline'),
            'payment_settings' => $settings,
            'view_path' => 'frontend.addons.index',
            'content_view' => 'frontend.addons.user_settings',
        ];
    
        return ApiResponse::success($data, 'User settings retrieved successfully');
    }
    
    public function save_user_settings(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'stripe_live' => 'nullable|boolean',
            'paypal_live' => 'nullable|boolean',
            'flutterwave_live' => 'nullable|boolean',
        ]);
    
        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), 'Validation failed', 422);
        }
    
        $settings = $request->all();
        array_shift($settings);
        $settings['stripe_live'] = $request->stripe_live ?? false;
        $settings['paypal_live'] = $request->paypal_live ?? false;
        $settings['flutterwave_live'] = $request->flutterwave_live ?? false;
    
        $data = json_encode($settings);
        User::where('id', auth()->user()->id)->update(['payment_settings' => $data]);
    
        return ApiResponse::success(null, 'User settings saved successfully');
    }
    
    public function updateThemeColor(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'themeColor' => 'required|string',
        ]);
    
        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), 'Validation failed', 422);
        }
    
        Session::put('theme_color', $request->themeColor);
        return ApiResponse::success(null, 'Theme color updated successfully');
    }
    
    public function details_album($id)
    {
        $posts = Posts::where('post_id', $id)->get();
        $post_album = Posts::where('post_id', $id)->first();
        $user_info = $this->user;
    
        $friendships = Friendships::where(function ($query) {
            $query->where('accepter', auth()->user()->id)
                ->orWhere('requester', auth()->user()->id);
        })
            ->where('is_accepted', 1)
            ->orderBy('friendships.importance', 'desc')
            ->take(15)->get();
    
        $data = [
            'post_id' => $id,
            'post_album' => $post_album,
            'posts' => $posts,
            'user_info' => $user_info,
            'friendships' => $friendships,
            'layout' => 'album_details',
            'view_path' => 'frontend.album_details.album_details',
        ];
    
        return ApiResponse::success($data, 'Album details retrieved successfully');
    }
    
    public function block_user($id)
    {
        $post = Posts::where('post_id', $id)->first();
        if (!$post) {
            return ApiResponse::error(null, 'Post not found', 404);
        }
    
        return ApiResponse::success($post, 'Post details retrieved successfully');
    }
    
    public function block_user_post($id)
    {
        $block_post = Posts::find($id);
        if (!$block_post) {
            return ApiResponse::error(null, 'Post not found', 404);
        }
    
        $user_block = new BlockUser();
        $user_block->user_id = auth()->user()->id;
        $user_block->block_user = $block_post->user_id;
        $user_block->save();
    
        return ApiResponse::success(null, 'User blocked successfully');
    }
    
    public function unblock_user($id)
    {
        $unblock = BlockUser::find($id);
        if (!$unblock) {
            return ApiResponse::error(null, 'Block record not found', 404);
        }
    
        $unblock->delete();
        return ApiResponse::success(null, 'User unblocked successfully');
    }
    
    public function save_post($id)
    {
        $user = Auth()->user();
        $savedPosts = $user->save_post ? json_decode($user->save_post, true) : [];
    
        if (!in_array($id, $savedPosts)) {
            $savedPosts[] = $id;
            $user->save_post = json_encode($savedPosts);
            $user->save();
        }
    
        return ApiResponse::success(null, 'Post saved successfully');
    }
    
    public function unsave_post($id)
    {
        $user = Auth()->user();
        $savedPosts = json_decode($user->save_post, true) ?? [];
    
        if (($key = array_search($id, $savedPosts)) !== false) {
            unset($savedPosts[$key]);
            $user->save_post = json_encode(array_values($savedPosts));
            $user->save();
        }
    
        return ApiResponse::success(null, 'Post unsaved successfully');
    }
    
    public function imageGenerator()
    {
        $hugging_face_auth_key = Setting::where('type', 'hugging_face_auth_key')->value('description');
        $data = [
            'hugging_face_auth_key' => $hugging_face_auth_key,
            'user_info' => $this->user,
            'view_path' => 'frontend.ai_image.image_generator',
        ];
    
        return ApiResponse::success($data, 'Image generator data retrieved successfully');
    }
    
    public function generateImage(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'prompt' => 'required|string|max:255',
        ]);
    
        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), 'Validation failed', 422);
        }
    
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer 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',
            ])->post('https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2', [
                'inputs' => $request->prompt,
            ]);
    
            if ($response->failed()) {
                return ApiResponse::error(null, 'API request failed', 500);
            }
    
            $imageData = $response->body();
            $imageUrl = $this->saveImage($imageData);
    
            return ApiResponse::success(['image_url' => $imageUrl], 'Image generated successfully');
        } catch (\Exception $e) {
            return ApiResponse::error(null, 'Server error', 500);
        }
    } 
}
    
    