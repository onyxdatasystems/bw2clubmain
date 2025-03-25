<style>
#end_date {
    width: 126px;
    display: inline-block;
    margin: 0 9px;
    color: #000;
}
.validity-text{
    color: #000;
    font-weight: 500;
}
.label-control{
    display: flex: 
}
</style>

<div class="page-wrap">
    <div class="card border-none JApply pay_apply n_blog  px-3 py-4">
          
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
             <p class="app_text">{{get_phrase('Please pay for your created job post.')}}</p>
              <div class="jdescription mb-3">
                <h5>{{$job->title}}</h5>
                <p>{{$job->company}}</p>
              </div>
            <form action="{{ route('job.payment_configuration', ['id' => $job->id]) }}" class="form_sel jSel" method="POST" enctype="multipart/form-data">
                @csrf
                <div class="form-group mb-0">
                    <label for="#">This job only showing <b class="add">{{get_settings('day')}} Days</b>  in our Website!.</label>
                    <input type="hidden" name="name" value="{{get_settings('day')}}">
                </div>
                <div class="form-group">
                    <label for="#">Pay for <b>{{currency(get_settings('job_price'))}} </b>per job.</label>
                    <input type="hidden" name="price" value="{{get_settings('job_price')}}">
                </div>

                <div class="form-group">
                    <label for="#">{{get_phrase('Job Start Date')}}</label>
                    <input type="date" name="start_date" onchange="change()" required>
                </div>
                <div class="form-group label-control">
                    <label class="validity-text">{{ get_phrase('Your job on our website expires on date') }}  </label>
                    <input type="text" class="form-control" name="end_date" id="end_date" required readonly>
                </div>
                <div class="inline-btn j_app_btn justify-content-start mt-3">
                    <a href="{{ url()->previous() }}" class="btn btn-primary w-100">{{ get_phrase('Cancle') }}</a>
                    <button type="submit" class="btn common_btn w-100">{{ get_phrase('Pay Now') }}</button>
                </div>
            </form>
        </div>
    </div>
</div>


<script>
    // Pass PHP values to JavaScript
    var numberOfDays = {{ get_settings('day') }};

    function change() {
        var startDateInput = document.querySelector('input[name="start_date"]');
        var endDateInput = document.getElementById('end_date');
        var startDate = new Date(startDateInput.value);
        var endDate = new Date(startDate.getTime() + numberOfDays * 24 * 60 * 60 * 1000);
        var formattedEndDate = endDate.toISOString().split('T')[0];
        endDateInput.value = formattedEndDate;
    }
</script>