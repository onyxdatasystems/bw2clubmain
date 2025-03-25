<?php

namespace App\Http\Controllers;
use App\Models\Job;
use App\Models\JobCategory;
use App\Models\FileUploader;
use App\Models\JobWishlist;
use App\Models\JobApply;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use DB;
use Illuminate\Support\Facades\Validator;
use Image, Session,Share;


class JobController extends Controller
{
    // Frontend View 
    public function jobs() {
        $currentDate = Carbon::now();
    
        $jobs = Job::where('is_published', 1)
            ->where('status', 1)
            ->whereDate('start_date', '<=', $currentDate)
            ->whereDate('end_date', '>=', $currentDate)
            ->orderBy('id', 'DESC')
            ->paginate(6);
    
        $page_data = [
            'jobs' => $jobs,
            // 'layout' => 'jobs',
            'view_path' => 'frontend.jobs.index',
            'section' => 'frontend.jobs.jobs',
        ];
    
        return view('frontend.index', $page_data);
    }

    public function job_create(){
        $job_catagory = JobCategory::all();
        $page_data = [
            'job_catagory' => $job_catagory,
            // 'layout' => 'jobs',
            'view_path' => 'frontend.jobs.index',
            'section' => 'frontend.jobs.job_create',
        ];
        return view('frontend.index', $page_data);
    }
    public function job_store(Request $request){
        $request->validate([
            'title' => 'required|max:255',
            'category' => 'required',
        ]);

        if ($request->image && !empty($request->image)) {

            $file_name = FileUploader::upload($request->image, 'public/storage/job/thumbnail', 370);
           // FileUploader::upload($request->image, 'public/storage/job/coverphoto/'.$file_name, 900);
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
        if($request->image && !empty($request->image)){
            $job->thumbnail = $file_name;
        }
        $job->save();
        $jobId = $job->id;
        Session::flash('success_message', get_phrase('Job Created Successfully'));
        return redirect()->route('job.pay.form', ['jobId' => $job->id]);

    }

    public function job_pay_form($jobId){
        $job = Job::find($jobId);
        $page_data = [
            'job' => $job,
            // 'layout' => 'jobs',
            'view_path' => 'frontend.jobs.index',
            'section' => 'frontend.jobs.job_pay_form',
        ];
    
        return view('frontend.index', $page_data);
    }

    public function myjob(){
        $jobs = Job::where('user_id', auth()->user()->id)->orderBy('id','DESC')->get();
        $page_data = [
            'jobs' => $jobs,
            // 'layout' => 'jobs',
            'view_path' => 'frontend.jobs.index',
            'section' => 'frontend.jobs.user_job',
        ];
        return view('frontend.index',$page_data);
    }

    public function job_edit($id = ""){
        $job_details = Job::find($id);
        $page_data = [
            'job_details' => $job_details,
            // 'layout' => 'jobs',
            'view_path' => 'frontend.jobs.index',
            'section' => 'frontend.jobs.job_edit',
        ];
        return view('frontend.index',$page_data);

   } 

   public function job_update(Request $request, $id)
   {

       if ($request->category == 'Select a category') {
           flash()->addError('Please select a category');
           return redirect()->back()->withInput();
       }

       $request->validate([
           'title' => 'required|max:255',
           'category' => 'required',
       ]);

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

       $job = Job::find($id);
       $job->thumbnail = $new_thumbnail;
       $job->title = $request->title;
       $job->category_id = $request->category;
       $job->company = $request->company;
       $job->starting_salary_range = $request->starting_salary_range;
       $job->ending_salary_range = $request->ending_salary_range;
       $job->type = $request->type;
       $job->location = $request->location;

       if($job['status'] == '1'){
          $job->status = 1;
       }else if($job['status'] == '0'){
          $job->status = 0;
       }
       $job->description = $request->description;
       $done = $job->save();
       if ($done) {
           Session::flash('success_message', get_phrase('Job Updated Successfully'));
           return redirect()->route('job.myjob');
       }
   }


  public function job_delete()
    {
        $response = array();
        $job = Job::find($_GET['job_id']); 
        $imagename = $job->thumbnail;
        $job_history = DB::table('payment_histories')->where('item_id', $job->id)->delete();
        $job_wishlist = JobWishlist::where('job_id', $job->id)->delete();
        $job_apply = JobApply::where('job_id', $job->id)->delete();

        $thumbnailPathName = public_path('storage/job/thumbnail/') . $job->thumbnail;
        
        if (file_exists($thumbnailPathName)) {
            unlink($thumbnailPathName);
        }

        $done = $job->delete();

        if ($done) {
            $response = array('alertMessage' => get_phrase('Job Deleted Successfully'), 'fadeOutElem' => "#job-" . $_GET['job_id']);
        }

        return json_encode($response);
    }




  // Job Wishlist
    public function job_follow($id,$user_id){
        $data['user_id'] = $user_id;
        $data['job_id'] = $id;
        $data['created_at'] = Carbon::now();
        $data['updated_at'] = Carbon::now();
        $wishlist = JobWishlist::where('user_id',$user_id)->where('job_id', $id)->first();
        if($wishlist){
            JobWishlist::where('user_id', $user_id)->where('job_id', $id)->delete();
            return false;
            
        }else{
            JobWishlist::insert($data);
            return true;
           
        }
    }

    // Save View
    public function job_save(){
        $job_save = JobWishlist::where('user_id', auth()->user()->id)->get();
        $page_data = [
            'job_save' => $job_save,
            // 'layout' => 'jobs',
            'view_path' => 'frontend.jobs.index',
            'section' => 'frontend.jobs.job_save',
        ];
        return view('frontend.index',$page_data);
     }
   // Search Job
    public function search_job(){
        $currentDate = Carbon::now();
        $search = $_GET['search'];
        $searchjob = Job::where('title','like','%'.$search.'%')
        ->where('status', '1')
        ->where('is_published','1')
        ->whereDate('start_date', '<=', $currentDate)
        ->whereDate('end_date', '>=', $currentDate)
        ->get();
        $page_data = [
            'searchjob' => $searchjob,
            // 'layout' => 'jobs',
            'view_path' => 'frontend.jobs.index',
            'section' => 'frontend.jobs.search-job',
        ];
        return view('frontend.index',$page_data);
    }

       // on key up product search 
    //    public function job_filter(){
    //     // $search =  $_GET['search'];
    //     $category =  $_GET['category'];
    //     $max =  $_GET['max'];
    //     $location =  $_GET['location'];


    //     $query = Job::where('status', 1);

    //     // if(isset($search) && !empty($search)){
    //     //     $query->where(function ($query) use ($search){
    //     //         $query->where('title', 'like', '%'. $search .'%');
    //     //     });
    //     // }

    //     if(isset($category) && !empty($category)){
    //         $query->where('category_id', $category);
    //     }


    //     if(isset($max) && !empty($max)){
    //         $query->where('ending_salary_range', '<=', $max);
    //     }

    //     if(isset($location) && !empty($location)){
    //         $query->where('location', 'like', '%'.$location.'%');
    //     }

    //     $searchjob = $query->get();
    //     $page_data = [
    //         'searchjob' => $searchjob,
    //         'layout' => 'jobs',
    //         'view_path' => 'frontend.jobs.index',
    //         'section' => 'frontend.jobs.search-job',
    //     ];
    //     return view('frontend.index',$page_data);

    // }


    // Job Single Details
    public function single_job_details($id){
        $currentDate = Carbon::now();
        $job_details = Job::find($id);
        $related_jobs = Job::where('category_id', $job_details->category_id)
        ->where('id', '!=', $id)
        ->where('status', '1')
        ->where('is_published','1')
        ->whereDate('start_date', '<=', $currentDate)
        ->whereDate('end_date', '>=', $currentDate)
        ->get();
        $applicants = JobApply::where('job_id', $job_details->id)->get();
        $page_data = [
            'job_details' => $job_details,
            'related_jobs' => $related_jobs,
            'applicants' => $applicants,
            // 'layout' => 'jobs',
            'view_path' => 'frontend.jobs.index',
            'section' => 'frontend.jobs.single_job_details',
        ];
        return view('frontend.index', $page_data);
    }
    // Apply Job Form
    public function ApplyForm($id){
        $job_apply = Job::find($id);
        $page_data = [
            'job_apply' => $job_apply,
            // 'layout' => 'jobs',
            'view_path' => 'frontend.jobs.index',
            'section' => 'frontend.jobs.apply_job',
        ];
        return view('frontend.index', $page_data);
    }
    // Job Applied
    public function JobApply(Request $request, $id){
        $request->validate([
            'email' => 'required',
            'phone' => 'required',
            'image' => 'file|mimes:pdf|max:10240'
        ]);


        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $file = $request->file('image');
            $file_extension = $file->getClientOriginalExtension(); 
            $file_name = Str::random(40) . '.' . $file_extension; 
            move_uploaded_file($file->getPathname(), 'public/storage/job/cv/' . $file_name);
        }
        
        
        $owner_id = Job::where('id',$id)->first()->user_id;
      
        $apply = new JobApply();
        $apply->job_id = $request->id;
        $apply->owner_id = $owner_id;
        $apply->user_id = Auth::user()->id;
        $apply->email = $request->email;
        $apply->phone = $request->phone;
        if($request->image && !empty($request->image)){
            $apply->attachment = $file_name;
        }
        $apply->save();
        Session::flash('success_message', get_phrase('Job Apply Successfully'));
        return redirect()->route('jobs');
    }


