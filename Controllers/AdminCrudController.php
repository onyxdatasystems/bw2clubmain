<?php

namespace App\Http\Controllers;

use App\Models\{Blog, Blogcategory, Job, JobCategory, JobApply, JobWishlist, JobPackage, Brand, Category, FileUploader, Page, Group, Group_member, Pagecategory, Page_like, Payment_gateway, User, Account_active_request, Setting, Badge};
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Image;
use App\Helpers\ApiResponse; // Import the ApiResponse helper

class AdminCrudController extends Controller
{
    public function __construct()
    {
        // Don't remove it
        session(['admin_login' => 1]);
    }

    // Admin change password
    public function admin_change_password()
    {
        return ApiResponse::success(null, 'Admin change password view retrieved');
    }

    // Admin profile
    public function admin_profile()
    {
        return ApiResponse::success(null, 'Admin profile view retrieved');
    }

    public function admin_profile_update(Request $request)
    {
        $validated = $request->validate([
            'profile_photo' => 'mimes:jpeg,jpg,png,gif|nullable',
        ]);

        $user = auth()->user();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->date_of_birth = $request->dateofbirth;
        $user->profession = $request->profession;
        $user->gender = $request->gender;
        $user->phone = $request->phone;
        $user->address = $request->address;

        if ($request->profile_photo && !empty($request->profile_photo)) {
            $file_name = FileUploader::upload($request->profile_photo, 'public/storage/userimage', 800, null, 200, 200);
            $user->photo = $file_name;
        }

        $user->save();
        return ApiResponse::success(null, 'Profile updated successfully');
    }

    // Dashboard
    public function admin_dashboard()
    {
        $all_category = Pagecategory::all();
        return ApiResponse::success(['all_category' => $all_category], 'Admin dashboard data retrieved');
    }

    // Page category
    public function view_category()
    {
        $all_category = Pagecategory::all();
        return ApiResponse::success(['all_category' => $all_category], 'Page categories retrieved');
    }

    public function create_category()
    {
        return ApiResponse::success(null, 'Create category view retrieved');
    }

    public function save_category(Request $request)
    {
        $validated = $request->validate([
            'pagecategory' => 'required|max:255|string|unique:pagecategories,name',
        ]);

        $pagecategory = new Pagecategory();
        $pagecategory->name = $request->pagecategory;
        $pagecategory->save();

        return ApiResponse::success(null, 'Page category added successfully');
    }

    public function edit_category($id)
    {
        $pagecategory = Pagecategory::find($id);
        if (!$pagecategory) {
            return ApiResponse::error(null, 'Page category not found', 404);
        }

        return ApiResponse::success(['pagecategory' => $pagecategory], 'Edit category view retrieved');
    }

    public function update_category(Request $request, $id)
    {
        $validated = $request->validate([
            'pagecategory' => 'required|max:255|string|unique:pagecategories,name,' . $id,
        ]);

        $pagecategory = Pagecategory::find($id);
        if (!$pagecategory) {
            return ApiResponse::error(null, 'Page category not found', 404);
        }

        $pagecategory->name = $request->pagecategory;
        $pagecategory->save();

        return ApiResponse::success(null, 'Page category updated successfully');
    }

    public function delete_category($id)
    {
        $category = Pagecategory::find($id);
        if (!$category) {
            return ApiResponse::error(null, 'Page category not found', 404);
        }

        $category->delete();
        return ApiResponse::success(null, 'Page category deleted successfully');
    }

    // Product category
    public function view_product_category()
    {
        $all_category = Category::all();
        return ApiResponse::success(['all_category' => $all_category], 'Product categories retrieved');
    }

    public function create_product_category()
    {
        return ApiResponse::success(null, 'Create product category view retrieved');
    }

    public function save_product_category(Request $request)
    {
        $validated = $request->validate([
            'productcategory' => 'required|max:255|string|unique:categories,name',
        ]);

        $productcategory = new Category();
        $productcategory->name = $request->productcategory;
        $productcategory->save();

        return ApiResponse::success(null, 'Product category added successfully');
    }

