<style>
.dAdmin_info_name .btns {
	height: 18px;
	display: inline-block;
	width: 49px;
	text-align: center;
	text-transform: capitalize;
	border-radius: 5px;
	font-size: 8px;
	color: #fff !important;
	line-height: 19px;
}
  .dAdmin_info_name .btns:focus{
    box-shadow: none !important;
  }
  .dAdmin_info_name p{
    font-size: 12px !important;
  }
  .check {
	display: inline-block;
	color: #0dcaf0;
	margin-left: 20px;
  font-size: 18px;
}
.crose{
  color: red !important;
}
</style>
<div class="main_content">
    <!-- Mani section header and breadcrumb -->
    <div class="mainSection-title">
      <div class="row">
        <div class="col-12">
          <div
            class="d-flex justify-content-between align-items-center flex-wrap gr-15"
          >
            <div class="d-flex flex-column">
              <h4>{{ get_phrase('All Jobs') }}</h4>
              
            </div>

            <div class="export-btn-area">
              <a href="{{ route('admin.job.create') }}" class="export_btn"><i class="fas fa-plus me-2"></i> {{ get_phrase('Create') }}</a>
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
                  <th scope="col">{{ get_phrase('Start Date') }}</th>
                  <th scope="col">{{ get_phrase('Expire Date') }}</th>
                  <th scope="col">{{ get_phrase('Published') }}</th>
                  <th scope="col" class="text-center">{{ get_phrase('Action') }}</th>
                </tr>
              </thead>
              <tbody>
                @foreach($jobs as $key => $job)
                    <tr>
                        <th scope="row">
                          <p class="row-number">{{++ $key}}</p>
                        </th>
                        <td>
                          <div class="dAdmin_info_name min-w-100px">
                              <a href="{{route('job.single.details', $job->id)}}" target="_blank" class="text-dark">{{$job->title}}</a>
                          </div>
                        </td>
                        <td scope="">
                           <div class="dAdmin_info_name">
                            <p class="text-dark">{{$job->company}}</p>
                            @if($job->status == '1' && $job->start_date <= now() && $job->end_date >= now())
                               <p class="text-dark btns btn-info">{{get_phrase('Active')}}</p>
                               @elseif($job->status == '1' && $job->start_date >= now())
                               <p class="text-dark btns btn-warning">{{get_phrase('Hold')}}</p>
                               @else
                               <p class="text-dark btns btn-danger">{{get_phrase('Expire')}}</p>
                             @endif
                           </div>
                        </td>
                        <td>
                          <div class="dAdmin_info_name min-w-100px">
                              <p>{{  date( "d-m-y", strtotime($job->start_date)) }}</p>
                          </div>
                        </td>
                        <td>
                          <div class="dAdmin_info_name min-w-100px">
                              <p>{{  date( "d-m-y", strtotime($job->end_date)) }}</p>
                          </div>
                        </td>
                        {{-- <td>
                          <div class="dAdmin_info_name min-w-100px m-auto d-flex">
                            @if($job->is_published == '1')
                              <span class="check"><i class="bi bi-check-circle"></i></span>
                            @else
                              <span class="check crose"><i class="fa-solid fa-circle-xmark"></i></span>
                            @endif
                          </div>
                        </td> --}}
                        <td>
                          <div class="dAdmin_info_name min-w-100px m-auto d-flex">
                            @if($job->is_published == '1')
                              <span class="check"><i class="bi bi-check-circle"></i></span>
                            @else
                              <span class="check crose"><i class="fa-solid fa-circle-xmark"></i></span>
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



