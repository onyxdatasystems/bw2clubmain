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
      .adminTable-action {
	margin-left: 0;
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
                  <h4>{{ get_phrase('Jobs Payment History') }}</h4>
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
                      <th scope="col">{{ get_phrase('Amount') }}</th>
                      <th scope="col">{{ get_phrase('Payment Method') }}</th>
                      <th scope="col">{{ get_phrase('Action') }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    @foreach($job_history as $key => $history)
                      @php 
                    
                         $job_info = App\Models\Job::where('id', $history->item_id)->first();
                       
                      @endphp
                    <tr>
                        <th scope="row">
                          <p class="row-number">{{++ $key}}</p>
                        </th>
                        <td>
                          <div class="dAdmin_info_name min-w-100px">
                            <a href="{{route('job.single.details', $history->id)}}" target="_blank" class="text-dark">{{$job_info->title}}</a>
                          </div>
                        </td>
                        <td scope="">
                           <div class="dAdmin_info_name">
                              <p>{{$history->amount}}</p>
                           </div>
                        </td>
                        <td>
                          <div class="dAdmin_info_name">
                              <p>{{  $history->identifier }}</p>
                          </div>
                        </td>
                        
                        <td class="text-center">
                          <div class="adminTable-action">
                            <button type="button" class="eBtn eBtn-black dropdown-toggle table-action-btn-2" data-bs-toggle="dropdown" aria-expanded="false">
                              {{get_phrase('Actions')}}
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end eDropdown-menu-2 eDropdown-table-action">
                              <li><a class="dropdown-item" onclick="return confirm('{{get_phrase('Are You Sure Want To Delete?')}}')"  href="{{route('admin.delete.job.payment.history', $history->id)}}">{{get_phrase('Delete')}}</a></li>
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
    
    
    
    