<div class="page-wrap">
    <div class="card border-none JApply n_blog mt-3 px-3 py-4">
           <h4 class="h4 text-center mb-5">{{get_phrase('Apply Now')}}</h4> 
           <div class="jdescription mb-3">
             <h5>{{$job_apply->company}}</h5>
             <p>{{$job_apply->title}}</p>
           </div>
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
            @php 
                $user_info = App\Models\User::where('id', auth()->user()->id)->first();
             @endphp
            <form action="{{ route('job.apply',$job_apply->id) }}" class="form_sel jSel" method="POST" enctype="multipart/form-data">
                @csrf
                 <div class="j_group">
                    <div class="ava-info d-flex align-items-center mb-3">
                        <div class="flex-shrink-0">
                            <img src="{{ get_user_image($user_info->photo, 'optimized') }}" class="rounded-circle user_image_show_on_modal" alt="...">
                            </div>
                        <div class="ava-desc ms-2">
                            <h5 class="mb-0 d-flex"><a class="text-black ms-0" href="javascript:;">{{$user_info->name}}</a></h5>                   
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="#">{{ get_phrase('Email*') }}</label>
                        <input type="email" name="email" placeholder="Enter email address" required>
                    </div>
                    <div class="form-group">
                        <label for="#">{{ get_phrase('Phone*') }}</label>
                        <input type="number" name="phone" placeholder="Enter phone number" required>
                    </div>
                    <div class="form-group">
                        <label for="#">{{ get_phrase('CV*') }}</label>
                        <input type="file" name="image" id="image" required>
                        <p class="cv-text">{{get_phrase('Please upload your CV!')}}</p>
                    </div>
                 </div>
                
                <div class="inline-btn j_app_btn mt-3">
                    <a href="{{ url()->previous() }}" class="btn btn-primary w-100">{{ get_phrase('Cancle') }}</a>
                    <button type="submit" class="btn btn-primary w-100">{{ get_phrase('Apply') }}</button>
                </div>
            </form>
        </div>
    </div>
</div>


