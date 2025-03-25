<?php

namespace App\Http\Controllers;

use App\Models\PaidContentCreator;
use App\Models\PaidContentPackages;
use App\Models\PaidContentPayout;
use App\Models\PaidContentSubscription;
use App\Models\Posts;
use App\Models\User;
use App\Models\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Session;
use Carbon\Carbon;

class PaidContent extends Controller
{
    public $user;
    public $user_subscription;

    // ======= common functions for paid content starts ======= //

    // 1. get user post by id
    public function get_posts($user_id, $take = 0, $offset = 0, $privacy = '')
    {
        $this->user = $user_id;
        $get_post = Posts::where(function ($query) {
            $query->whereJsonContains('users.friends', [$this->user])
                ->where('posts.privacy', '!=', 'private')
                ->orWhere('posts.user_id', [$this->user]);
        })
            ->where('posts.status', 'active')
            ->where('posts.publisher', 'paid_content')
            ->where('posts.report_status', '0')
            ->join('users', 'posts.user_id', '=', 'users.id')
            ->select('posts.*', 'users.name', 'users.photo', 'users.friends', 'posts.created_at as created_at')
            ->where('posts.user_id', $this->user)
            ->orderBy('posts.post_id', 'DESC');

        if ($take > 0) {
            $posts = $get_post->take($take);
        }

        if ($privacy == '') { // all post except private
            $posts = $get_post->where('posts.privacy', '!=', 'private');
        } elseif ($privacy == 'all') { // all post of user
            $posts = $get_post;
        } else { // post by selected privacy
            $posts = $get_post->where('posts.privacy', $privacy);
        }

        if ($offset > 0) {
            $posts = $get_post->skip($offset);
        }
        return $posts->get();
    }

    // 2. check paid content creator
    public function is_creator($id)
    {
        $creator = PaidContentCreator::where('user_id', $id)->where('status', 1)->exists();
        return $creator;
    }

    // 3. delete user photo
    public function delete_file($name)
    {
        $file_path = public_path('assets/frontend/images/' . $name);
        if (File::exists($file_path)) {
            File::delete($file_path);
            return true;
        } else {
            return false;
        }
    }

    /*--------------------------------------------------------------------------------------------------*/
    // paid creator main page for general user and author
    /*--------------------------------------------------------------------------------------------------*/

    public function paid_content()
    {
        $creator = $this->is_creator(auth()->user()->id);
        if ($creator) {
            return redirect()->route('creator.timeline', ['type' => 'timeline']);
        } else {
            return redirect()->route('general.timeline');
        }
    }

    public function general_timeline()
    {
        $creator = $this->is_creator(auth()->user()->id);
        if ($creator) {
            return redirect()->route('creator.timeline', ['type' => 'timeline']);
        }

        $this->user = $this->user_subscription = 0;
        session(['creator_id' => 0]);

        $creators = PaidContentCreator::where('status', 1)
            ->inRandomOrder()->take(16)->get();
        $page_data = [
            'view_path' => 'frontend.paid_content.general_timeline',
            'creators' => $creators,
        ];
        return view('frontend.index', $page_data);
    }

    public function creator_page_view($page, $id)
    {
        $this->user = $id; // $id is not working on whereJsonContains
        session(['creator_id' => $id]); // we will access it on load post on scroll
        $posts = $this->get_posts($id, 5, 0);

        $paid_content = PaidContentCreator::where('user_id', $id)->first();
        $packages = PaidContentPackages::where('user_id', $id)->get();

        $query = PaidContentSubscription::
            where('subscriber_id', auth()->user()->id)
            ->where('creator_id', $id)
            ->where('status', 1);
        $subscription = $query->latest()->first();

        if (isset($subscription->status)) {
            if (strtotime('now') > $subscription->expire_date) {
                $query->update(['status' => 0]); // make status 0, when subscription is expired
            }
            // if user has subscription then show friends and public type posts
            $this->user_subscription = $subscription = 1;
        } else {
            // if user hasn't subscribed then show only public type posts
            $this->user_subscription = $subscription = 0;
        }

        $page_data = [
            'subscription' => $subscription,
            'posts' => $posts,
            'creator_id' => $id,
            'packages' => $packages,
            'paid_content' => $paid_content,
            'view_path' => 'frontend.paid_content.creator_page_view',
        ];

        return view('frontend.index', $page_data);
    }

