<style>
.dAdmin_info_name .btns {
	height: 20px;
	display: inline-block;
	width: 60px;
	text-align: center;
	text-transform: capitalize;
	border-radius: 5px;
	font-size: 10px;
	color: #fff !important;
	line-height: 20px;
}
    .dAdmin_info_name .btns:focus{
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
                 <h4>{{ get_phrase('All Pending Jobs') }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Start Admin area -->
      <div class="row">
        <div class="col-12">
          <div class="eSection-wrap-2">
            <!-- Filter area -->
            <div class="table-responsive">
              <table class="table eTable " id="">
                <thead>
                  <tr>
                    <th scope="col">{{ get_phrase('ID') }}</th>
                    <th scope="col">{{ get_phrase('Title') }}</th>
                    <th scope="col">{{ get_phrase('Company') }}</th>
                    <th scope="col">{{ get_phrase('Date') }}</th>
                    <th scope="col">{{ get_phrase('Status') }}</th>
                    <th scope="col">{{ get_phrase('Payment') }}</th>
                    <th scope="col" class="text-center">{{ get_phrase('Action') }}</th>
                  </tr>
                </thead>
                <tbody>
                  @foreach($pending_job as $key => $job)
                         {{-- @php
                            $pay = DB::table('job_payments')->where('user_id', auth()->user()->id)->where('job_id', $job->id)->first();
                          @endphp --}}
                      <tr>
                          <th scope="row">
                            <p class="row-number">{{++ $key}}</p>
                          </th>
                          <td>
                            <div class="dAdmin_info_name min-w-100px">
                                <a href="{{route('job.single.details', $job->id)}}" target="_blank" class="text-dark">{{$job->title}}</a>
                            </div>
                          </td>
                          <td scope="row">
                             <div class="dAdmin_info_name min-w-100px">
                              <p>{{$job->company}}</p>
                          </div>
                        </td>
                          <td>
                            <div class="dAdmin_info_name min-w-100px">
                                <p>{{  date( "d-m-y", strtotime($job->created_at)) }}</p>
                            </div>
                          </td>
                          <td>
                            <div class="dAdmin_info_name min-w-100px m-auto d-flex">
                              @if($job->status == '0')
                                <p class="text-dark btns btn-danger">{{get_phrase('Pending')}}</p>
                              @endif
                            </div>
                          </td>
                          <td>
                            <div class="dAdmin_info_name min-w-100px m-auto d-flex">
                              @if($job && $job->is_published == '1')
                                <p class="text-dark btns btn-info">{{get_phrase('Paid')}}</p>
                                @else
                                <p class="text-dark btns btn-danger">{{get_phrase('Not Paid')}}</p>
                              @endif
                            </div>
                          </td>

                          
                          <td class="text-center">
                            <div class="adminTable-action">
                              <button type="button" class="eBtn eBtn-black dropdown-toggle table-action-btn-2" data-bs-toggle="dropdown" aria-expanded="false">
                                {{get_phrase('Actions')}}
                              </button>
                              <ul class="dropdown-menu dropdown-menu-end eDropdown-menu-2 eDropdown-table-action">
                                <li><a class="dropdown-item" href="{{route('admin.job.edit',$job->id)}}">{{get_phrase('Edit')}}</a></li>
                                <li><a class="dropdown-item" onclick="return confirm('{{get_phrase('Are You Sure Want To Delete?')}}')"  href="{{route('admin.delete.job', $job->id)}}">{{get_phrase('Delete')}}</a></li>
                              </ul>
                            </div>
                          </td>
                      </tr>
                   @endforeach   
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- End Admin area -->
  
     
      <!-- Start Footer -->
      @include('backend.footer')
      <!-- End Footer -->
    </div>
  
  
  
  