<style>
  .note{
    font-size: 12px;
    color: #000;
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
              <h4>{{ get_phrase('Add a new Job') }}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Start Admin area -->
    <div class="row">
      <div class="col-md-7">
        <div class="eSection-wrap-2">
            <div class="eForm-layouts">
              @if ($errors->any())
                    <div class="alert alert-danger">
                        <ul>
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif
              <form method="POST" action="{{ route('admin.job.created') }}" enctype="multipart/form-data">
                  @csrf
                  <div class="mb-3">
                    <label for="company" class="form-label eForm-label">{{ get_phrase('Company Name') }}</label>
                    <input type="text" class="form-control eForm-control" id="company" name="company" placeholder="Write Comapny Name">
                  </div>
                  <div class="mb-3">
                    <label for="title" class="form-label eForm-label">{{ get_phrase('Job title') }}</label>
                    <input type="text" class="form-control eForm-control" id="title" name="title" placeholder="Write job title">
                  </div>

                  <div class="mb-3">
                      <label for="job_category" class="form-label eForm-label">{{ get_phrase('Select a category') }}</label>
                      <select name="category" class="form-select eForm-control select2" required>
                        <option>{{get_phrase('Select a category')}}</option>
                        @foreach(DB::table('job_categories')->get() as $category)
                          <option value="{{$category->id}}">{{ $category->name }}</option>
                        @endforeach
                      </select>
                  </div>

                  <div class="mb-3">
                      <label for="salary" class="form-label eForm-label">{{ get_phrase('Starting Salary Range') }}</label>
                      <input type="number" class="form-control eForm-control" id="salary" name="starting_salary_range" placeholder="Write job salary">
                  </div>
                  <div class="mb-3">
                      <label for="ending_salary_range" class="form-label eForm-label">{{ get_phrase('Ending Salary Range') }}</label>
                      <input type="number" class="form-control eForm-control" id="ending_salary_range" name="ending_salary_range" placeholder="Write job salary">
                  </div>
                  <div class="mb-3">
                    <label for="type" class="form-label eForm-label">{{ get_phrase('Type') }}</label>
                    <select name="type" class="form-select eForm-control select2" required>
                      <option value="full-time">{{get_phrase('Full Time')}}</option>
                      <option value="part-time">{{get_phrase('Part Time')}}</option>
                    </select>
                </div>
                <div class="mb-3">
                   <label for="location" class="form-label eForm-label">{{ get_phrase('location') }}</label>
                   <input type="text" class="form-control eForm-control" id="location" name="location" placeholder="Write job location">
                </div>
                  <div class="mb-3">
                      <label for="description" class="form-label eForm-label">{{ get_phrase('Description') }}</label>
                      <textarea id="description" name="description" class="content"></textarea>
                  </div>
                  <div class="mb-3">
                    <label for="#" class="form-label eForm-label">{{get_phrase('Job Start Date')}}</label>
                    <input type="date" class="form-control eForm-control" name="start_date" onchange="change()" required>
                </div>
                <div class="mb-3l">
                    <label class="validity-text form-label eForm-label">{{ get_phrase('Expires date') }}  </label>
                    <input type="text" class="form-control eForm-control" name="end_date" id="end_date" required readonly>
                    <p class="note form-label eForm-label">Admin set <b>{{get_settings('day')}}</b>  day to visible this job.</p>
                </div>
                  <div class="mb-3">
                    <label for="status" class="form-label eForm-label">{{ get_phrase('Status') }}</label>
                    <select name="status" class="form-select eForm-control select2" required>
                      <option value="1">{{get_phrase('Active')}}</option>
                      <option value="0">{{get_phrase('Pending')}}</option>
                    </select>
                </div>
                 

                  <div class="mb-3">
                      <label for="image" class="form-label eForm-label">{{ get_phrase('Image') }}</label>
                      <input id="image" class="form-control eForm-control-file" type="file" name="image">
                  </div>
                  <div class="mb-3">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="1" name="is_published">
                      <label class="form-check-label form-label eForm-label" for="is_publish">{{ get_phrase('Are you sure you want to publish this job!') }}</label>
                  </div>
                </div>
                  
                  <button type="submit" class="btn btn-primary">{{ get_phrase('Submit') }}</button>
              </form>
            </div>

        </div>
      </div>
    </div>
    <!-- Start Footer -->
    @include('backend.footer')
    <!-- End Footer -->
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