    public function load_paid_content_post(Request $request)
    {
        $this->user = session('creator_id');
        $posts = $this->get_posts($this->user, 3, $request->offset);

        $query = PaidContentSubscription::
            where('subscriber_id', auth()->user()->id)
            ->where('creator_id', $this->user)
            ->where('status', 1);
        $subscription = $query->latest()->first();

        if (isset($subscription->status)) {
            $subscription = 1;
        } else {
            $subscription = 0;
        }

        $page_data['user_info'] = Users::find($this->user);
        $page_data['posts'] = $posts;
        $page_data['subscription'] = $subscription;
        $page_data['type'] = 'user_post';
        return view('frontend.main_content.posts', $page_data);
    }

    public function subscription($id, Request $request)
    {
        $admin_commission = DB::table('settings')->where('type', 'commission_rate')->value('description');
        if ($admin_commission == '') {
            Session::flash('success_message', "Can't pay! Contact admin.");
            return redirect()->back();
        }

        $creator = PaidContentCreator::where('user_id', $request->creator_id)->first();

        // check user subscription
        if (PaidContentSubscription::
            where('subscriber_id', auth()->user()->id)
            ->where('creator_id', $request->creator_id)
            ->where('status', 1)
            ->exists()) {
            Session::flash('success_message', 'Already subscribed.');
            return redirect()->back();
        }

        $payment_details = [
            'items' => [ // package
                [
                    'id' => $id,
                    'title' => get_phrase('Subscription for ____ month', [1]),
                    'subtitle' => get_phrase('Your subscription will be start from ____', [date('d-m-Y', $request->issue_date)]),
                    'price' => $request->price,
                    'discount_price' => $request->price,
                    'discount_percentage' => 0,
                ],
            ],
            'custom_field' => [
                'pay_for' => 'subscription',
                'user_id' => $request->subscriber_id,
                'package_id' => $request->package_id,
                'creator_id' => $request->creator_id,
                'price' => $request->price,
                'issue_date' => $request->issue_date,
                'expire_date' => $request->expire_date,
            ],
            'success_method' => [
                'model_name' => 'Subscription',
                'function_name' => 'subscription_payment',
            ],
            'tax' => 0,
            'coupon' => null,
            'payable_amount' => $request->price,
            'cancel_url' => route('page.view', ['page' => $creator->title, 'id' => $creator->user_id]),
            'success_url' => route('payment.success', ''),
        ];

        session(['payment_details' => $payment_details]);
        return redirect()->route('payment');
    }

