<?php

namespace App\Http\Controllers\Fundraiser;

use App\Http\Controllers\Controller;
use App\Models\Friendships;
use App\Models\Fundraiser;
use App\Models\Fundraiser_category;
use App\Models\Fundraiser_donation;
use App\Models\Fundraiser_payout;
use App\Models\Invite;
use App\Models\Notification;
use App\Models\Posts;
use App\Models\Post_share;
use App\Models\Share;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Session;
use Carbon\Carbon;
use App\Helpers\ApiResponse; // Import the ApiResponse helper

class FundraiserController extends Controller
{
    public function index()
    {
        $currentDate = Carbon::now();

        $popular = Fundraiser::where('categories_id', 1)->where('status', 0)
            ->whereDate('timestamp_end', '>=', $currentDate)
            ->orderBy('id', 'DESC')->take(3)->get();
        $animal = Fundraiser::where('categories_id', 2)->where('status', 0)
            ->whereDate('timestamp_end', '>=', $currentDate)
            ->orderBy('id', 'DESC')->take(3)->get();
        $culture = Fundraiser::where('categories_id', 3)->where('status', 0)
            ->whereDate('timestamp_end', '>=', $currentDate)
            ->orderBy('id', 'DESC')->take(3)->get();
        $business = Fundraiser::where('categories_id', 4)->where('status', 0)
            ->whereDate('timestamp_end', '>=', $currentDate)
            ->orderBy('id', 'DESC')->take(3)->get();
        $community = Fundraiser::where('categories_id', 5)->where('status', 0)
            ->whereDate('timestamp_end', '>=', $currentDate)
            ->orderBy('id', 'DESC')->take(3)->get();
        $crisis = Fundraiser::where('categories_id', 6)->where('status', 0)
            ->whereDate('timestamp_end', '>=', $currentDate)
            ->orderBy('id', 'DESC')->take(3)->get();
        $education = Fundraiser::where('categories_id', 7)->where('status', 0)
            ->whereDate('timestamp_end', '>=', $currentDate)
            ->orderBy('id', 'DESC')->take(3)->get();

        $category = Fundraiser_category::get();

        $data = [
            'popular' => $popular,
            'animal' => $animal,
            'culture' => $culture,
            'business' => $business,
            'community' => $community,
            'crisis' => $crisis,
            'education' => $education,
            'category' => $category,
        ];

        return ApiResponse::success($data, "Fundraiser data fetched successfully", 200);
    }

    public function campaign_by_category($type)
    {
        $currentDate = Carbon::now();
        $categoryData = [];

        switch ($type) {
            case 'popular':
                $categoryData['popular'] = Fundraiser::where('categories_id', 1)->where('status', 0)
                    ->whereDate('timestamp_end', '>=', $currentDate)
                    ->orderBy('id', 'DESC')->get();
                break;
            case 'animal':
                $categoryData['animal'] = Fundraiser::where('categories_id', 2)->where('status', 0)
                    ->whereDate('timestamp_end', '>=', $currentDate)
                    ->orderBy('id', 'DESC')->get();
                break;
            case 'culture':
                $categoryData['culture'] = Fundraiser::where('categories_id', 3)->where('status', 0)
                    ->whereDate('timestamp_end', '>=', $currentDate)
                    ->orderBy('id', 'DESC')->get();
                break;
            case 'business':
                $categoryData['business'] = Fundraiser::where('categories_id', 4)->where('status', 0)
                    ->whereDate('timestamp_end', '>=', $currentDate)
                    ->orderBy('id', 'DESC')->get();
                break;
            case 'community':
                $categoryData['community'] = Fundraiser::where('categories_id', 5)->where('status', 0)
                    ->whereDate('timestamp_end', '>=', $currentDate)
                    ->orderBy('id', 'DESC')->get();
                break;
            case 'crisis':
                $categoryData['crisis'] = Fundraiser::where('categories_id', 6)->where('status', 0)
                    ->whereDate('timestamp_end', '>=', $currentDate)
                    ->orderBy('id', 'DESC')->get();
                break;
            case 'education':
                $categoryData['education'] = Fundraiser::where('categories_id', 7)->where('status', 0)
                    ->whereDate('timestamp_end', '>=', $currentDate)
                    ->orderBy('id', 'DESC')->get();
                break;
            default:
                return ApiResponse::error(null, "Invalid category type", 400);
        }

        return ApiResponse::success($categoryData, "Campaigns by category fetched successfully", 200);
    }