    // My Apply List
    public  function MyApply(){
        $apply_list = JobApply::where('user_id', auth()->user()->id)->get();
        $page_data = [
            'apply_list' => $apply_list,
            // 'layout' => 'jobs',
            'view_path' => 'frontend.jobs.index',
            'section' => 'frontend.jobs.my_apply_job_list',
        ];
        return view('frontend.index', $page_data);
    }


    // All Apply List Own Job
    public function AllApplyList(){
        $all_list = JobApply::where('owner_id', auth()->user()->id)->get();
        
        
        $page_data = [
            'all_list' => $all_list,
            // 'layout' => 'jobs',
            'view_path' => 'frontend.jobs.index',
            'section' => 'frontend.jobs.all_job_apply_list',
        ];
        return view('frontend.index', $page_data);
    }

    public function applyListDelete($id){
       
        $job = JobApply::find($id);
        $thumbnailPathName = 'public/storage/job/cv/' . $job->attachment;
        if(file_exists($thumbnailPathName)){
            unlink($thumbnailPathName);
        }
        $done = $job->delete();
        if ($done) {
            $response = array('alertMessage' => get_phrase('Apply List has been Deleted successfully'), 'fadeOutElem' => "#id-" . $id);
        }
        return json_encode($response);

    }


    public function downloadPdf($id){
        $job = JobApply::find($id);
        $filePath = public_path('storage/job/cv/' . $job->attachment);
        return response()->download($filePath);
    }



    public function payment_configuration($id, Request $request)
    {
        $request->validate([
            'end_date' => 'required',
        ]);
       
        $job = Job::find($id);
        $job_pay =  get_settings('job_price');
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
        return redirect()->route('payment');
    }
    
    // User Job Payment History

    public function job_payment_history(){
        $payment_history = Job::where('user_id', auth()->user()->id)->get();
        $page_data = [
            'payment_history' => $payment_history,
            'view_path' => 'frontend.jobs.index',
            'section' => 'frontend.jobs.user_payment_history',
        ];
        return view('frontend.index', $page_data);
    }




}