    public function search_type(Request $request, $type)
    {
        if ($type == 'creator') {
            $search = $request->search_type;
            $search_list = PaidContentCreator::where('title', 'LIKE', "%{$search}%")
                ->take(8)->orderBy('paid_content_creators.user_id', 'DESC')->get();

            foreach ($search_list as $item) {
                $item['total_post'] = $this->get_posts($item->user_id)->count();
            }

            $page_data = [
                'keyword' => $search,
                'search_as' => 'creator',
                'search_list' => $search_list,
                'noScroll' => true,
                'view_path' => 'frontend.paid_content.searched_result',
            ];
            $search_item = [
                'search_as' => 'creator',
                'keyword' => $search,
            ];

            session(['search_item' => $search_item]);
            return view('frontend.index', $page_data);

        } elseif ($type == 'subscribers') {

            $search = $request->search_type;
            $search_list = Users::where('name', 'LIKE', "%$search%")
                ->join('paid_content_subscriptions', 'users.id', '=', 'paid_content_subscriptions.subscriber_id')
                ->select('paid_content_subscriptions.*', 'users.name', 'users.email')
                ->take(8)->get();

            $search_list = $search_list->where('status', 1)
                ->where('creator_id', auth()->user()->id);

            $page_data = [
                'keyword' => $search,
                'search_list' => $search_list,
                'noScroll' => true,
                'view_path' => 'frontend.paid_content.searched_result',
            ];
            $search_item = [
                'search_as' => 'subscribers',
                'keyword' => $search,
            ];

            session(['search_item' => $search_item]);
            return view('frontend.index', $page_data);
        } else {

            $data = session('search_item');
            $search_as = $data['search_as'];
            $keyword = $data['keyword'];

            if ($search_as == 'creator') {
                $search_list = PaidContentCreator::where('title', 'LIKE', "%{$keyword}%")
                    ->skip($request->offset)->take(3)
                    ->orderBy('paid_content_creators.user_id', 'DESC')->get();
                foreach ($search_list as $item) {
                    $item['total_post'] = $this->get_posts($item->user_id)->count();
                }
                $page_data = [
                    'search_as' => 'creator',
                    'search_list' => $search_list,
                    'view_path' => 'frontend.paid_content.load_more',
                ];
                return view('frontend.paid_content.load_more', $page_data);
            } else {
                $search_list = Users::where('name', 'LIKE', "%$keyword%")
                    ->join('paid_content_subscriptions', 'users.id', '=', 'paid_content_subscriptions.subscriber_id')
                    ->select('paid_content_subscriptions.*', 'users.name', 'users.email')
                    ->get();

                $search_list = $search_list->where('status', 1)
                    ->where('creator_id', auth()->user()->id)
                    ->skip($request->offset)->take(3);

                $page_data = [
                    'search_list' => $search_list,
                    'view_path' => 'frontend.paid_content.load_more',
                ];
                return view('frontend.paid_content.load_more', $page_data);
            }
        }
    }

    public function creator_timeline($type)
    {
        // check if fields are empty or not
        $info = PaidContentCreator::where('user_id', auth()->user()->id)->first();
        $required_fields = [
            'title' => $info->title,
            'sub_title' => $info->sub_title,
            'logo' => $info->logo,
            'cover_photo' => $info->cover_photo,
        ];
        foreach ($required_fields as $item) {
            if ($item == '') {
                Session::flash('success_message', 'Please update profile!');
                return redirect()->route('settings');
            }
        }

        if ($type == 'timeline') {
            $post_type = 'timeline_post';
            $privacy = 'all';
        } elseif ($type == 'public_post') {
            $post_type = 'public_post';
            $privacy = 'public';
        } elseif ($type == 'subscriber_post') {
            $post_type = 'subscriber_post';
            $privacy = 'friends';
        }

        // get creator post
        // get_posts(user_id, take, skip_item, post_privacy)
        $posts = $this->get_posts(auth()->user()->id, 5, 0, $privacy);
        $page_data = [
            $post_type => $posts,
            'view_path' => 'frontend.paid_content.creator_timeline',
        ];

        return view('frontend.index', $page_data);
    }

    public function load_timeline_post(Request $request)
    {
        if ($request->id == 'public_post') {
            $privacy = 'public';
        } elseif ($request->id == 'subscriber_post') {
            $privacy = 'friends';
        } else {
            $privacy = 'all';
        }

        $user_id = auth()->user()->id;
        $pick = 3;
        $offset = $request->offset;
        $posts = $this->get_posts($user_id, $pick, $offset, $privacy);

        $page_data = [
            'user_info' => Users::find($this->user),
            'type' => 'paid_content',
            'posts' => $posts,
        ];

        return view('frontend.main_content.posts', $page_data);
    }

