<style>
    .dAdmin_info_name .btns {
        height: 23px;
        display: inline-block;
        width: 64px;
        text-align: center;
        text-transform: capitalize;
        border-radius: 5px;
        font-size: 11px;
        color: #fff !important;
        line-height: 23px;
        
    }
    .dAdmin_info_name .btns:focus{
      box-shadow: none !important;
    }
    .download_btns{
      padding: 3px 10px;
        margin-left: 20px;
    }
    </style>
  <div class="main_content">
      <!-- Mani section header and breadcrumb -->
      <div class="mainSection-title">
        <div class="row">
          <div class="col-12">
            <div class="d-flex justify-content-between align-items-center flex-wrap gr-15">
              <div class="d-flex flex-column">
                 <h4>{{ get_phrase('All Apply Jobs List') }}</h4>
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
                    <th scope="col">{{get_phrase('ID')}}</th>
                    <th scope="col" >{{get_phrase('Job Name')}}</th>
                    <th scope="col">{{get_phrase('Applicant')}}</th>
                    <th scope="col">{{get_phrase('Phone')}}</th>
                    <th scope="col">{{get_phrase('Download')}}</th>
                    <th scope="col" class="text-center">{{ get_phrase('Action') }}</th>
                  </tr>
                </thead>
                <tbody>
                    @foreach($all_list as $key => $list)
                    @php                  
                        $user_info = App\Models\User::where('id', $list->user_id)->first();
                        $job_info = App\Models\Job::where('id', $list->job_id)->first();
                     @endphp
                      <tr>
                          <th scope="row">
                            <p class="row-number">{{++$key}}</p>
                          </th>
                          <td>
                            <div class="dAdmin_info_name min-w-100px">
                                <a href="{{route('job.single.details', $list->job_id)}}" target="_blank" class="text-dark"> {{$job_info->title}}</a>
                            </div>
                          </td>
                          <th scope="row">
                            <div class="dAdmin_info_name min-w-100px">
                                <p class="text-dark">{{$user_info->name}}</p>
                                <p class="text-dark">{{$user_info->email}}</p>

                             </div>
                          </th>
                          <td>
                            <div class="dAdmin_info_name min-w-100px">
                                <p class="text-dark">{{$list->phone}}</p>
                            </div>
                          </td>
                          <td>
                            <div class="dAdmin_info_name min-w-100px m-auto d-flex">
                                <a href="{{ route('admin.job.pdf.download', ['id' => $list->id]) }}" target="_blank" class="btn download_btns btn-primary"><i class="fa-solid fa-upload"></i></a>
                            </div>
                        </td>
                        
                          
                          <td class="text-center">
                            <div class="adminTable-action">
                              <button type="button" class="eBtn eBtn-black dropdown-toggle table-action-btn-2" data-bs-toggle="dropdown" aria-expanded="false">
                                {{get_phrase('Actions')}}
                              </button>
                              <ul class="dropdown-menu dropdown-menu-end eDropdown-menu-2 eDropdown-table-action">
                                <li><a class="dropdown-item" onclick="return confirm('{{get_phrase('Are You Sure Want To Delete?')}}')"  href="{{route('admin.job.apply.list-delete',$list->id)}}">{{get_phrase('Delete')}}</a></li>
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
  
  
  
  