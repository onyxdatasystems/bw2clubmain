
{{-- <link rel="stylesheet" href="{{ asset('assets/frontend/css/nice-select.css') }}"> --}}
<style>
    .form-select {
	padding: 10px 20px;
	font-size: 14px;
	color: #444444;
	background-color: #f3f3f3 !important;
	border-color: #f3f3f3 !important;
	border-radius: 5px;
}
.form-select:focus{
    box-shadow: none;
}
</style>
<div class="page-wrap">
    <div class="blog-header nblog_header j_head radius-8 mb-3" >
        <h1 class="h3">{{get_phrase('Jobs')}}</h1>
    
        <div class="btn-inline ">
            <a href="{{route('create.job')}}" class="btn_1 "> <i class="fa fa-circle-plus me-2"></i>{{ get_phrase('Create Job') }}</a>
            <a href="{{url()->previous()}}" class="btn_1"> <i class="fa-solid fa-backward me-2"></i>{{get_phrase("Back")}}</a>
        </div>
    </div>
    <div class="card border-none n_blog mt-3 px-3 py-4">
        <div class="create-article">
            @if ($errors->any())
                <div class="text-danger">
                    <ul>
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif
            <form method="POST" class="form_sel" action="{{route('job.update', $job_details->id)}}" enctype="multipart/form-data">
                @csrf
                <div class="form-group">
                  <label for="company">{{ get_phrase('Company Name') }}</label>
                  <input type="text"  value="{{$job_details->company}}" id="company" name="company" placeholder="Company Name">
                </div>
                <div class="form-group">
                  <label for="title" >{{ get_phrase('Job title') }}</label>
                  <input type="text"  value="{{$job_details->title}}" id="title" name="title" placeholder="Job title">
                </div>

                <div class="form-group">
                    <label for="job_category">{{ get_phrase('Select a category') }}</label>
                    <select name="category" class="form-select" required>
                      <option>{{get_phrase('Select a category')}}</option>
                      @foreach(DB::table('job_categories')->get() as $category)
                        <option value="{{$category->id}}" @if($job_details->category_id == $category->id) selected @endif>{{ $category->name }}</option>
                      @endforeach
                    </select>
                </div>
                   <div class="form-group">
                      <label for="starting_salary_range" >{{ get_phrase('Salary') }}</label>
                      <input type="text"  id="starting_salary_range" name="starting_salary_range" placeholder="Write job salary" value="{{$job_details->starting_salary_range}}">
                  </div>
                   <div class="form-group">
                      <label for="ending_salary_range" >{{ get_phrase('Salary') }}</label>
                      <input type="text"  id="ending_salary_range" name="ending_salary_range" placeholder="Write job salary" value="{{$job_details->ending_salary_range}}">
                  </div>
                  <div class="form-group">
                      <label for="type">{{ get_phrase('Type') }}</label>
                      <select name="type" class="form-select eForm-control select2" required>
                        <option value="full-time" @if($job_details->type == 'full-time') selected @endif>{{get_phrase('Full Time')}}</option>
                        <option value="part-time" @if($job_details->type == 'part-time') selected @endif>{{get_phrase('Part Time')}}</option>
                      </select>
                </div>
                <div class="form-group">
                    <label for="location">{{ get_phrase('location') }}</label>
                    <input type="text"  id="location" name="location" placeholder="Write job location" value="{{$job_details->location}}">
                </div>
                <div class="form-group">
                    <label for="description" >{{ get_phrase('Job Description') }}</label>
                    <textarea id="description" name="description" class="content">{{$job_details->description}}</textarea>
                </div>
                <div class="form-group">
                    <label for="">{{ get_phrase('Previous Uploaded Image') }}</label> <br>
                    <img src="{{ get_job_image($job_details->thumbnail,'thumbnail') }}" class="w-60 custome-height-50"  alt="">
                </div>
                <div class="form-group">
                    <label for="image">{{ get_phrase('Photo') }}</label>
                    <input id="image"  type="file" name="image">
                    <input id="old_image"  value="{{$job_details->thumbnail}}" type="hidden" name="old_image">
                </div>
                <button type="submit" class="btn btn-primary">{{ get_phrase('Update') }}</button>
            </form>
        </div>
    </div>
</div>


<script src="{{ asset('assets/frontend/js/jquery.nice-select.min.js') }}"></script>
<script>
    $('document').ready(function(){
        $(".select").niceSelect();
    });
</script>