    public function subscribers()
    {
        // $subscribers = Users::
        //     join('paid_content_subscriptions', 'users.id', '=', 'paid_content_subscriptions.subscriber_id')
        //     ->select('paid_content_subscriptions.*', 'users.name', 'users.email')
        //     ->get();

        // $subscribers = $subscribers->where('status', 1)->where('creator_id', auth()->user()->id)->take(8);
        // $page_data = [
        //     'subscribers' => $subscribers,
        //     'view_path' => 'frontend.paid_content.creator_timeline',
        // ];
        //return view('frontend.index', $page_data);
        $subscribers = PaidContentSubscription::where('creator_id', auth()->user()->id)
        ->where('status', 1)->orderBy('id', 'DESC')->paginate(10);
        $subscribers = PaidContentSubscription::
            join('users', 'paid_content_subscriptions.subscriber_id', '=', 'users.id')
            ->join('paid_content_packages', 'paid_content_subscriptions.package_id', '=', 'paid_content_packages.id')
            ->select('paid_content_subscriptions.*', 'users.name', 'users.email', 'paid_content_packages.title as package_title', 'paid_content_packages.price as package_price')

            ->where('paid_content_subscriptions.creator_id', auth()->user()->id)
            ->where('paid_content_subscriptions.status', 1)
            ->orderBy('paid_content_subscriptions.id', 'DESC')->paginate(10);

        $page_data = [
            'subscribers' => $subscribers,
             'view_path' => 'frontend.paid_content.creator_timeline',
        ];
        return view('frontend.index', $page_data);
    }







    public function packages()
    {
        $packages = PaidContentPackages::where('user_id', auth()->user()->id)->get();
        $page_data = [
            'packages' => $packages,
            'view_path' => 'frontend.paid_content.creator_timeline',
        ];
        return view('frontend.index', $page_data);
    }

    public function create_package(Request $request)
    {
        if (PaidContentPackages::where('user_id', auth()->user()->id)->count() < 3) {
            // get all data from request and remove 1st element
            $data = $request->toArray();
            $data = array_slice($data, 1);
            $data['user_id'] = auth()->user()->id;

            PaidContentPackages::insert($data);
            Session::flash('success_message', 'Package added.');
        } else {
            Session::flash('success_message', 'Package full.');
        }
        return redirect()->back();
    }

    public function edit_package($id)
    {
        $package = PaidContentPackages::where('id', $id)->first();
        $page_data = [
            'view_path' => 'frontend.paid_content.edit_package_modal',
            'package' => $package,
        ];
        return view('frontend.paid_content.edit_package_modal', $page_data);
    }

    public function update_package(Request $request, $id)
    {
        $data = $request->toArray();
        $data['user_id'] = auth()->user()->id;
        array_shift($data);

        PaidContentPackages::where('id', $id)->update($data);
        Session::flash('success_message', 'Package edited.');
        return redirect()->back();
    }

    public function delete_package($id)
    {
        PaidContentPackages::where('id', $id)->delete($id);
        Session::flash('success_message', 'Package deleted.');
        return redirect()->back();
    }

    public function settings()
    {
        // creator information
        $info = PaidContentCreator::where('user_id', auth()->user()->id)->first();
        $page_data = [
            'view_path' => 'frontend.paid_content.settings',
            'info' => $info,
        ];
        return view('frontend.index', $page_data);
    }