    public function edit_product_category($id)
    {
        $productcategory = Category::find($id);
        if (!$productcategory) {
            return ApiResponse::error(null, 'Product category not found', 404);
        }

        return ApiResponse::success(['productcategory' => $productcategory], 'Edit product category view retrieved');
    }

    public function update_product_category(Request $request, $id)
    {
        $validated = $request->validate([
            'productcategory' => 'required|max:255|string|unique:categories,name,' . $id,
        ]);

        $productcategory = Category::find($id);
        if (!$productcategory) {
            return ApiResponse::error(null, 'Product category not found', 404);
        }

        $productcategory->name = $request->productcategory;
        $productcategory->save();

        return ApiResponse::success(null, 'Product category updated successfully');
    }

    public function delete_product_category($id)
    {
        $category = Category::find($id);
        if (!$category) {
            return ApiResponse::error(null, 'Product category not found', 404);
        }

        $category->delete();
        return ApiResponse::success(null, 'Product category deleted successfully');
    }

    // Product brand
    public function view_brand_category()
    {
        $brand = Brand::all();
        return ApiResponse::success(['brand' => $brand], 'Product brands retrieved');
    }

    public function create_brand_category()
    {
        return ApiResponse::success(null, 'Create brand category view retrieved');
    }

    public function save_brand_category(Request $request)
    {
        $validated = $request->validate([
            'brand' => 'required|max:255|string|unique:brands,name',
        ]);

        $brand = new Brand();
        $brand->name = $request->brand;
        $brand->save();

        return ApiResponse::success(null, 'Product brand added successfully');
    }

    public function edit_brand_category($id)
    {
        $brand = Brand::find($id);
        if (!$brand) {
            return ApiResponse::error(null, 'Product brand not found', 404);
        }

        return ApiResponse::success(['brand' => $brand], 'Edit brand category view retrieved');
    }

    public function update_brand_category(Request $request, $id)
    {
        $validated = $request->validate([
            'brand' => 'required|max:255|string|unique:brands,name,' . $id,
        ]);

        $brand = Brand::find($id);
        if (!$brand) {
            return ApiResponse::error(null, 'Product brand not found', 404);
        }

        $brand->name = $request->brand;
        $brand->save();

        return ApiResponse::success(null, 'Product brand updated successfully');
    }

    public function delete_brand_category($id)
    {
        $brand = Brand::find($id);
        if (!$brand) {
            return ApiResponse::error(null, 'Product brand not found', 404);
        }

        $brand->delete();
        return ApiResponse::success(null, 'Product brand deleted successfully');
    }

    // Blog category
    public function view_blog_category()
    {
        $all_category = Blogcategory::all();
        return ApiResponse::success(['all_category' => $all_category], 'Blog categories retrieved');
    }

    public function create_blog_category()
    {
        return ApiResponse::success(null, 'Create blog category view retrieved');
    }

    public function save_blog_category(Request $request)
    {
        $validated = $request->validate([
            'blogcategory' => 'required|max:255|string|unique:blogcategories,name',
        ]);

        $blogcategories = new Blogcategory();
        $blogcategories->name = $request->blogcategory;
        $blogcategories->save();

        return ApiResponse::success(null, 'Blog category added successfully');
    }

    public function edit_blog_category($id)
    {
        $blogcategories = Blogcategory::find($id);
        if (!$blogcategories) {
            return ApiResponse::error(null, 'Blog category not found', 404);
        }

        return ApiResponse::success(['blogcategories' => $blogcategories], 'Edit blog category view retrieved');
    }

    public function update_blog_category(Request $request, $id)
    {
        $validated = $request->validate([
            'blogcategory' => 'required|max:255|string|unique:blogcategories,name,' . $id,
        ]);

        $blogcategories = Blogcategory::find($id);
        if (!$blogcategories) {
            return ApiResponse::error(null, 'Blog category not found', 404);
        }

        $blogcategories->name = $request->blogcategory;
        $blogcategories->save();

        return ApiResponse::success(null, 'Blog category updated successfully');
    }