    public function category($type)
    {
        if ($type == 'explore') {
            $category = Fundraiser_category::get();
            return ApiResponse::success($category, "Categories fetched successfully", 200);
        } else {
            $currentDate = Carbon::now();
            $category = Fundraiser::join('fundraiser_categories', 'fundraisers.categories_id', '=', 'fundraiser_categories.id')
                ->select('fundraisers.*')
                ->where('fundraisers.categories_id', $type)
                ->whereDate('timestamp_end', '>=', $currentDate)
                ->where('status', 0)
                ->orderBy('id', 'DESC')->get();

            $section_head = Fundraiser_category::where('id', $type)->value('name');

            $data = [
                'campaign_by_category' => $category,
                'section_head' => $section_head,
            ];

            return ApiResponse::success($data, "Category campaigns fetched successfully", 200);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'goal_amount' => 'required|numeric|min:1',
            'timestamp_end' => 'required',
            'categories_id' => 'required',
        ]);

        $image = null;
        if ($request->hasFile('cover_photo')) {
            $item = $request->file('cover_photo');
            $image_name = strtotime('now') . random(4) . '.' . $item->getClientOriginalExtension();

            $path = public_path('assets/frontend/images/campaign');
            if (!File::isDirectory($path)) {
                File::makeDirectory($path, 0777, true, true);
            }
            $item->move($path, $image_name);
            $image = $image_name;
        }

        $campaign = new Fundraiser();
        $campaign->user_id = auth()->user()->id;
        $campaign->title = $request->title;
        $campaign->status = 0;
        $campaign->description = $request->description;
        $campaign->goal_amount = $request->goal_amount;
        $campaign->timestamp_end = $request->timestamp_end;
        $campaign->categories_id = $request->categories_id;
        $campaign->cover_photo = $image;
        $campaign->save();

        $post = Posts::create([
            'user_id' => auth()->user()->id,
            'privacy' => "public",
            'publisher' => 'fundraiser',
            'publisher_id' => $campaign->id,
            'post_type' => "fundraiser",
            'status' => 'active',
            'description' => $request->title,
            'user_reacts' => json_encode(array()),
            'tagged_user_ids' => json_encode(array()),
            'created_at' => time(),
            'updated_at' => time(),
        ]);