    public function update_settings(Request $request, $id)
    {
        $data = $request->toArray();
        array_splice($data, 0, 2); // remove first two element

        $msg_type = 'success_message';
        $update = $request->update;

        if ($update == 'profile') {
            // new user checker
            if (isset($data['new_user'])) {
                if (isset($data['logo']) && isset($data['cover_photo']) && $data['title'] != '' && $data['sub_title'] != '') {
                    array_shift($data);
                    $data['config_setting'] = 1;
                } else {
                    Session::flash('success_message', 'Please update profile!');
                    return redirect()->back();
                }
            }

            if (isset($request->logo)) {
                $logo = $request->logo;
                $extension = $request->file('logo')->getClientOriginalExtension();
                $img_name = 'logo' . '-' . time() . '.' . $extension;
                $logo->move(public_path('assets/frontend/images'), $img_name);
                $data['logo'] = $img_name;
            }
            if (isset($request->cover_photo)) {
                $cover_photo = $request->cover_photo;
                $extension = $request->file('cover_photo')->getClientOriginalExtension();
                $img_name = 'cover_photo' . '-' . time() . '.' . $extension;
                $cover_photo->move(public_path('assets/frontend/images'), $img_name);
                $data['cover_photo'] = $img_name;
            }

            PaidContentCreator::where('user_id', $id)->update($data);
            if (isset($data['config_setting'])) {
                Session::flash('success_message', "You're creator now.");
                return redirect()->route('creator.timeline', ['type' => 'timeline']);
            }

            // frontend msg preview
            $msg = 'Profile updated.';

        } elseif ($update == 'social') {
            PaidContentCreator::where('user_id', $id)->update(['social_accounts' => $data]);

            // frontend msg preview
            $msg = 'Social accounts updated.';
        }

        Session::flash($msg_type, $msg);
        return redirect()->back();
    }

    public function remove_photo($type)
    {
        $name = PaidContentCreator::where('user_id', auth()->user()->id)->value($type);
        $delete = $this->delete_file($name);

        if ($delete) {
            PaidContentCreator::where('user_id', auth()->user()->id)->update([$type => '']);
            Session::flash('success_message', 'Photo deleted');
        } else {
            Session::flash('success_message', 'Something wrong.');
        }
        return redirect()->route('settings');
    }

    public function request_author(Request $request, $id)
    {
        if (PaidContentCreator::where('user_id', auth()->user()->id)->doesntExist()) {
            $social_media = [
                'instagram' => '',
                'facebook' => '',
                'linkedin' => '',
                'twitter' => '',
                'discord' => '',
            ];
            $accounts = json_encode($social_media);

            $data = [
                'user_id' => $id,
                'title' => $request->title,
                'description' => $request->description,
                'social_accounts' => $accounts,
                'status' => -1,
            ];

            PaidContentCreator::insert($data);
            Session::flash('success_message', get_phrase('Request submitted.'));
            if (auth()->user()->user_role == 'admin') {
                PaidContentCreator::where('user_id', auth()->user()->id)->update(['status', 1]);
                return redirect()->route('creator.timeline', auth()->user()->id);
            }
        } else {
            if (PaidContentCreator::where('user_id', auth()->user()->id)->where('status', 1)->exists()) {
                Session::flash('success_message', get_phrase('You are already a creator.'));
            } else {
                Session::flash('success_message', get_phrase('Request pending.'));
            }
        }
        return redirect()->back();
    }

    public function author_list()
    {
        $authors = PaidContentCreator::orderBy('id', 'desc')->paginate(10);
        $page_data = [
            'authors' => $authors,
            'view_path' => 'paid_content.author_list',
        ];
        return view('backend.index', $page_data);
    }

    public function author_status($id)
    {
        $status = PaidContentCreator::where('user_id', $id)->value('status');
        if ($status > 0) {
            PaidContentCreator::where('user_id', $id)->update(['status' => 0]);
            flash()->addSuccess('Author deactivated.');
        } else {
            PaidContentCreator::where('user_id', $id)->update(['status' => 1]);
            flash()->addSuccess('Author activated.');
        }
        return redirect()->back();
    }

    public function author_delete($id)
    {
        $logo = PaidContentCreator::where('user_id', auth()->user()->id)->value('logo');
        $cover_photo = PaidContentCreator::where('user_id', auth()->user()->id)->value('cover_photo');

        $query = PaidContentCreator::where('user_id', $id)->delete();
        if ($query) {

            // delete user logo and cover pic
            $this->delete_file($cover_photo);
            $this->delete_file($logo);

            flash()->addSuccess('Author deleted.');
        } else {
            flash()->addSuccess('Something went wrong.');
        }
        return redirect()->back();
    }