    public function delete_blog_category($id)
    {
        $blogcategories = Blogcategory::find($id);
        if (!$blogcategories) {
            return ApiResponse::error(null, 'Blog category not found', 404);
        }

        $blogcategories->delete();
        return ApiResponse::success(null, 'Blog category deleted successfully');
    }

    public function about()
    {
        $purchase_code = get_settings('purchase_code');
        $returnable_array = [
            'purchase_code_status' => 'valid',
            'support_expiry_date' => '10.10.2040',
            'customer_name' => 'valid',
            'product_license' => 'valid',
            'license_type' => 'Regular',
        ];

        return ApiResponse::success(['application_details' => $returnable_array], 'About page data retrieved');
    }

    public function curl_request($code = '')
    {
        $purchase_code = $code;
        $personal_token = "FkA9UyDiQT0YiKwYLK3ghyFNRVV9SeUn";
        $url = "https://api.envato.com/v3/market/author/sale?code=" . $purchase_code;
        $curl = curl_init($url);

        $bearer = 'bearer ' . $personal_token;
        $header = [
            'Content-length: 0',
            'Content-type: application/json; charset=utf-8',
            'Authorization: ' . $bearer,
        ];

        $verify_url = 'https://api.envato.com/v1/market/private/user/verify-purchase:' . $purchase_code . '.json';
        $ch_verify = curl_init($verify_url . '?code=' . $purchase_code);

        curl_setopt($ch_verify, CURLOPT_HTTPHEADER, $header);
        curl_setopt($ch_verify, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch_verify, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch_verify, CURLOPT_CONNECTTIMEOUT, 5);
        curl_setopt($ch_verify, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13');

        $cinit_verify_data = curl_exec($ch_verify);
        curl_close($ch_verify);

        $response = json_decode($cinit_verify_data, true);

        if (is_array($response) && count($response['verify-purchase']) > 0) {
            return ApiResponse::success(null, 'Purchase code is valid');
        } else {
            return ApiResponse::error(null, 'Purchase code is invalid', 400);
        }
    }

    // Don't remove this code for security reasons
    public function save_valid_purchase_code($action_type, Request $request)
    {
        if ($action_type == 'update') {
            $data['description'] = $request->purchase_code;

            Setting::where('type', 'purchase_code')->update($data);
            return ApiResponse::success(null, "Purchase code updated successfully", 200);
        } else {
            return ApiResponse::success([], "Purchase code form data", 200);
        }
    }

    // Groups
    public function groups()
    {
        $groups = Group::all();
        return ApiResponse::success($groups, "Groups fetched successfully", 200);
    }

    public function deleteGroup($id, Request $request)
    {
        $group = Group::find($id);
        if (!$group) {
            return ApiResponse::error(null, "Group not found", 404);
        }

        $group->delete();
        Group_member::where('group_id', $id)->delete();

        return ApiResponse::success(null, "Group deleted successfully", 200);
    }

    public function group_create()
    {
        return ApiResponse::success([], "Group creation form data", 200);
    }

    public function group_created(Request $request)
    {
        $request->validate([
            'logo' => 'mimes:jpeg,jpg,png,gif|nullable',
            'title' => 'required|max:255',
            'subtitle' => 'required',
            'status' => 'required',
        ]);

        $logo_file_name = null;
        if ($request->logo && !empty($request->logo)) {
            $logo_file_name = FileUploader::upload($request->logo, 'public/storage/groups/logo', 250);
        }

        $group = new Group();
        $group->user_id = auth()->user()->id;
        $group->title = $request->title;
        $group->subtitle = $request->subtitle;
        $group->status = $request->status;
        $group->about = $request->about;
        $group->privacy = $request->privacy;
        $group->logo = $logo_file_name;
        $group->save();

        $group_member = new Group_member();
        $group_member->group_id = $group->id;
        $group_member->user_id = auth()->user()->id;
        $group_member->role = 'admin';
        $group_member->is_accepted = '1';
        $group_member->save();

        return ApiResponse::success($group, "Group created successfully", 201);
    }

    public function group_edit($id)
    {
        $group = Group::find($id);
        if (!$group) {
            return ApiResponse::error(null, "Group not found", 404);
        }

        return ApiResponse::success($group, "Group data fetched successfully", 200);
    }

    public function group_updated($id, Request $request)
    {
        $request->validate([
            'logo' => 'mimes:jpeg,jpg,png,gif|nullable',
            'title' => 'required|max:255',
        ]);

        $group = Group::find($id);
        if (!$group) {
            return ApiResponse::error(null, "Group not found", 404);
        }

        $logo_file_name = $group->logo;
        if ($request->logo && !empty($request->logo)) {
            $logo_file_name = FileUploader::upload($request->logo, 'public/storage/groups/logo', 250);
        }

        $group->title = $request->title;
        $group->subtitle = $request->subtitle;
        $group->status = $request->status;
        $group->privacy = $request->privacy;
        $group->about = $request->about;
        $group->logo = $logo_file_name;
        $group->save();

        return ApiResponse::success($group, "Group updated successfully", 200);
    }

    // Pages
    public function pages()
    {
        if (isset($_GET['delete']) && $_GET['delete'] == 'yes' && isset($_GET['id'])) {
            Page::find($_GET['id'])->delete();
            return ApiResponse::success(null, "Page deleted successfully", 200);
        }

        $pages = Page::get();
        return ApiResponse::success($pages, "Pages fetched successfully", 200);
    }

    public function page_create()
    {
        return ApiResponse::success([], "Page creation form data", 200);
    }

    public function page_edit($id)
    {
        $page = Page::find($id);
        if (!$page) {
            return ApiResponse::error(null, "Page not found", 404);
        }

        return ApiResponse::success($page, "Page data fetched successfully", 200);
    }

    public function page_created(Request $request)
    {
        if ($request->category == 'Select a category') {
            return ApiResponse::error(null, "Please select a category", 400);
        }

        $request->validate([
            'logo' => 'mimes:jpeg,jpg,png,gif|nullable',
            'coverphoto' => 'mimes:jpeg,jpg,png,gif|nullable',
            'title' => 'required|max:255',
            'category' => 'required',
        ]);

        $logo_file_name = null;
        if ($request->logo && !empty($request->logo)) {
            $logo_file_name = FileUploader::upload($request->logo, 'public/storage/pages/logo', 250);
        }

        $coverphoto_file_name = null;
        if ($request->coverphoto && !empty($request->coverphoto)) {
            $coverphoto_file_name = FileUploader::upload($request->coverphoto, 'public/storage/pages/coverphoto', 250);
        }

        $page = new Page();
        $page->user_id = auth()->user()->id;
        $page->title = $request->title;
        $page->category_id = $request->category;
        $page->description = $request->description;
        $page->logo = $logo_file_name;
        $page->coverphoto = $coverphoto_file_name;
        $page->save();

        return ApiResponse::success($page, "Page created successfully", 201);
    }

    public function page_updated($id, Request $request)
    {
        if ($request->category == 'Select a category') {
            return ApiResponse::error(null, "Please select a category", 400);
        }

        $request->validate([
            'logo' => 'mimes:jpeg,jpg,png,gif|nullable',
            'coverphoto' => 'mimes:jpeg,jpg,png,gif|nullable',
            'title' => 'required|max:255',
            'category' => 'required',
        ]);

        $page = Page::find($id);
        if (!$page) {
            return ApiResponse::error(null, "Page not found", 404);
        }

        if ($request->logo && !empty($request->logo)) {
            $page->logo = FileUploader::upload($request->logo, 'public/storage/pages/logo', 250);
        }

        if ($request->coverphoto && !empty($request->coverphoto)) {
            $page->coverphoto = FileUploader::upload($request->coverphoto, 'public/storage/pages/coverphoto', 250);
        }

        $page->title = $request->title;
        $page->category_id = $request->category;
        $page->description = $request->description;
        $page->save();

        return ApiResponse::success($page, "Page updated successfully", 200);
    }

    // Blogs
    public function blogs()
    {
        if (isset($_GET['delete']) && $_GET['delete'] == 'yes' && isset($_GET['id'])) {
            Blog::find($_GET['id'])->delete();
            return ApiResponse::success(null, "Blog deleted successfully", 200);
        }

        $blogs = Blog::get();
        return ApiResponse::success($blogs, "Blogs fetched successfully", 200);
    }

    public function blog_create()
    {
        return ApiResponse::success([], "Blog creation form data", 200);
    }

    public function blog_edit($id)
    {
        $blog = Blog::find($id);
        if (!$blog) {
            return ApiResponse::error(null, "Blog not found", 404);
        }

        return ApiResponse::success($blog, "Blog data fetched successfully", 200);
    }

    public function blog_created(Request $request)
    {
        if ($request->category == 'Select a category') {
            return ApiResponse::error([], "Please select a category", 400);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|max:255',
            'category' => 'required',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), "Validation failed", 422);
        }

