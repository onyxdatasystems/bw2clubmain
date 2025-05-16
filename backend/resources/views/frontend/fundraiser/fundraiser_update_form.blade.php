@php
    $category = DB::table('fundraiser_categories')->get();
    $id = auth()->user()->id;
@endphp
<main class="main">
    <div class="">
        <div class="fixsize">
            <div class="headline_size d-flex justify-content-between">
                <h3>{{get_phrase('Please update your information')}}</h3>
                <a href="{{ url()->previous() }}" class="btn btn-primary btn-sm"> <i class="fa-solid fa-left-long me-2"></i>{{get_phrase('Back')}}</a>
            </div>
            <div class="campaign-form">
                <form action="{{ route('fundraiser.update', ['id' => $campaign_info->id]) }}" method="post"
                    enctype="multipart/form-data">
                    @csrf

                    <input type="hidden" name="up_user_id" value="{{ $id }}">
                    <input type="hidden" id="up_id">

                    {{-- For title --}}
                    <div class="title fund-form-group">
                        <label for="exampleFormControlInput1" class="form-label texts_size">{{get_phrase('Give your fundraiser a title')}}</label>
                        <div class="title-form-field">
                            <input type="text" name="up_title" class="form-control "
                                id="exampleFormControlInput1" value="{{ $campaign_info->title }}">
                            <h3 class="title-max-text">{{get_phrase('50')}}</h3>
                        </div>

                    </div>
                    {{-- for Story --}}
                    <div class="fund-form-group">
                        <label for="exampleFormControlTextarea1" class="form-label texts_size">{{get_phrase('Example textarea')}}</label>
                        <textarea class="form-control" name="up_description" id="exampleFormControlTextarea1" value="">{{ $campaign_info->description }}</textarea>
                    </div>


                    {{-- For category --}}
                    <div class="fund-form-group">
                        <label for="exampleFormControlInput1" class="form-label texts_size">{{get_phrase('Which category do you select?')}}</label>

                        <div class="starting-goal-input">
                            <select class="form-control " name="up_categories_id">
                                <option class="pera_text">{{get_phrase('Open this select menu')}}</option>
                                @foreach ($category as $row)
                                    <option value="{{ $row->id }}"
                                        @if ($row->id == $campaign_info->categories_id) selected @endif>{{ $row->name }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>


                    {{-- For amount --}}
                    <div class="fund-form-group">
                        <label for="exampleFormControlInput1" class="form-label texts_size">{{get_phrase('How much would you like to raise?')}}</label>

                        <div class="starting-goal-input d-flex">
                            <input type="text" name="up_goal_amount" class="form-control  "
                                placeholder="$50000" value="{{ $campaign_info->goal_amount }}">
                            <h3 class="amount-add-btn">{{get_phrase('AUD')}}</h3>
                        </div>
                    </div>


                    {{-- for ending date --}}
                    <div class="fund-form-group">
                        <label for="exampleFormControlInput1" class="form-label texts_size">{{get_phrase('How long will the campaign last?')}}</label>
                        <div class="starting-goal-input">
                            <input value="{{ date('Y-m-d', strtotime($campaign_info->timestamp_end)) }}" type="date"
                                name="up_timestamp_end" class="form-control ">
                        </div>
                    </div>


                    {{-- for cover photos --}}
                    <div class="fund-form-group">
                        <div>
                            <label for="exampleFormControlInput1" class="form-label texts_size">{{get_phrase('Add a cover photo or video')}}</label>
                        </div>
                        <div>
                            <div class="img-file-drag">
                                <div class="image-upload">
                                    <input type="file" name="cover_photo" id="logo" onchange="fileValue(this)">
                                    <label for="logo" class="upload-field" id="file-label">
                                        <div class="file-thumbnail">
                                            @if ($campaign_info->cover_photo != '')
                                                <img id="image-preview"
                                                    src="{{ asset('assets/frontend/images/campaign/' . $campaign_info->cover_photo) }}"
                                                    class="card-img-top" alt="blog">
                                            @else
                                                <img src="{{ asset('storage/blog/coverphoto/default/default.jpg') }}"
                                                    class="card-img-top" alt="blog">
                                            @endif

                                            <h3 class="browse-option text_20">
                                               {{get_phrase(' Drop your image here, or')}} <span>{{get_phrase('browse')}}</span>
                                            </h3>
                                            <p class="file-img-type">{{get_phrase('Supports; JPG, JPEG2000, PNG')}}</p>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    {{-- for button --}}
                    <div>
                        <input type="submit" class="btn_fundraiser" value="Update Fundraiser">
                    </div>
                </form>
            </div>
        </div>
    </div>
</main>
@section('specific_code_niceselect')
    $('select').niceSelect();
@endsection