    public function review_request($id)
    {
        $review = PaidContentCreator::where('user_id', $id)
            ->join('users', 'paid_content_creators.user_id', '=', 'users.id')
            ->select('paid_content_creators.*', 'users.name', 'users.email', )
            ->first();

        $page_data = [
            'review' => $review,
            'view_path' => 'paid_content.review_request',
        ];
        return view('backend.index', $page_data);
    }

    public function payout_report()
    {
        $success_reports = PaidContentPayout::where('status', 1)->latest()->paginate(10);
        $page_data = [
            'type' => 'success',
            'reports' => $success_reports,
            'view_path' => 'paid_content.author_payout',
        ];
        return view('backend.index', $page_data);
    }

    public function pending_report()
    {
        $pending_reports = PaidContentPayout::where('status', 0)->latest()->paginate(10);
        $page_data = [
            'type' => 'pending',
            'reports' => $pending_reports,
            'view_path' => 'paid_content.author_payout',
        ];
        return view('backend.index', $page_data);
    }

    public function delete_payout($id)
    {
        PaidContentPayout::find($id)->delete();
        flash()->addSuccess('Payout request deleted.');
        return redirect()->back();
    }

    public function author_payout($id)
    {
        $payout = PaidContentPayout::where('id', $id)->first();

        if (auth()->user()->user_role == 'admin') {
            $payment_configured = 1;
        } else {
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
        }

        if (!isset($payment_configured)) {
            flash()->addSuccess("User payment not configured.");
            return redirect()->back();
        }

        $payment_details = [
            'items' => [ // package
                [
                    'id' => $id,
                    'title' => get_phrase('Payment for author.'),
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
                'model_name' => 'AuthorPayout',
                'function_name' => 'make_author_payment',
            ],
            'tax' => 0,
            'coupon' => null,
            'payable_amount' => $payout->requested_amount,
            'cancel_url' => route('payout.report'),
            'success_url' => route('payment.success', ''),
           // 'success_url' => route('payout.report'),
        ];

        session(['payment_details' => $payment_details]);
        return redirect()->route('payment');
    }

    public function creator_payout()
    {
        $is_creator = $this->check_creator(auth()->user()->id);

        if ($is_creator) {
            $balance = PaidContentSubscription::where('creator_id', auth()->user()->id)
                ->join('paid_content_packages', 'paid_content_subscriptions.package_id', '=', 'paid_content_packages.id')
                ->select('paid_content_subscriptions.id', 'paid_content_subscriptions.creator_id', 'paid_content_subscriptions.admin_commission', 'paid_content_packages.price')
                ->orderBy('paid_content_subscriptions.id', 'DESC')->get();

            foreach ($balance as $item) {
                $item->price = $item->price - ($item->price * ($item->admin_commission / 100));
            }

            $total_payout = PaidContentPayout::where('user_id', auth()->user()->id)
                ->where('status', 1)->sum('requested_amount');

            $main_balance = $balance->sum('price') - $total_payout;
            session(['main_balance' => $main_balance]);

            $page_data = [
                'section_title' => 'Payouts',
                'link_name' => 'Paid content',
                'head_link' => route('creator.timeline', 'timeline'),
                // 'layout' => 'addons_layout',
                'view_path' => 'frontend.addons.index',
                'main_balance' => $main_balance,
                'total_payout' => $total_payout,
                'content_view' => 'frontend.paid_content.payouts',
            ];

            return view('frontend.index', $page_data);
        } else {
            Session::flash('success_message', 'Not a creator.');
            return redirect()->route('addon.manager');
        }
    }

    public function creator_payout_request(Request $request)
    {
        $is_creator = $this->check_creator(auth()->user()->id);
        if ($is_creator) {
            $old_request = PaidContentPayout::where('user_id', auth()->user()->id)
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
                        'issue_date' => date('Y-m-d H:i:s')
                    ];
                    PaidContentPayout::where('user_id', auth()->user()->id)->insert($data);
                    Session::flash('success_message', 'Request submitted.');
                }
            }
            return redirect()->back();
        } else {
            Session::flash('success_message', 'Not a creator.');
            return redirect()->route('addon.manager');
        }
    }

    public function creator_payout_cancel($id)
    {
        $is_creator = $this->check_creator(auth()->user()->id);
        if ($is_creator) {
            PaidContentPayout::find($id)->delete();
            Session::flash('success_message', 'Request canceled.');
            return redirect()->back();
        } else {
            Session::flash('success_message', 'Not a creator.');
            return redirect()->route('addon.manager');
        }
    }

    public function subscriber_list()
    {
        $is_creator = $this->check_creator(auth()->user()->id);
        if ($is_creator) {
            $subscribers = PaidContentSubscription::where('creator_id', auth()->user()->id)
                ->where('status', 1)->orderBy('id', 'DESC')->paginate(10);

            $subscribers = PaidContentSubscription::
                join('users', 'paid_content_subscriptions.subscriber_id', '=', 'users.id')
                ->join('paid_content_packages', 'paid_content_subscriptions.package_id', '=', 'paid_content_packages.id')
                ->select('paid_content_subscriptions.*', 'users.name', 'users.email', 'paid_content_packages.title as package_title', 'paid_content_packages.price as package_price')

                ->where('paid_content_subscriptions.creator_id', auth()->user()->id)
                ->where('paid_content_subscriptions.status', 1)
                ->orderBy('paid_content_subscriptions.id', 'DESC')->paginate(10);

            $page_data = [
                'section_title' => 'Subscribers',
                'link_name' => 'Paid Content',
                'head_link' => route('creator.timeline', 'timeline'),
                'layout' => 'addons_layout',
                'subscribers' => $subscribers,
                'view_path' => 'frontend.addons.index',
                'content_view' => 'frontend.paid_content.subscriber_list',
            ];
            return view('frontend.index', $page_data);
        } else {
            Session::flash('success_message', 'Not a creator.');
            return redirect()->route('addon.manager');
        }

    }

    public function check_creator($user_id)
    {
        if (PaidContentCreator::where('user_id', $user_id)->exists()) {
            return true;
        } else {
            return false;
        }
    }

    public function user_subscription()
    {
        $valid = PaidContentSubscription::where('subscriber_id', auth()->user()->id)
            ->where('status', 1)->orderBy('id', 'DESC')->paginate(10);
        $expired = PaidContentSubscription::where('subscriber_id', auth()->user()->id)
            ->where('status', 0)->orderBy('id', 'DESC')->paginate(10);

        $page_data = [
            'section_title' => 'Subscription',
            'link_name' => 'Paid Content',
            'head_link' => route('general.timeline'),
            'layout' => 'addons_layout',
            'valid' => $valid,
            'expired' => $expired,
            'view_path' => 'frontend.addons.index',
            'content_view' => 'frontend.paid_content.user_subscription',
        ];
        return view('frontend.index', $page_data);
    }

    public function subscription_payment()
    {
        $payments = DB::table('payment_histories')
            ->where('user_id', auth()->user()->id)
            ->where('item_type', 'subscription')
            ->paginate(10);

        $page_data = [
            'section_title' => 'Payment History',
            'link_name' => 'Paid Content',
            'head_link' => route('general.timeline'),
            'layout' => 'addons_layout',
            'payments' => $payments,
            'view_path' => 'frontend.addons.index',
            'content_view' => 'frontend.paid_content.user_subscription_payments',
        ];
        return view('frontend.index', $page_data);
    }

}