        return ApiResponse::success($campaign, "Fundraiser created successfully", 201);
    }

    public function create()
    {
        return ApiResponse::success([], "Fundraiser creation form data", 200);
    }

    public function campaign_type($type)
    {
        $currentDate = Carbon::now();

        if ($type == 'ongoing') {
            $fundraiser_explore = Fundraiser::join('users', 'fundraisers.user_id', '=', 'users.id')
                ->select('fundraisers.*', 'users.name', 'users.email')
                ->where('user_id', auth()->user()->id)
                ->where('fundraisers.timestamp_end', '>=', $currentDate)
                ->orderBy('id', 'DESC')->get();

            $fundraiser_complete = [];
        } else {
            $fundraiser_complete = Fundraiser::join('users', 'fundraisers.user_id', '=', 'users.id')
                ->select('fundraisers.*', 'users.name', 'users.email')
                ->where('user_id', auth()->user()->id)
                ->where('fundraisers.timestamp_end', '<=', $currentDate)
                ->orderBy('id', 'DESC')->get();

            $fundraiser_explore = [];
        }

        $data = [
            'fundraiser_complete' => $fundraiser_complete,
            'fundraiser_explore' => $fundraiser_explore,
        ];

        return ApiResponse::success($data, "Campaigns fetched successfully", 200);
    }

    public function edit($id)
    {
        $campaign_info = Fundraiser::where('id', $id)->first();
        if (!$campaign_info) {
            return ApiResponse::error(null, "Campaign not found", 404);
        }

        return ApiResponse::success($campaign_info, "Campaign data fetched successfully", 200);
    }

    public function update(Request $request, $id)
    {
        $required = $request->all();
        array_shift($required);

        foreach ($required as $item) {
            if ($item == '') {
                return ApiResponse::error(null, "All fields are required", 400);
            }
        }

        $campaign = Fundraiser::find($id);
        if (!$campaign) {
            return ApiResponse::error(null, "Campaign not found", 404);
        }

        if ($request->hasFile('cover_photo')) {
            $item = $request->file('cover_photo');
            $image_name = strtotime('now') . random(4) . '.' . $item->getClientOriginalExtension();

            $path = public_path('assets/frontend/images/campaign');
            if (!File::isDirectory($path)) {
                File::makeDirectory($path, 0777, true, true);
            }
            $item->move($path, $image_name);
            $campaign->cover_photo = $image_name;
        }

        $campaign->title = $request->up_title;
        $campaign->description = $request->up_description;
        $campaign->goal_amount = $request->up_goal_amount;
        $campaign->timestamp_end = $request->up_timestamp_end;
        $campaign->categories_id = $request->up_categories_id;
        $campaign->save();

        return ApiResponse::success($campaign, "Campaign updated successfully", 200);
    }

    public function search(Request $request)
    {
        $currentDate = Carbon::now();
        $explore = Fundraiser::orderBy('id', 'DESC')
            ->where('status', 0)
            ->whereDate('timestamp_end', '>=', $currentDate)
            ->where('title', 'LIKE', '%' . $request->search . '%')->get();

        return ApiResponse::success($explore, "Search results fetched successfully", 200);
    }

    public function myactivity($donor = "")
    {
        $fundraiser_explore = Fundraiser::join('users', 'fundraisers.user_id', '=', 'users.id')
            ->select('fundraisers.*', 'users.name', 'users.email')
            ->where('user_id', auth()->user()->id)
            ->where('fundraisers.timestamp_end', '>=', date('Y-m-d', time()))
            ->take(3)->orderBy('id', 'DESC')->get();

        $fundraiser_complete = Fundraiser::join('users', 'fundraisers.user_id', '=', 'users.id')
            ->select('fundraisers.*', 'users.name', 'users.email')
            ->where('user_id', auth()->user()->id)
            ->where('fundraisers.timestamp_end', '<=', date('Y-m-d', time()))
            ->take(3)->orderBy('id', 'DESC')->get();

        $response_data = [
            'section_title' => '',
            'link_name' => 'Fundraiser',
            'head_link' => route('fundraiser.index'),
            'fundraiser_complete' => $fundraiser_complete,
            'fundraiser_explore' => $fundraiser_explore,
        ];

        return ApiResponse::success($response_data, 'Fundraiser activity retrieved successfully');
    }

    public function explore_delete($id)
    {
        Fundraiser::where('id', $id)->delete();
        return ApiResponse::success(null, 'Fundraiser deleted successfully');
    }

    public function donor()
    {
        $response_data = [
            'section_title' => 'Payment History',
            'link_name' => 'Fundraiser',
            'head_link' => route('fundraiser.index'),
        ];

        return ApiResponse::success($response_data, 'Donor panel data retrieved successfully');
    }

    public function dhistory()
    {
        $response_data = [
            'section_title' => '',
            'link_name' => 'Fundraiser',
            'head_link' => route('fundraiser.index'),
        ];

        return ApiResponse::success($response_data, 'Donor history data retrieved successfully');
    }

    public function phistory()
    {
        $fundraiser_complete = Fundraiser::where('user_id', auth()->user()->id)
            ->where('fundraisers.timestamp_end', '<=', date('Y-m-d', time()))
            ->orderBy('id', 'DESC')->take(5)->get();

        $balance = Fundraiser::where('user_id', auth()->user()->id)
            ->where('fundraisers.timestamp_end', '<=', date('Y-m-d', time()))
            ->sum('raised_amount');

        $total_payout = Fundraiser_payout::where('user_id', auth()->user()->id)
            ->where('status', 1)->sum('requested_amount');

        $main_balance = $balance - $total_payout;

        $reports = Fundraiser_payout::where('user_id', auth()->user()->id)
            ->where('status', 1)->orderBy('id', 'DESC')->take(10)->paginate(5);

        session(['main_balance' => $main_balance]);

        $response_data = [
            'section_title' => 'Payout',
            'link_name' => 'Fundraiser',
            'head_link' => route('fundraiser.index'),
            'total_payout' => $total_payout,
            'main_balance' => $main_balance,
            'fundraiser_complete' => $fundraiser_complete,
            'reports' => $reports,
        ];

        return ApiResponse::success($response_data, 'Payout history retrieved successfully');
    }

    public function campaign_history(Request $request, $type)
    {
        $date = $request->date;
        $date = strtotime($date);

        $fundraiser_complete = Fundraiser::where('user_id', auth()->user()->id)
            ->where('fundraisers.timestamp_end', '<=', date('Y-m-d', time()))
            ->orderBy('id', 'DESC')->get();

        $reports = Fundraiser_payout::whereDate('received_date', $date)
            ->where('status', 1)->orderBy('id', 'DESC')->paginate(10);

        $balance = Fundraiser::where('user_id', auth()->user()->id)
            ->where('fundraisers.timestamp_end', '<=', date('Y-m-d', time()))
            ->sum('raised_amount');

        $total_payout = Fundraiser_payout::where('user_id', auth()->user()->id)
            ->where('status', 1)->sum('requested_amount');

        $main_balance = $balance - $total_payout;

        session(['main_balance' => $main_balance]);

        $response_data = [
            'section_title' => '',
            'link_name' => 'Fundraiser',
            'head_link' => route('fundraiser.index'),
            'reports' => $reports,
            'total_payout' => $total_payout,
            'main_balance' => $main_balance,
            'fundraiser_complete' => $fundraiser_complete,
        ];

        return ApiResponse::success($response_data, 'Campaign history retrieved successfully');
    }

    public function phistory_model($id)
    {
        $phistory = Fundraiser_donation::join('users', 'fundraiser_donations.doner_id', '=', 'users.id')
            ->select('fundraiser_donations.*', 'users.name')
            ->where('fundraiser_id', $id)
            ->latest('id')
            ->get();

        return ApiResponse::success(['phistory' => $phistory], 'Payout history modal data retrieved successfully');
    }

    public function profile($id)
    {
        $sharecount = \App\Models\Posts::where('publisher_id', $id)->first();

        $campaign = Fundraiser::join('users', 'fundraisers.user_id', '=', 'users.id')
            ->select('fundraisers.*', 'users.name')
            ->where('fundraisers.id', $id)
            ->first();

        $donate = Fundraiser_donation::join('fundraisers', 'fundraiser_donations.fundraiser_id', '=', 'fundraisers.id')
            ->select('fundraiser_donations.*', 'fundraisers.*')
            ->where('fundraiser_donations.fundraiser_id', $id)
            ->count();

        $days = round((strtotime($campaign->timestamp_end) - strtotime($campaign->created_at)) / (3600 * 24));
        $days_left = (int) $days;

        $user_data = Fundraiser::where('id', $id)->value('user_id');

        $auth_id = auth()->user()->id;
        $friendships = Friendships::where(function ($query) use ($auth_id) {
            $query->where('accepter', $auth_id)->orWhere('requester', $auth_id);
        })
            ->where('is_accepted', 1)
            ->orderBy('friendships.importance', 'desc')
            ->take(3)
            ->get();

        $response_data = [
            'user_data' => $user_data,
            'fundraiser' => Fundraiser::find($id),
            'sharecount' => $sharecount,
            'friendships' => $friendships,
            'donate' => $donate,
            'campaign' => $campaign,
            'days_left' => $days_left,
        ];

        return ApiResponse::success($response_data, 'Fundraiser profile data retrieved successfully');
    }

    public function donate_modal($id)
    {
        $fundraiser = Fundraiser::join('users', 'fundraisers.user_id', '=', 'users.id')
            ->select('fundraisers.*', 'users.name')
            ->where('fundraisers.id', $id)
            ->first();

        return ApiResponse::success(['fundraiser' => $fundraiser], 'Donate modal data retrieved successfully');
    }

    public function donate_modal_store(Request $request)
    {
        $payment_details = [
            'items' => [
                [
                    'id' => $request->fundraiser_id,
                    'title' => get_phrase('Payment for Donation.'),
                    'subtitle' => get_phrase(''),
                    'price' => $request->donate,
                    'discount_price' => $request->donate,
                    'discount_percentage' => 0,
                ],
            ],
            'custom_field' => [
                'pay_for' => 'author_payout',
                'user_id' => Fundraiser::where('id', $request->fundraiser_id)->value('user_id'),
            ],
            'success_method' => [
                'model_name' => 'Donation',
                'function_name' => 'make_donation',
            ],
            'tax' => 0,
            'coupon' => null,
            'payable_amount' => $request->donate,
            'cancel_url' => route('fundraiser.profile', $request->fundraiser_id),
            'success_url' => route('payment.success', ''),
        ];

        session(['payment_details' => $payment_details]);
        return ApiResponse::success(null, 'Payment details stored successfully', [
            'redirect_url' => route('payment'),
        ]);
    }

    public function share_modal()
    {
        $id = $_GET['fundraiser_id'];
        $url = url('/') . '/fundraiser/' . $id;

        $share = new Share();
        $share->share_user_id = auth()->user()->id;
        $share->event_id = $id;
        $share->url = $url;
        $done = $share->save();

        if ($done) {
            return ApiResponse::success([], "Event shared successfully");
        }

        return ApiResponse::error([], "Failed to share event", 500);
    }

    public function invited($invited_friend_id, $requester_id, $fundraiser_id)
    {
        $invitations = Fundraiser::where('id', $fundraiser_id)->value('invited');
        $invited = $invitations ? json_decode($invitations) : [];
        array_push($invited, $invited_friend_id);
        $invited = json_encode($invited);

        Fundraiser::where('id', $fundraiser_id)->update(['invited' => $invited]);

        $invite = new Invite();
        $invite->invite_reciver_id = $invited_friend_id;
        $invite->invite_sender_id = $requester_id;
        $invite->fundraiser_id = $fundraiser_id;
        $done = $invite->save();

        if ($done) {
            $notify = new Notification();
            $notify->sender_user_id = auth()->user()->id;
            $notify->reciver_user_id = $invited_friend_id;
            $notify->type = 'fundraiser';
            $notify->fundraiser_id = $fundraiser_id;
            $notify->save();

            return ApiResponse::success([], "Invite sent successfully");
        }

        return ApiResponse::error([], "Failed to send invite", 500);
    }

    public function see_more_friend($type, $id)
    {
        $sharecount = Post_share::where('post_id', $id)->count();

        $campaign = Fundraiser::join('users', 'fundraisers.user_id', '=', 'users.id')
            ->select('fundraisers.*', 'users.name')
            ->where('fundraisers.id', $id)
            ->first();

        $days = round((strtotime($campaign->timestamp_end) - strtotime($campaign->created_at)) / (3600 * 24));
        $days_left = (int) $days;

        $auth_id = auth()->user()->id;
        $friendships = Friendships::where(function ($query) use ($auth_id) {
            $query->where('accepter', $auth_id)->orWhere('requester', $auth_id);
        })
            ->where('is_accepted', 1)
            ->orderBy('friendships.importance', 'desc')
            ->paginate(20);

        return ApiResponse::success([
            'fundraiser' => Fundraiser::find($id),
            'sharecount' => $sharecount,
            'friendships' => $friendships,
            'campaign' => $campaign,
            'days_left' => $days_left,
        ], "Friend list retrieved successfully");
    }

    public function check_creator($user_id)
    {
        return Fundraiser::where('user_id', $user_id)->exists();
    }

    public function campaign_payout(Request $request)
    {
        $is_creator = $this->check_creator(auth()->user()->id);

        if (!$is_creator) {
            return ApiResponse::error([], "Not a creator", 403);
        }

        $old_request = Fundraiser_payout::where('user_id', auth()->user()->id)
            ->where('status', 0)
            ->latest('id');

        if ($old_request->exists()) {
            return ApiResponse::error([], "Another request is pending", 400);
        }

        $main_balance = session('main_balance');
        Session::forget('main_balance');

        if ($request->requested_amount > $main_balance || $request->requested_amount < 2) {
            return ApiResponse::error([], "Not enough balance", 400);
        }

        $data = [
            'user_id' => auth()->user()->id,
            'requested_amount' => $request->requested_amount,
            'status' => 0,
            'issue_date' => now(),
        ];

        Fundraiser_payout::insert($data);

        return ApiResponse::success([], "Request submitted successfully");
    }

    public function campaign_cancel($id)
    {
        $is_creator = $this->check_creator(auth()->user()->id);

        if (!$is_creator) {
            return ApiResponse::error([], "Not a creator", 403);
        }

        Fundraiser_payout::find($id)->delete();

        return ApiResponse::success([], "Request canceled successfully");
    }

    // ------------------------------------Backend start--------------------------------------------------------------
    public function payout_report()
    {
        $success_reports = Fundraiser_payout::where('status', 1)->latest()->paginate(10);

        return ApiResponse::success([
            'type' => 'success',
            'reports' => $success_reports,
        ], "Payout reports retrieved successfully");
    }

    public function pending_report()
    {
        $pending_reports = Fundraiser_payout::where('status', 0)->latest()->paginate(10);

        return ApiResponse::success([
            'type' => 'pending',
            'reports' => $pending_reports,
        ], "Pending payout reports retrieved successfully");
    }

    public function delete_payout($id)
    {
        Fundraiser_payout::find($id)->delete();

        return ApiResponse::success([], "Payout request deleted successfully");
    }

    public function author_payout($id)
    {
        $payout = Fundraiser_payout::where('id', $id)->first();

        $user_payment_settings = Users::where('id', $payout->user_id)->value('payment_settings');
        if (!$user_payment_settings) {
            return ApiResponse::error([], "User payment not configured", 400);
        }

        $settings = json_decode($user_payment_settings);
        $payment_configured = false;

        foreach ($settings as $item) {
            if ($item != '') {
                $payment_configured = true;
                break;
            }
        }

        if (!$payment_configured) {
            return ApiResponse::error([], "User payment not configured", 400);
        }

        $payment_details = [
            'items' => [
                [
                    'id' => $id,
                    'title' => get_phrase('Payment for Fundraiser.'),
                    'subtitle' => get_phrase(''),
                    'price' => $payout->requested_amount,
                    'discount_price' => $payout->requested_amount,
                    'discount_percentage' => 0,
                ],
            ],
            'custom_field' => [
                'pay_for' => 'author_payout',
                'user_id' => $payout->user_id,
                'price' => $payout->requested_amount,
                'issue_date' => $payout->issue_date,
            ],
            'success_method' => [
                'model_name' => 'CampaignPayout',
                'function_name' => 'make_author_payment',
            ],
            'tax' => 0,
            'coupon' => null,
            'payable_amount' => $payout->requested_amount,
            'cancel_url' => route('backend.fundraiser.pending'),
            'success_url' => route('payment.success', ''),
        ];

        session(['payment_details' => $payment_details]);

        return ApiResponse::success([], "Payment details set successfully");
    }

    public function share_my_timeline(Request $request)
    {
        $postshare = new Post_share();
        $postshare->user_id = auth()->user()->id;
        $postshare->post_id = $request->shared_post_id;
        $postshare->shared_on = 'group';
        $postshare->save();

        $publishId = Posts::where('post_id', $request->shared_post_id)->first();
        $post = new Posts();
        $post->user_id = auth()->user()->id;
        $post->publisher = 'fundraiser';
        $post->publisher_id = $publishId->publisher_id;
        $post->post_type = "fundraisers";
        $post->privacy = "public";
        $post->tagged_user_ids = json_encode([]);
        $post->description = $request->postUrl ?? $request->productUrl;
        $post->status = 'active';
        $post->user_reacts = json_encode([]);
        $post->shared_user = json_encode([]);
        $post->created_at = now();
        $post->updated_at = now();
        $done = $post->save();

        if ($done) {
            return ApiResponse::success([], "Shared on timeline successfully");
        }

        return ApiResponse::error([], "Failed to share on timeline", 500);
    }

    // ------------------------------------Backend end--------------------------------------------------------------
    public function test(Request $request)
    {
        $date = date('Y-m-d', strtotime($request->date));
        $reports = Fundraiser_payout::whereDate('received_date', $date)
            ->where('status', 1)
            ->orderBy('id', 'DESC')
            ->paginate(10);

        return ApiResponse::success([
            'reports' => $reports,
        ], "Payout reports for the day retrieved successfully");
    }

    public function status($id)
    {
        $campaign = Fundraiser::find($id);

        if (!$campaign) {
            return ApiResponse::error([], "Campaign not found", 404);
        }

        $newStatus = $campaign->status == 0 ? 1 : 0;
        $campaign->update(['status' => $newStatus]);

        $message = $newStatus == 1 ? "Campaign deactivated" : "Campaign activated";
        return ApiResponse::success([], $message);
    }
}