<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>


@foreach($jobs as $job)

<div class="col-12 col-sm-6 col-md-4 col-lg-4 h-100 my-1 single-item-countable" id="job-{{ $job->id }}">
    <article class="single-entry job-single h-100 p-0">
        <a href="#">
            <div class="entry-img thumbnail-210-200" style="background-image: url('{{ get_job_image($job->thumbnail,'thumbnail') }}')">
                <span class="date-meta">{{currency($job->starting_salary_range)}} - {{currency($job->ending_salary_range)}} </span>

                @php
                
                   $wishlist = App\Models\JobWishlist::where('user_id', auth()->user()->id)->where('job_id', $job->id)->first();
                    $apply = App\Models\JobApply::where('user_id', auth()->user()->id)->where('job_id', $job->id)->first();
                @endphp
               
                 <span class="heart-icon icon2" id="wishlist-icon{{$job->id}}" onclick="follow_toggle('{{route('job.follow',['id'=>$job->id, 'user_id' => auth()->user()->id])}}','{{$job->id}}')">
                    @if(!$wishlist)
                    <i class="fa-regular  fa-heart"></i>
                    @else
                    <i class="fa-solid fa-heart"></i>
                   @endif
                </span>
            </div>
        </a>
        <div class="entry-txt jEntry p-8">
          <a href="{{route('job.single.details',$job->id)}}">
              <h4>{{ Str::limit(strip_tags($job->title), 35) }}</h4>
          </a>
          
           <ul class="items-local">
                <li> 
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.99673 11.118V9.42664" stroke="#8C8A95" stroke-linecap="round" stroke-linejoin="round"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.1266 3.55347C13.2533 3.55347 14.1599 4.4668 14.1599 5.59347V7.8868C12.5199 8.8468 10.3533 9.4268 7.99327 9.4268C5.63327 9.4268 3.47327 8.8468 1.83327 7.8868V5.5868C1.83327 4.46013 2.7466 3.55347 3.87327 3.55347H12.1266Z" stroke="#8C8A95" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10.3301 3.55059V3.30659C10.3301 2.49325 9.67007 1.83325 8.85674 1.83325H7.13674C6.32341 1.83325 5.66341 2.49325 5.66341 3.30659V3.55059" stroke="#8C8A95" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M1.84959 10.322L1.97559 11.9947C2.06093 13.122 3.00026 13.9934 4.13026 13.9934H11.8629C12.9929 13.9934 13.9323 13.122 14.0176 11.9947L14.1436 10.322" stroke="#8C8A95" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    {{$job->type}}
               </li>
               <li>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.66666 7.00038C9.66666 6.07953 8.9205 5.33337 8.00033 5.33337C7.07949 5.33337 6.33333 6.07953 6.33333 7.00038C6.33333 7.92055 7.07949 8.66671 8.00033 8.66671C8.9205 8.66671 9.66666 7.92055 9.66666 7.00038Z" stroke="#8C8A95" stroke-linecap="round" stroke-linejoin="round"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99967 14C7.20069 14 3 10.5989 3 7.04219C3 4.25776 5.23807 2 7.99967 2C10.7613 2 13 4.25776 13 7.04219C13 10.5989 8.79866 14 7.99967 14Z" stroke="#8C8A95" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        {{$job->location}}
                </li>
           </ul>
            <ul class="job-btn">
                @if($apply && $apply->user_id == auth()->user()->id)
                <li><a href="javascript:;" class="btn info w-100">{{get_phrase('Applied')}}</a></li>
              @else
                 <li><a href="{{route('job.single.details',$job->id)}}" class="btn btn-primary w-100">{{get_phrase('Job Details')}}</a></li>
              @endif
            </ul>
        </div>
    </article>
</div>

@endforeach
@if ($jobs->total() > 8)
    <div class="pagi mt-3">
        {{ $jobs->links() }}
    </div>
@endif
<script>
    
    function follow_toggle(url,id){
        $.ajax({
            url: url,
            success: function(result){ 
                if(result == 1){
                    $("#wishlist-icon"+id).html('<i class="fa-solid fa-heart"></i>');
                    message = 'Job Added from wishlist.';
                    toastr.success(message);
                }else{
                    $("#wishlist-icon"+id).html('<i class="fa-regular fa-heart"></i>')
                    message = 'Job Remove from wishlist.';
                    toastr.success(message);
                }
            }
        });
    }

</script>