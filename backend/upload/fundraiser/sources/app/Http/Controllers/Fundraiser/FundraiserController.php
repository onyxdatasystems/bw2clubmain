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
use App\Models\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Session;
use Carbon\Carbon;

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
    
       // $popular = Fundraiser::where('categories_id', 1)->where('status', 0)->orderBy('id', 'DESC')->take(3)->get();
        // $animal = Fundraiser::where('categories_id', 2)->where('status', 0)->orderBy('id', 'DESC')->take(3)->get();
        // $culture = Fundraiser::where('categories_id', 3)->where('status', 0)->orderBy('id', 'DESC')->take(3)->get();
        // $business = Fundraiser::where('categories_id', 4)->where('status', 0)->orderBy('id', 'DESC')->take(3)->get();
        // $community = Fundraiser::where('categories_id', 5)->where('status', 0)->orderBy('id', 'DESC')->take(3)->get();
        // $crisis = Fundraiser::where('categories_id', 6)->where('status', 0)->orderBy('id', 'DESC')->take(3)->get();
        // $education = Fundraiser::where('categories_id', 7)->where('status', 0)->orderBy('id', 'DESC')->take(3)->get();
        $category = Fundraiser_category::get();

        $page_data = [
            'popular' => $popular,
            'animal' => $animal,
            'culture' => $culture,
            'business' => $business,
            'community' => $community,
            'crisis' => $crisis,
            'education' => $education,
            'category' => $category,
            // 'layout' => 'fundraiser',
            'view_path' => 'frontend.fundraiser.index',
            'section' => 'frontend.fundraiser.explore',
        ];

        return view('frontend.index', $page_data);

    }

    public function campaign_by_category($type)
    {
        $currentDate = Carbon::now();
        if ($type == 'popular') {
            $popular = Fundraiser::where('categories_id', 1)->where('status', 0)
            ->whereDate('timestamp_end', '>=', $currentDate)
            ->orderBy('id', 'DESC')->get();
            //$popular = Fundraiser::where('categories_id', 1)->where('status', 0)->orderBy('id', 'DESC')->get();
            $animal = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();
            $culture = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();
            $business = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();
            $community = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();
            $crisis = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();
            $education = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();

        } elseif ($type == 'animal') {
            $animal = Fundraiser::where('categories_id', 2)->where('status', 0)
            ->whereDate('timestamp_end', '>=', $currentDate)
            ->orderBy('id', 'DESC')->get();
            //$animal = Fundraiser::where('categories_id', 2)->where('status', 0)->orderBy('id', 'DESC')->get();

            $popular = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();
            $culture = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();
            $business = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();
            $community = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();
            $crisis = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();
            $education = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();

        } elseif ($type == 'culture') {
            $culture = Fundraiser::where('categories_id', 3)->where('status', 0)
            ->whereDate('timestamp_end', '>=', $currentDate)
            ->orderBy('id', 'DESC')->get();
            //$culture = Fundraiser::where('categories_id', 3)->where('status', 0)->orderBy('id', 'DESC')->get();
            $business = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();
            $community = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();
            $crisis = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();
            $education = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();
            $animal = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();

            $popular = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();

        } elseif ($type == 'business') {
            $business = Fundraiser::where('categories_id', 4)->where('status', 0)
            ->whereDate('timestamp_end', '>=', $currentDate)
            ->orderBy('id', 'DESC')->get();
            //$business = Fundraiser::where('categories_id', 4)->where('status', 0)->orderBy('id', 'DESC')->get();
            $community = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();
            $crisis = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();
            $education = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();
            $animal = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();
            $culture = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();
            $popular = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();

        } elseif ($type == 'community') {
            $community = Fundraiser::where('categories_id', 5)->where('status', 0)
            ->whereDate('timestamp_end', '>=', $currentDate)
            ->orderBy('id', 'DESC')->get();
            //$community = Fundraiser::where('categories_id', 5)->where('status', 0)->orderBy('id', 'DESC')->get();
            $crisis = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();
            $education = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();
            $animal = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();
            $culture = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();
            $popular = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();
            $business = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();

        } elseif ($type == 'crisis') {
            $crisis = Fundraiser::where('categories_id', 6)->where('status', 0)
            ->whereDate('timestamp_end', '>=', $currentDate)
            ->orderBy('id', 'DESC')->get();
           // $crisis = Fundraiser::where('categories_id', 6)->where('status', 0)->orderBy('id', 'DESC')->get();
            $education = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();
            $animal = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();
            $culture = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();
            $popular = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();
            $business = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();
            $community = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();

        } else {
            $education = Fundraiser::where('categories_id', 7)->where('status', 0)
            ->whereDate('timestamp_end', '>=', $currentDate)
            ->orderBy('id', 'DESC')->get();
           // $education = Fundraiser::where('categories_id', 7)->where('status', 0)->orderBy('id', 'DESC')->get();
            $animal = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();
            $culture = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();
            $popular = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();
            $business = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();
            $community = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();
            $crisis = Fundraiser::where('categories_id', 0)->orderBy('id', 'DESC')->get();
        }

        $page_data = [
            'popular' => $popular,
            'animal' => $animal,
            'culture' => $culture,
            'business' => $business,
            'community' => $community,
            'crisis' => $crisis,
            'education' => $education,
            // 'layout' => 'fundraiser',
            'view_path' => 'frontend.fundraiser.index',
            'section' => 'frontend.fundraiser.explore',
        ];

        return view('frontend.index', $page_data);

    }

    public function category($type)
    {

        if ($type == 'explore') {
            
            $category = Fundraiser_category::get();
            $page_data['type'] = 'explore';

            $page_data = [
                'category' => $category,
                // 'layout' => 'fundraiser',
                'type' => 'explore',
                'view_path' => 'frontend.fundraiser.index',
                'section' => 'frontend.fundraiser.categories_tab',
            ];
            return view('frontend.index', $page_data);

        } else {
            $currentDate = Carbon::now();
            $category = Fundraiser::join('fundraiser_categories', 'fundraisers.categories_id', '=', 'fundraiser_categories.id')
                ->select('fundraisers.*')
                ->where('fundraisers.categories_id', $type)
                ->whereDate('timestamp_end', '>=', $currentDate)
                ->where('status', 0)
                ->orderBy('id', 'DESC')->get();

            $section_head = Fundraiser_category::where('id', $type)->value('name');

            $page_data = [
                'campaign_by_category' => $category,
                // 'layout' => 'fundraiser',
                'view_path' => 'frontend.fundraiser.index',
                'section' => 'frontend.fundraiser.categories_tab',
                'section_head' => $section_head,
            ];

            return view('frontend.index', $page_data);
        }

    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'goal_amount' => 'required | numeric|min:1',
            'timestamp_end' => 'required',
            'categories_id' => 'required',
        ]);

        if ($request->cover_photo == '') {
            $image = '';
        } else {
            $item = $request->file('cover_photo');
            $image_name = strtotime('now') . random(4) . '.' . $item->getClientOriginalExtension();

            $path = public_path('assets/frontend/images/campaign');
            if (!File::isDirectory($path)) {
                File::makeDirectory($path, 0777, true, true);
            } else {
                $item->move(public_path('assets/frontend/images/campaign/'), $image_name);
            }
            $image = $image_name;
        }

        // $data = [
        //     'user_id' => $request->user_id,
        //     'title' => $request->title,
        //     'description' => $request->description,
        //     'goal_amount' => $request->goal_amount,
        //     'timestamp_end' => $request->timestamp_end,
        //     'categories_id' => $request->categories_id,
        //     'cover_photo' => $image,
        // ];

        $campaign = new Fundraiser();

        $campaign->user_id = auth()->user()->id;
        $campaign->title = $request->title;
        $campaign->status = 0;
        $campaign->description = $request->description;
        $campaign->goal_amount = $request->goal_amount;
        $campaign->timestamp_end = $request->timestamp_end;
        $campaign->categories_id = $request->categories_id;
        $campaign->cover_photo = $image;

        //  $campaign->save();
        $done = $campaign->save();

        if ($done) {
            $data['user_id'] = auth()->user()->id;
            $data['privacy'] = "public";
            $data['publisher'] = 'fundraiser';
            $data['publisher_id'] = $campaign->id;
            $data['post_type'] = "fundraiser";
            $data['status'] = 'active';
            $data['description'] = $request->title;
            $data['user_reacts'] = json_encode(array());
            $data['user_reacts'] = json_encode(array());
            $data['tagged_user_ids'] = json_encode(array());
            $data['created_at'] = time();
            $data['updated_at'] = $data['created_at'];
        
            Posts::create($data);
            Session::flash('success_message', 'Create');
            return redirect()->route('fundraiser.myactivity');
        }
    }

    public function create()
    {

        $page_data = [
            // 'layout' => 'fundraiser_campaign_form',
            'view_path' => 'frontend.fundraiser.fundraiser_campaign_form',

        ];

        return view('frontend.index', $page_data);
    }

    public function campaign_type($type)
    {
        if ($type == 'ongoing') {
            $fundraiser_explore = Fundraiser::join('users', 'fundraisers.user_id', '=', 'users.id')
                ->select('fundraisers.*', 'users.name', 'users.email')
                ->where('user_id', auth()->user()->id)
                ->where('fundraisers.timestamp_end', '>=', date('Y-m-d', time()))
                ->orderBy('id', 'DESC')->get();

            $fundraiser_complete = Fundraiser::where('id', 0)->get();
        } else {
            $fundraiser_complete = Fundraiser::join('users', 'fundraisers.user_id', '=', 'users.id')
                ->select('fundraisers.*', 'users.name', 'users.email')
                ->where('user_id', auth()->user()->id)
                ->where('fundraisers.timestamp_end', '<=', date('Y-m-d', time()))
                ->orderBy('id', 'DESC')->get();

            $fundraiser_explore = Fundraiser::where('id', 0)->get();
        }

        $page_data = [

            'section_title' => '',
            'link_name' => 'Fundraiser',
            'head_link' => route('fundraiser.index'),
            // 'layout' => 'addons_layout',
            'show_more' => 'off',

            'fundraiser_complete' => $fundraiser_complete,
            'fundraiser_explore' => $fundraiser_explore,

            'view_path' => 'frontend.addons.index',
            'content_view' => 'frontend.fundraiser.activity_explore',
        ];

        return view('frontend.index', $page_data);

    }

    public function edit($id)
    {
        $campaign_info = Fundraiser::where('id', $id)->first();
        $page_data = [

            'campaign_info' => $campaign_info,

            // 'layout' => 'fundraiser_update_form',
            'view_path' => 'frontend.fundraiser.fundraiser_update_form',

        ];

        return view('frontend.index', $page_data);
    }

    public function update(Request $request, $id)
    {
        $required = $request->all();
        array_shift($required);

        foreach ($required as $item) {
            if ($item == '') {
                Session::flash('success_message', 'Fill all the fields.');
                return redirect()->back();
            }
        }

        if ($request->cover_photo != '') {
            $item = $request->file('cover_photo');
            $image_name = strtotime('now') . random(4) . '.' . $item->getClientOriginalExtension();

            $path = public_path('assets/frontend/images/campaign');
            if (!File::isDirectory($path)) {
                File::makeDirectory($path, 0777, true, true);
            } else {
                $item->move(public_path('assets/frontend/images/campaign/'), $image_name);
            }
            $image = $image_name;
            $data['cover_photo'] = $image;
        }

        $data['user_id'] = $request->up_user_id;
        $data['title'] = $request->up_title;
        $data['description'] = $request->up_description;
        $data['goal_amount'] = $request->up_goal_amount;
        $data['timestamp_end'] = $request->up_timestamp_end;
        $data['categories_id'] = $request->up_categories_id;

        Fundraiser::where('id', $id)->update($data);
        Session::flash('success_message', 'Updated');
        return redirect()->route('fundraiser.myactivity');

    }

    public function search(Request $request)
    {
        $currentDate = Carbon::now();
        $explore = Fundraiser::orderBy('id', 'DESC')
            ->where('status', 0)
            ->whereDate('timestamp_end', '>=', $currentDate)
            ->where('title', 'LIKE', '%' . $request->search . '%')->get();

        $page_data = [
            'explore' => $explore,
            // 'layout' => 'fundraiser',
            'view_path' => 'frontend.fundraiser.index',
            'section' => 'frontend.fundraiser.search_explore',
        ];

        return view('frontend.index', $page_data);

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

        $page_data = [

            'section_title' => '',
            'link_name' => 'Fundraiser',
            'head_link' => route('fundraiser.index'),
           // 'layout' => 'addons_layout',
            'fundraiser_complete' => $fundraiser_complete,
            'fundraiser_explore' => $fundraiser_explore,
            'view_path' => 'frontend.addons.index',
            'content_view' => 'frontend.fundraiser.activity_explore',
        ];


        return view('frontend.index', $page_data);
    }

    public function explore_delete($id)
    {
        Fundraiser::where('id', $id)->delete();
        Session::flash('success_message', 'deleted.');
        return redirect()->back();

    }

    public function donor()
    {

        $page_data = [
            'section_title' => 'Payment History',
            'link_name' => 'Fundraiser',
            'head_link' => route('fundraiser.index'),
            // 'layout' => 'addons_layout',

            'view_path' => 'frontend.addons.index',
            'content_view' => 'frontend.fundraiser.donor_panel',
        ];

        return view('frontend.index', $page_data);

    }

    public function dhistory()
    {

        $page_data = [
            'section_title' => '',
            'link_name' => 'Fundraiser',
            'head_link' => route('fundraiser.index'),
            'layout' => 'addons_layout',

            'view_path' => 'frontend.addons.index',
            'content_view' => 'frontend.fundraiser.donor_history',
        ];

        return view('frontend.index', $page_data);

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

        $page_data = [
            'section_title' => 'Payout',
            'link_name' => 'Fundraiser',
            'head_link' => route('fundraiser.index'),
            // 'layout' => 'addons_layout',

            'total_payout' => $total_payout,
            'main_balance' => $main_balance,
            'fundraiser_complete' => $fundraiser_complete,
            'reports' => $reports,

            'modal' => 'frontend.fundraiser.history_modal',
            'view_path' => 'frontend.addons.index',
            'content_view' => 'frontend.fundraiser.payouts',
        ];

        return view('frontend.index', $page_data);

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

        $page_data = [
            'section_title' => '',
            'link_name' => 'Fundraiser',
            'head_link' => route('fundraiser.index'),
            'layout' => 'addons_layout',

            'reports' => $reports,
            'total_payout' => $total_payout,
            'main_balance' => $main_balance,
            'fundraiser_complete' => $fundraiser_complete,

            'modal' => 'frontend.fundraiser.history_modal',
            'view_path' => 'frontend.addons.index',
            'content_view' => 'frontend.fundraiser.payouts',
        ];

        return view('frontend.index', $page_data);

    }

    public function phistory_model($id)
    {
        $phistory = Fundraiser_donation::join('users', 'fundraiser_donations.doner_id', '=', 'users.id')
            ->select('fundraiser_donations.*', 'users.name')
            ->where('fundraiser_id', $id)
            ->latest('id')
            ->get();
        return view('frontend.fundraiser.history_modal', compact('phistory'));
    }

    public function profile($id)
    {

        $sharecount = \App\Models\Posts::where('publisher_id', $id)->first();

        //$sharecount = \App\Models\Post_share::where('post_id', $id)->get()->count();
        // print_r($sharecount);
        // die;

        $campaign = Fundraiser::join('users', 'fundraisers.user_id', '=', 'users.id')
            ->select('fundraisers.*', 'users.name')
            ->where('fundraisers.id', $id)
            ->first();

        $donate = Fundraiser_donation::join('fundraisers', 'fundraiser_donations.fundraiser_id', '=', 'fundraisers.id')
            ->select('fundraiser_donations.*', 'fundraiser.*')
            ->where('fundraiser_donations.fundraiser_id', $id)
            ->count();

        $days = round((strtotime($campaign->timestamp_end) - strtotime($campaign->created_at)) / (3600 * 24));
        $days_left = (int) $days;

        $user_data = Fundraiser::where('id', $id)->find('user_id');

        $auth_id = auth()->user()->id;
        $friendships = Friendships::where(function ($query) use ($auth_id) {
            $query->where('accepter', $auth_id)->orWhere('requester', $auth_id);
        })
            ->where('is_accepted', 1)
            ->orderBy('friendships.importance', 'desc')
            ->take(3)
            ->get();

        $page_data = [
            'user_data' => $user_data,
            'fundraiser' => Fundraiser::find($id),
            'sharecount' => $sharecount,
            'friendships' => $friendships,
            'donate' => $donate,
            'campaign' => $campaign,
            'days_left' => $days_left,
            'modal' => 'frontend.fundraiser.donate_modal',
            'layout' => 'fundraiser_profile.blade',
            'view_path' => 'frontend.fundraiser.fundraiser_profile',
        ];
        $page_data['user_data'] = User::find($campaign->user_id);
        // $page_data['friendships'] = $friendships;

        return view('frontend.index', $page_data);
    }

    public function donate_modal($id)
    {
        $fundraiser = Fundraiser::join('users', 'fundraisers.user_id', '=', 'users.id')
            ->select('fundraisers.*', 'users.name')
            ->where('fundraisers.id', $id)
            ->first();
        return view('frontend.fundraiser.donate_modal', compact('fundraiser'));
    }

    public function donate_modal_store(Request $request)
    {
      
     
        $payment_details = [
            'items' => [ // package
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
        return redirect()->route('payment');
    }

    public function share_modal()
    {

        $id = $_GET['fundraiser_id'];
        $url = url('/') . '/fundraiser/' . $id;
        $response = array();
        $sahre = new Share();
        $sahre->share_user_id = auth()->user()->id;
        $sahre->event_id = $id;
        $sahre->url = $url;
        $done = $sahre->save();
        if ($done) {
            $response = array('alertMessage' => get_phrase('Event Shared Successfully'));
        }
        return json_encode($response);
    }

    public function invited($invited_friend_id, $requester_id, $fundraiser_id)
    {

        $invitations = Fundraiser::where('id', $fundraiser_id)->value('invited');

        if ($invitations != '') {
            $invited = json_decode($invitations);
        } else {
            $invited = [];
        }
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

            Session::flash('success_message', get_phrase('Invite Done'));
            return redirect()->back();
        }
    }

    public function see_more_friend($type, $id)
    {
        $sharecount = \App\Models\Post_share::where('post_id', $id)
            ->get()
            ->count();

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

        $page_data = [

            'fundraiser' => Fundraiser::find($id),
            'sharecount' => $sharecount,
            'friendships' => $friendships,

            'campaign' => $campaign,
            'days_left' => $days_left,
            'modal' => 'frontend.fundraiser.donate_modal',
            'layout' => 'fundraiser_profile.blade',
            'view_path' => 'frontend.fundraiser.see_all_friend',
        ];

        return view('frontend.index', $page_data);

    }

    public function check_creator($user_id)
    {
        if (Fundraiser::where('user_id', $user_id)->exists()) {
            return true;
        } else {
            return false;
        }
    }

    public function campaign_payout(Request $request)
    {
        $is_creator = $this->check_creator(auth()->user()->id);
        if ($is_creator) {
            $old_request = Fundraiser_payout::where('user_id', auth()->user()->id)
                ->where('status', 0)->latest('id');
           
            if ($old_request->exists()) {
                $request_id = $old_request->first();
                session(['request_id' => $request_id]);
                Session::flash('success_message', 'Another request pending.');
            } else {
                $main_balance = session('main_balance');
                Session::forget('main_balance');
                
                if ($request->requested_amount > $main_balance || $request->requested_amount < 2) {
                    Session::flash('success_message', 'Not enough balance.');
                } else {
                    $data = [
                        'user_id' => auth()->user()->id,
                        'requested_amount' => $request->requested_amount,
                        'status' => 0,
                        'issue_date' => date('Y-m-d H:i:s')
                    ];
                    Fundraiser_payout::where('user_id', auth()->user()->id)->insert($data);
                    Session::flash('success_message', 'Request submitted.');
                }
            }
            return redirect()->back();
        } else {
            Session::flash('success_message', 'Not a creator.');
            return redirect()->route('fundraiser.payment');
        }
    }

    public function campaign_cancel($id)
    {
        $is_creator = $this->check_creator(auth()->user()->id);
        if ($is_creator) {
            Fundraiser_payout::find($id)->delete();
            Session::flash('success_message', 'Request canceled.');
            return redirect()->back();
        } else {
            Session::flash('success_message', 'Not a creator.');
            return redirect()->route('fundraiser.payment');
        }
    }


    // ------------------------------------Backend start--------------------------------------------------------------
    public function payout_report()
    {
        $success_reports = Fundraiser_payout::where('status', 1)->latest()->paginate(10);
        $page_data = [
            'type' => 'success',
            'reports' => $success_reports,
            'view_path' => 'fundraiser.payout_success',
        ];
        return view('backend.index', $page_data);
    }

    public function pending_report()
    {
        $pending_reports = Fundraiser_payout::where('status', 0)->latest()->paginate(10);
        $page_data = [
            'type' => 'pending',
            'reports' => $pending_reports,
            'view_path' => 'fundraiser.payout_pending',
        ];
        return view('backend.index', $page_data);
    }

    public function delete_payout($id)
    {
        Fundraiser_payout::find($id)->delete();
        flash()->addSuccess('Payout request deleted.');
        return redirect()->back();
    }

    public function author_payout($id)
    {
        $payout = Fundraiser_payout::where('id', $id)->first();

        $user_payment_settings = Users::where('id', $payout->user_id)->value('payment_settings');
        if ($user_payment_settings == '') {
            flash()->addWarning("User payment not configured.");
            return redirect()->back();
        } else {
            $settings = json_decode($user_payment_settings);
        }

        foreach ($settings as $item) {
            if ($item != '') {
                $payment_configured = 1;
                break;
            }
        }

        if (!isset($payment_configured)) {
            flash()->addSuccess("User payment not configured.");
            return redirect()->back();
        }

        $payment_details = [
            'items' => [ // package
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
            //'success_url' => route('backend.fundraiser.pending'),
        ];
        session(['payment_details' => $payment_details]);
        return redirect()->route('payment');

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
        $post->tagged_user_ids = json_encode(array());
        if (isset($request->shared_post_id) && !empty($request->shared_post_id)) {
            $post->description = $request->postUrl;
        }
        if (isset($request->shared_product_id) && !empty($request->shared_product_id)) {
            $post->description = $request->productUrl;
        }
        $post->status = 'active';
        $post->user_reacts = json_encode(array());
        $post->shared_user = json_encode(array());
        $time = time();
        $post->created_at = $time;
        $post->updated_at = $time;
        $done = $post->save();

        Session::flash('success_message', get_phrase('Share On Timeline Successfully'));
        return json_encode(array('url' => route('fundraiser.index')));
    }




    // ------------------------------------Backend end--------------------------------------------------------------
    public function test(Request $request)
    {
        $date = $request->date;
        $date = strtotime($date);
        $date = date('Y-m-d', $date);
        $reports = Fundraiser_payout::whereDate('received_date', $date)
            ->where('status', 1)->orderBy('id', 'DESC')->paginate(10);
        return view('frontend.fundraiser.payout_report_day', compact('reports'));
    }

    public function status($id)
    {
        $campaign = Fundraiser::find($id);

        if ($campaign->status == 0) {
            Fundraiser::where('id', $id)->update(['status' => 1]);
            Session::flash('success_message', 'Campaign deactivated.');
        } else {
            Fundraiser::where('id', $id)->update(['status' => 0]);
            Session::flash('success_message', 'Campaign activated.');
        }

        return redirect()->back();
    }

}
