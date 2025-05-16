<style>
   .dAdmin_info_name .btn {
	height: 34px;
	display: inline-block;
	width: 67px;
	text-align: center;
	text-transform: capitalize;
	border-radius: 5px;
	font-size: 13px;
	color: #fff !important;
	line-height: 21px;
}
    .dAdmin_info_name .btn:focus{
      box-shadow: none !important;
    }

    </style>
  <div class="main_content">
      <!-- Mani section header and breadcrumb -->
      <div class="mainSection-title">
        <div class="row">
          <div class="col-12">
            <div class="d-flex justify-content-between align-items-center flex-wrap gr-15">
              <div class="d-flex flex-column">
                 <h4>{{ get_phrase('Job Price') }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Start Admin area -->
      <div class="row mainSection-title pb-0">
        <div class="col-5">
          <div class="eSection-wrap-2 pt-3">
            <!-- Filter area -->
            <div class="eForm-layouts mt-3">
                <form method="POST" action="{{ route('admin.job.price.view.save') }}" enctype="multipart/form-data">
                    @csrf
                    <div class="fpb-7">
                      <label for="Name" class="form-label eForm-label">{{ get_phrase('Job Price') }}</label>
                      <input type="text" class="form-control eForm-control" id="Name" name="job_price" value="{{get_settings('job_price')}}" placeholder="Enter your job price" required>
                    </div>
                    <div class="fpb-7">
                      <label for="days" class="form-label eForm-label">{{ get_phrase('Add Days') }}</label>
                      <input type="number" class="form-control eForm-control" id="days" name="day" value="{{get_settings('day')}}" required>
                      <p class="form-label eForm-label">{{get_phrase('After the Administrator sets this day. The job will be visible as of this day.')}}</p>
                    </div>
                    @if ($errors->any())
                        <div class="alert alert-danger">
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif
                    
                    <button type="submit" class="btn btn-primary mt-2">{{ get_phrase('Save') }}</button>
                </form>
              </div>
          </div>
        </div>
      
      </div>
      <!-- End Admin area -->
  
     
      <!-- Start Footer -->
      @include('backend.footer')
      <!-- End Footer -->
    </div>
  
  
  
  