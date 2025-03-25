
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
    <div class="blog-header nblog_header  j_head radius-8 mb-3" >
        <h1 class="h3">{{get_phrase('Jobs')}}</h1>
    
        <div class="btn-inline ">
            <a href="{{route('create.job')}}" class="btn_1 "> <i class="fa fa-circle-plus me-2"></i>{{ get_phrase('Create Job') }}</a>
            <a href="{{url()->previous()}}" class="btn_1"> <i class="fa-solid fa-backward me-2"></i>{{get_phrase("Back")}}</a>
        </div>
    </div>
    <div class="card border-none n_blog mt-3 p-20">
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
            <form action="{{ route('job.store') }}" class="form_sel" method="POST" enctype="multipart/form-data">
                @csrf
                <div class="form-group">
                    <label for="#">{{ get_phrase('Company Name') }}</label>
                    <input type="text" name="company" placeholder="Write company name">
                </div>
                <div class="form-group">
                    <label for="#">{{ get_phrase('Title') }}</label>
                    <input type="text" name="title" placeholder="Enter your title">
                </div>
                <div class="form-group">
                    <label for="#">{{ get_phrase('Category') }}</label>
                    <select name="category" id="category" required class="form-select  bg-secondary">
                        <option value="" selected disabled>{{ get_phrase('Select Category') }}</option>
                        @foreach ($job_catagory as $category )
                            <option value="{{ $category->id }}">{{ $category->name }}</option>
                        @endforeach
                    </select>
                </div>
                <div class="form-group">
                    <label for="#">{{ get_phrase('Starting Salary Range') }}</label>
                    <input type="text" name="starting_salary_range" placeholder="Write job salary">
                </div>
                <div class="form-group">
                    <label for="#">{{ get_phrase('Ending Salary Range') }}</label>
                    <input type="text" name="ending_salary_range" placeholder="Write job salary">
                </div>
                <div class="form-group">
                    <label for="type">{{ get_phrase('Type') }}</label>
                    <select name="type" id="type" required class="form-select">
                       <option value="full-time">{{get_phrase('Full Time')}}</option>
                       <option value="part-time">{{get_phrase('Part Time')}}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="#">{{ get_phrase('Location') }}</label>
                    <input type="text" name="location" placeholder="Write job location">
                </div>
                <div class="form-group">
                    <label for="#">{{ get_phrase('Description') }}</label>
                    <textarea name="description" id="description" class="content"  placeholder="Description"></textarea>
                </div>
                <div class="form-group">
                    <label for="#">{{ get_phrase('Image') }}</label>
                    <input type="file" name="image" id="image">
                </div>
                
                <div class="inline-btn mt-3">
                    <button type="submit" class="btn btn-primary w-100">{{ get_phrase('Create Job Post') }}</button>
                </div>
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