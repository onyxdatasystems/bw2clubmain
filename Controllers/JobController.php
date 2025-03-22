<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\JobCategory;
use App\Models\FileUploader;
use App\Models\JobWishlist;
use App\Models\JobApply;
use App\Helpers\ApiResponse; 
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use DB;
use Illuminate\Support\Facades\Validator;
use Image, Session, Share;

class JobController extends Controller
{
    // Get all jobs (API)
    public function jobs()
    {
        $currentDate = Carbon::now();

        $jobs = Job::where('is_published', 1)
            ->where('status', 1)
            ->whereDate('start_date', '<=', $currentDate)
            ->whereDate('end_date', '>=', $currentDate)
            ->orderBy('id', 'DESC')
            ->paginate(6);

        return ApiResponse::success($jobs, 'Jobs retrieved successfully');
    }

    // Create job form (API)
    public function job_create()
    {
        $job_categories = JobCategory::all();
        return ApiResponse::success($job_categories, 'Job categories retrieved successfully');
    }

    // Store a new job (API)
    public function job_store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|max:255',
            'category' => 'required',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), 'Validation failed', 422);
        }

        if ($request->image && !empty($request->image)) {
            $file_name = FileUploader::upload($request->image, 'public/storage/job/thumbnail', 370);
        }

        $job = new Job();
        $job->user_id = Auth::user()->id;
        $job->title = $request->title;
        $job->category_id = $request->category;
        $job->company = $request->company;
        $job->starting_salary_range = $request->starting_salary_range;
        $job->ending_salary_range = $request->ending_salary_range;
        $job->type = $request->type;
        $job->status = 0;
        $job->is_published = 0;
        $job->location = $request->location;
        $job->description = $request->description;
        if ($request->image && !empty($request->image)) {
            $job->thumbnail = $file_name;
        }
        $job->save();

        return ApiResponse::success($job, 'Job created successfully', 201);
    }

    // Get job payment form (API)
    public function job_pay_form($jobId)
    {
        $job = Job::find($jobId);
        if (!$job) {
            return ApiResponse::error(null, 'Job not found', 404);
        }

        return ApiResponse::success($job, 'Job payment form retrieved successfully');
    }

    // Get user's jobs (API)
    public function myjob()
    {
        $jobs = Job::where('user_id', auth()->user()->id)->orderBy('id', 'DESC')->get();
        return ApiResponse::success($jobs, 'User jobs retrieved successfully');
    }

    // Edit job (API)
    public function job_edit($id)
    {
        $job_details = Job::find($id);
        if (!$job_details) {
            return ApiResponse::error(null, 'Job not found', 404);
        }

        return ApiResponse::success($job_details, 'Job details retrieved successfully');
    }

    // Update job (API)
    public function job_update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|max:255',
            'category' => 'required',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), 'Validation failed', 422);
        }

        $job = Job::find($id);
        if (!$job) {
            return ApiResponse::error(null, 'Job not found', 404);
        }

        if ($request->image) {
            $random_name = rand();
            $new_thumbnail = $random_name . '.' . $request->image->getClientOriginalExtension();
            $request->image->move(public_path('storage/job/thumbnail/'), $new_thumbnail);

            if (!empty($request->old_image) && file_exists(public_path('storage/job/thumbnail/' . $request->old_image))) {
                unlink(public_path('storage/job/thumbnail/' . $request->old_image));
            }
        } else {
            $new_thumbnail = $request->old_image;
        }

        $job->thumbnail = $new_thumbnail;
        $job->title = $request->title;
        $job->category_id = $request->category;
        $job->company = $request->company;
        $job->starting_salary_range = $request->starting_salary_range;
        $job->ending_salary_range = $request->ending_salary_range;
        $job->type = $request->type;
        $job->location = $request->location;
        $job->description = $request->description;
        $job->save();

        return ApiResponse::success($job, 'Job updated successfully');
    }

    // Delete job (API)
    public function job_delete($job_id)
    {
        $job = Job::find($job_id);
        if (!$job) {
            return ApiResponse::error(null, 'Job not found', 404);
        }

        $thumbnailPathName = public_path('storage/job/thumbnail/') . $job->thumbnail;
        if (file_exists($thumbnailPathName)) {
            unlink($thumbnailPathName);
        }

        $job->delete();

        return ApiResponse::success(null, 'Job deleted successfully');
    }

    // Follow/unfollow job (API)
    public function job_follow($id, $user_id)
    {
        $wishlist = JobWishlist::where('user_id', $user_id)->where('job_id', $id)->first();
        if ($wishlist) {
            JobWishlist::where('user_id', $user_id)->where('job_id', $id)->delete();
            return ApiResponse::success(null, 'Job unfollowed successfully');
        } else {
            JobWishlist::insert([
                'user_id' => $user_id,
                'job_id' => $id,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
            return ApiResponse::success(null, 'Job followed successfully');
        }
    }

    // Get saved jobs (API)
    public function job_save()
    {
        $job_save = JobWishlist::where('user_id', auth()->user()->id)->get();
        return ApiResponse::success($job_save, 'Saved jobs retrieved successfully');
    }

    // Search jobs (API)
    public function search_job()
    {
        $currentDate = Carbon::now();
        $search = request('search');
        $searchjob = Job::where('title', 'like', '%' . $search . '%')
            ->where('status', '1')
            ->where('is_published', '1')
            ->whereDate('start_date', '<=', $currentDate)
            ->whereDate('end_date', '>=', $currentDate)
            ->get();

        return ApiResponse::success($searchjob, 'Search results retrieved successfully');
    }

    // Get single job details (API)
    public function single_job_details($id)
    {
        $currentDate = Carbon::now();
        $job_details = Job::find($id);
        if (!$job_details) {
            return ApiResponse::error(null, 'Job not found', 404);
        }

        $related_jobs = Job::where('category_id', $job_details->category_id)
            ->where('id', '!=', $id)
            ->where('status', '1')
            ->where('is_published', '1')
            ->whereDate('start_date', '<=', $currentDate)
            ->whereDate('end_date', '>=', $currentDate)
            ->get();

        $applicants = JobApply::where('job_id', $job_details->id)->get();

        $data = [
            'job_details' => $job_details,
            'related_jobs' => $related_jobs,
            'applicants' => $applicants,
        ];

        return ApiResponse::success($data, 'Job details retrieved successfully');
    }

    // Apply for a job (API)
    public function JobApply(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'phone' => 'required',
            'image' => 'file|mimes:pdf|max:10240',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), 'Validation failed', 422);
        }

        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $file = $request->file('image');
            $file_extension = $file->getClientOriginalExtension();
            $file_name = Str::random(40) . '.' . $file_extension;
            move_uploaded_file($file->getPathname(), 'public/storage/job/cv/' . $file_name);
        }

        $owner_id = Job::where('id', $id)->first()->user_id;

        $apply = new JobApply();
        $apply->job_id = $request->id;
        $apply->owner_id = $owner_id;
        $apply->user_id = Auth::user()->id;
        $apply->email = $request->email;
        $apply->phone = $request->phone;
        if ($request->image && !empty($request->image)) {
            $apply->attachment = $file_name;
        }
        $apply->save();

        return ApiResponse::success($apply, 'Job applied successfully', 201);
    }

    // Get user's applied jobs (API)
    public function MyApply()
    {
        $apply_list = JobApply::where('user_id', auth()->user()->id)->get();
        return ApiResponse::success($apply_list, 'Applied jobs retrieved successfully');
    }

    // Get all applicants for user's jobs (API)
    public function AllApplyList()
    {
        $all_list = JobApply::where('owner_id', auth()->user()->id)->get();
        return ApiResponse::success($all_list, 'All applicants retrieved successfully');
    }

    // Delete an application (API)
    public function applyListDelete($id)
    {
        $job = JobApply::find($id);
        if (!$job) {
            return ApiResponse::error(null, 'Application not found', 404);
        }

        $thumbnailPathName = 'public/storage/job/cv/' . $job->attachment;
        if (file_exists($thumbnailPathName)) {
            unlink($thumbnailPathName);
        }

        $job->delete();

        return ApiResponse::success(null, 'Application deleted successfully');
    }

    // Download applicant's CV (API)
    public function downloadPdf($id)
    {
        $job = JobApply::find($id);
        if (!$job) {
            return ApiResponse::error(null, 'Application not found', 404);
        }

        $filePath = public_path('storage/job/cv/' . $job->attachment);
        if (!file_exists($filePath)) {
            return ApiResponse::error(null, 'File not found', 404);
        }

        return response()->download($filePath);
    }

    // Payment configuration (API)
    public function payment_configuration($id, Request $request)
    {
        $validator = Validator::make($request->all(), [
            'end_date' => 'required',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), 'Validation failed', 422);
        }

        $job = Job::find($id);
        if (!$job) {
            return ApiResponse::error(null, 'Job not found', 404);
        }

        $job_pay = get_settings('job_price');
        $start_timestamp = strtotime($request->start_date . ' ' . date('H:i:s'));
        $end_timestamp = strtotime($request->end_date . ' ' . date('H:i:s'));

        $payment_details = [
            'items' => [
                [
                    'id' => $id,
                    'title' => $job->title,
                    'subtitle' => $job->company,
                    'price' => $job_pay,
                    'discount_price' => 0,
                    'discount_percentage' => 0,
                ]
            ],
            'custom_field' => [
                'start_date' => date('Y-m-d H:i:s', $start_timestamp),
                'end_date' => date('Y-m-d H:i:s', $end_timestamp),
                'user_id' => auth()->user()->id,
            ],
            'success_method' => [
                'model_name' => 'Job',
                'function_name' => 'add_payment_success',
            ],
            'tax' => 0,
            'coupon' => null,
            'payable_amount' => $job_pay,
            'cancel_url' => route('job.myjob'),
            'success_url' => route('payment.success', ''),
        ];

        session(['payment_details' => $payment_details]);

        return ApiResponse::success($payment_details, 'Payment configuration retrieved successfully');
    }

    // Get user's payment history (API)
    public function job_payment_history()
    {
        $payment_history = Job::where('user_id', auth()->user()->id)->get();
        return ApiResponse::success($payment_history, 'Payment history retrieved successfully');
    }
}