        if ($request->image && !empty($request->image)) {
            $file_name = FileUploader::upload($request->image, 'public/storage/blog/thumbnail', 370);
            FileUploader::upload($request->image, 'public/storage/blog/coverphoto/' . $file_name, 900);
        }

        $data = [
            'user_id' => Auth()->user()->id,
            'title' => $request->title,
            'category_id' => $request->category,
            'created_at' => now(),
            'updated_at' => now(),
            'tag' => json_encode(array_map(function ($tag) {
                return $tag['value'];
            }, json_decode($request->tag, true) ?? [])),
            'description' => $request->description,
            'thumbnail' => $file_name ?? null,
            'view' => json_encode([]),
        ];

        DB::table('blogs')->insert($data);

        return ApiResponse::success([], "Blog created successfully");
    }

    public function blog_updated(Request $request, $id)
    {
        if ($request->category == 'Select a category') {
            return ApiResponse::error([], "Please select a category", 400);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|max:255',
            'category' => 'required',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), "Validation failed", 422);
        }

        $blog = Blog::find($id);

        if (!$blog) {
            return ApiResponse::error([], "Blog not found", 404);
        }

        if ($request->image && !empty($request->image)) {
            $file_name = FileUploader::upload($request->image, 'public/storage/blog/thumbnail', 370);
            FileUploader::upload($request->image, 'public/storage/blog/coverphoto/' . $file_name, 900);
            $blog->thumbnail = $file_name;
        }

        $blog->title = $request->title;
        $blog->category_id = $request->category;
        $blog->tag = json_encode(array_map(function ($tag) {
            return $tag['value'];
        }, json_decode($request->tag, true) ?? []));
        $blog->description = $request->description;
        $blog->save();

        return ApiResponse::success([], "Blog updated successfully");
    }

    public function Badge()
    {
        $badges = Badge::get();
        $badge_price = Setting::where('type', 'badge_price')->value('description');

        return ApiResponse::success([
            'badges' => $badges,
            'badge_price' => $badge_price,
        ], "Badge data retrieved successfully");
    }

    public function delete_badge_history($id)
    {
        $badge = Badge::find($id);

        if (!$badge) {
            return ApiResponse::error([], "Badge not found", 404);
        }

        $badge->delete();

        return ApiResponse::success([], "Badge deleted successfully");
    }

    public function badge_settings_save(Request $request)
    {
        Setting::where('type', 'badge_price')->update(['description' => $request->badge_price]);

        return ApiResponse::success([], "Badge price updated successfully");
    }

    public function view_job_category()
    {
        $all_category = JobCategory::all();

        return ApiResponse::success([
            'all_category' => $all_category,
        ], "Job categories retrieved successfully");
    }

    public function create_job_category()
    {
        return ApiResponse::success([], "Job category creation form retrieved successfully");
    }

    public function save_job_category(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'jobcategory' => 'required|max:255|string|unique:job_categories,name',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), "Validation failed", 422);
        }

        $jobcategories = new JobCategory();
        $jobcategories->name = $request->jobcategory;
        $jobcategories->save();

        return ApiResponse::success([], "Job category added successfully");
    }

    public function edit_job_category($id)
    {
        $jobcategories = JobCategory::find($id);

        if (!$jobcategories) {
            return ApiResponse::error([], "Job category not found", 404);
        }

        return ApiResponse::success([
            'jobcategories' => $jobcategories,
        ], "Job category edit form retrieved successfully");
    }

    public function update_job_category(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'jobcategory' => 'required|max:255|string|unique:job_categories,name,' . $id,
        ]);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), "Validation failed", 422);
        }

        $jobcategories = JobCategory::find($id);

        if (!$jobcategories) {
            return ApiResponse::error([], "Job category not found", 404);
        }

        $jobcategories->name = $request->jobcategory;
        $jobcategories->save();

        return ApiResponse::success([], "Job category updated successfully");
    }

    public function delete_job_category($id)
    {
        $jobcategories = JobCategory::find($id);

        if (!$jobcategories) {
            return ApiResponse::error([], "Job category not found", 404);
        }

        $jobcategories->delete();

        return ApiResponse::success([], "Job category deleted successfully");
    }

    public function jobs()
    {
        $jobs = Job::where('status', '1')->orderBy('id', 'DESC')->get();

        return ApiResponse::success([
            'jobs' => $jobs,
        ], "Jobs retrieved successfully");
    }

    public function job_create()
    {
        return ApiResponse::success([], "Job creation form retrieved successfully");
    }

    public function job_created(Request $request)
    {
        if ($request->category == 'Select a category') {
            return ApiResponse::error([], "Please select a category", 400);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|max:255',
            'category' => 'required',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), "Validation failed", 422);
        }

        if ($request->image && !empty($request->image)) {
            $file_name = FileUploader::upload($request->image, 'public/storage/job/thumbnail', 370);
        }

        $data = [
            'user_id' => Auth()->user()->id,
            'title' => $request->title,
            'category_id' => $request->category,
            'starting_salary_range' => $request->starting_salary_range,
            'ending_salary_range' => $request->ending_salary_range,
            'company' => $request->company,
            'type' => $request->type,
            'location' => $request->location,
            'created_at' => now(),
            'updated_at' => now(),
            'description' => $request->description,
            'status' => $request->status,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'is_published' => $request->is_published ?? 0,
            'thumbnail' => $file_name ?? null,
        ];

        DB::table('jobs')->insert($data);

        return ApiResponse::success([], "Job created successfully");
    }

    public function job_edit($id = "")
    {
        $job_details = Job::find($id);

        if (!$job_details) {
            return ApiResponse::error([], "Job not found", 404);
        }

        return ApiResponse::success([
            'job_details' => $job_details,
        ], "Job edit form retrieved successfully");
    }

    public function job_updated(Request $request, $id)
    {
        if ($request->category == 'Select a category') {
            return ApiResponse::error([], "Please select a category", 400);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|max:255',
            'category' => 'required',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), "Validation failed", 422);
        }

        $job = Job::find($id);

        if (!$job) {
            return ApiResponse::error([], "Job not found", 404);
        }

        if ($request->image) {
            $file_name = FileUploader::upload($request->image, 'public/storage/job/thumbnail', 370);
            $job->thumbnail = $file_name;
        }

        $job->title = $request->title;
        $job->category_id = $request->category;
        $job->company = $request->company;
        $job->starting_salary_range = $request->starting_salary_range;
        $job->ending_salary_range = $request->ending_salary_range;
        $job->type = $request->type;
        $job->location = $request->location;
        $job->status = $request->status;
        $job->start_date = $request->start_date;
        $job->end_date = $request->end_date;
        $job->is_published = $request->has('is_published') ? 1 : 0;
        $job->description = $request->description;
        $job->save();

        return ApiResponse::success([], "Job updated successfully");
    }

    public function delete_job($id)
    {
        $job = Job::find($id);
        if (!$job) {
            return ApiResponse::error(null, 'Job not found', 404);
        }

        DB::table('payment_histories')->where('item_id', $job->id)->delete();
        JobWishlist::where('job_id', $job->id)->delete();
        JobApply::where('job_id', $job->id)->delete();

        $thumbnailPathName = 'public/storage/job/thumbnail/' . $job->thumbnail;
        if (file_exists($thumbnailPathName)) {
            unlink($thumbnailPathName);
        }

        $job->delete();
        return ApiResponse::success(null, 'Job deleted successfully');
    }

    public function pending_job()
    {
        $pending_job = Job::where('status', '0')->orderBy('id', 'DESC')->get();
        return ApiResponse::success(['pending_job' => $pending_job], 'Pending jobs retrieved successfully');
    }

    public function AllApplyList()
    {
        $all_list = JobApply::where('owner_id', auth()->user()->id)->get();
        return ApiResponse::success(['all_list' => $all_list], 'Job apply list retrieved successfully');
    }

    public function applyListDelete($id)
    {
        $job = JobApply::find($id);
        if (!$job) {
            return ApiResponse::error(null, 'Job application not found', 404);
        }

        $thumbnailPathName = 'public/storage/job/cv/' . $job->attachment;
        if (file_exists($thumbnailPathName)) {
            unlink($thumbnailPathName);
        }

        $job->delete();
        return ApiResponse::success(null, 'Job application deleted successfully');
    }

    public function downloadPdf($id)
    {
        $job = JobApply::find($id);
        if (!$job) {
            return ApiResponse::error(null, 'Job application not found', 404);
        }

        $filePath = public_path('storage/job/cv/' . $job->attachment);
        if (!file_exists($filePath)) {
            return ApiResponse::error(null, 'File not found', 404);
        }

        return response()->download($filePath);
    }

    public function jobPaymentHistory()
    {
        $job_history = DB::table('payment_histories')->where('item_type', 'job')->get();
        return ApiResponse::success(['job_history' => $job_history], 'Job payment history retrieved successfully');
    }

    public function jobDeleteHistory($id)
    {
        $paymentHistory = DB::table('payment_histories')->where('id', $id)->delete();
        return ApiResponse::success(null, 'Job payment history deleted successfully');
    }

    public function settings_view()
    {
        $job_price = Setting::where('type', 'job_price')->value('description');
        $day = Setting::where('type', 'day')->value('description');
        return ApiResponse::success(['job_price' => $job_price, 'day' => $day], 'Job settings retrieved successfully');
    }

    public function settings_save(Request $request)
    {
        Setting::where('type', 'job_price')->update(['description' => $request->job_price]);
        Setting::where('type', 'day')->update(['description' => $request->day]);
        return ApiResponse::success(null, 'Job settings updated successfully');
    }

    public function users()
    {
        $users = User::where('user_role', '!=', 'admin')->get();
        return ApiResponse::success(['users' => $users], 'Users retrieved successfully');
    }

    public function user_add()
    {
        return ApiResponse::success(null, 'User add view retrieved');
    }

    public function user_store(Request $request)
    {
        $validated = $request->validate([
            'email' => ['required', 'email', Rule::unique('users')],
            'name' => 'required|max:255',
            'gender' => 'required',
            'date_of_birth' => 'required',
        ]);

        $data = [
            'user_role' => 'general',
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'address' => $request->address,
            'date_of_birth' => strtotime($request->date_of_birth),
            'about' => $request->bio,
            'friends' => '[]',
            'followers' => '[]',
            'gender' => $request->gender,
            'status' => 1,
            'created_at' => now(),
        ];

        if ($request->photo && !empty($request->photo)) {
            $file_name = FileUploader::upload($request->file('photo'), 'public/storage/userimage', 800);
            $data['photo'] = $file_name;
        }

        $user_insert = User::create($data);
        $user_insert->markEmailAsVerified();
        return ApiResponse::success(null, 'User added successfully');
    }

    public function user_edit($id)
    {
        $user_data = User::find($id);
        if (!$user_data) {
            return ApiResponse::error(null, 'User not found', 404);
        }

        return ApiResponse::success(['user_data' => $user_data], 'User edit view retrieved');
    }

    public function user_update($id, Request $request)
    {
        $validated = $request->validate([
            'email' => ['required', 'email', Rule::unique('users')->ignore($id)],
            'name' => 'required|max:255',
            'gender' => 'required',
            'date_of_birth' => 'required',
        ]);

        $data = [
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'date_of_birth' => strtotime($request->date_of_birth),
            'about' => $request->bio,
            'gender' => $request->gender,
            'updated_at' => now(),
        ];

        if ($request->photo && !empty($request->photo)) {
            $file_name = FileUploader::upload($request->photo, 'public/storage/userimage', 800);

            $previous_image = public_path() . '/storage/userimage/optimized/' . User::where('id', $id)->value('photo');
            $previous_image2 = public_path() . '/storage/userimage/' . User::where('id', $id)->value('photo');
            if (file_exists($previous_image) && is_file($previous_image)) {
                unlink($previous_image);
                unlink($previous_image2);
            }

            $data['photo'] = $file_name;
        }

        User::where('id', $id)->update($data);
        return ApiResponse::success(null, 'User updated successfully');
    }

    public function user_delete($user_id)
    {
        $user = User::find($user_id);
        if (!$user) {
            return ApiResponse::error(null, 'User not found', 404);
        }

        $user->delete();
        return ApiResponse::success(null, 'User deleted successfully');
    }

    public function user_status($user_id)
    {
        $user = User::find($user_id);
        if (!$user) {
            return ApiResponse::error(null, 'User not found', 404);
        }

        $user->status = $user->status == 1 ? 0 : 1;
        $user->save();
        return ApiResponse::success(null, 'User status updated successfully');
    }

    public function payment_settings()
    {
        $payment_gateways = Payment_gateway::get();
        return ApiResponse::success(['payment_gateways' => $payment_gateways], 'Payment settings retrieved successfully');
    }

    public function payment_gateway_edit($id)
    {
        $payment_gateway = Payment_gateway::where('id', $id)->first();
        if (!$payment_gateway) {
            return ApiResponse::error(null, 'Payment gateway not found', 404);
        }

        $currencies = DB::table('currencies')->get();
        return ApiResponse::success(['payment_gateway' => $payment_gateway, 'currencies' => $currencies], 'Payment gateway edit view retrieved');
    }

    public function payment_gateway_update($id, Request $request)
    {
        $keys = array();
        $all_data = $request->all();
        $data['currency'] = $request->currency;

        unset($all_data['_token']);
        unset($all_data['currency']);
        $data['keys'] = json_encode($all_data);

        Payment_gateway::find($id)->update($data);
        return ApiResponse::success(null, 'Payment gateway updated successfully');
    }

    public function payment_gateway_status($id)
    {
        $payment_gateway = Payment_gateway::find($id);
        if (!$payment_gateway) {
            return ApiResponse::error(null, 'Payment gateway not found', 404);
        }

        $payment_gateway->status = $payment_gateway->status == 1 ? 0 : 1;
        $payment_gateway->save();
        return ApiResponse::success(null, 'Payment gateway status updated successfully');
    }

    public function payment_gateway_environment($id)
    {
        $payment_gateway = Payment_gateway::find($id);
        if (!$payment_gateway) {
            return ApiResponse::error(null, 'Payment gateway not found', 404);
        }

        $payment_gateway->test_mode = $payment_gateway->test_mode == 1 ? 0 : 1;
        $payment_gateway->save();
        return ApiResponse::success(null, 'Payment gateway environment updated successfully');
    }

    public function accountActiveReq()
    {
        $request_users = Account_active_request::with('user')->orderBy('created_at', 'DESC')->paginate(10);
        return ApiResponse::success(['request_users' => $request_users], 'Account active requests retrieved successfully');
    }

    public function acActiveReqApp($id, $user_id)
    {
        $accountRequest = Account_active_request::find($id);
        $user = User::find($user_id);

        if (!$accountRequest || !$user) {
            return ApiResponse::error(null, 'Account request or user not found', 404);
        }

        $user->update(['status' => 1]);
        $accountRequest->delete();
        return ApiResponse::success(null, 'Account enable request approved successfully');
    }

    public function acActiveReDlt($id)
    {
        $accountRequest = Account_active_request::find($id);
        if (!$accountRequest) {
            return ApiResponse::error(null, 'Account request not found', 404);
        }

        $accountRequest->delete();
        return ApiResponse::success(null, 'Account enable request deleted successfully');
    }

}