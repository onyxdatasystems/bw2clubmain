<div class="tab-pane p_profile fade show active" id="cProfile" role="tabpanel" aria-labelledby="cProfile-tab">
    <div class="d-flex flex-column p-20 box-shadow-5 bg-white radius-8 ">
        <h3 class="fz-20-b-22-black  mb-3">{{get_phrase('Profile')}}</h3>
        <form action="{{ route('update.settings', auth()->user()->id) }}" class="pro_form" enctype="multipart/form-data" method="post">
            @csrf

            {{-- define update field --}}
            <input type="hidden" name="update" value="profile">

            @if ($creator->config_setting == '')
                <input type="text" name="new_user" value="new_user" hidden>
            @endif

            {{-- title --}}
            <div class="input-wrap mb-4">
                <label for="eInputTitle" class="eForm-label"><span class="text-danger">*</span>{{get_phrase('Title')}} </label>
                <input type="text" class="form-control eForm-control" id="eInputTitle"
                    @if ($creator->title) value="{{ $creator->title }}"
                @else placeholder="Your page title" @endif
                    name="title" aria-label="Your page title" />
            </div>

            {{-- sub title --}}
            <div class="input-wrap mb-4">
                <label for="eInputSubTitle" class="eForm-label"><span class="text-danger">*</span>{{get_phrase('Sub Title')}} </label>
                <input type="text" class="form-control eForm-control" id="eInputSubTitle"
                    @if ($creator->sub_title) value="{{ $creator->sub_title }}"
                @else placeholder="Your page sub title" @endif
                    name="sub_title" aria-label="Your page sub title" />
            </div>

            <!-- Profile Photo -->
            <div class="d-flex justify-content-between align-items-center flex-wrap g-20">
                <div class="p-photo-left">
                    <h4 class="fz-20-sb-27-black m-0"><span class="text-danger">*</span>{{get_phrase('Profile Photo')}} </h4>
                    <p class="fz-15-r-20-white-1 mb-0">{{get_phrase('We recommend a 80px by 80px image')}}</p>
                </div>

                <div class="p-photo-right d-flex align-items-center flex-wrap g-30">

                    {{-- page logo --}}
                    @if($creator->logo)
                    <div class="userPhoto">
                        <img src="{{ asset('assets/frontend/images/' . $creator->logo) }}"
                            class="logo @if ($creator->logo == '') d-none @endif" alt="" />
                    </div>
                    @endif

                    <div class="d-flex flex-wrap g-15">
                        <input type="file" name="logo" id="logo" hidden>

                        <a href="#" class="btn-upload" id="profile-upload-btn">{{get_phrase('Upload Profile Photo')}}</a>
                        <a href="{{ route('remove.photo', ['type' => 'logo']) }}" class="btn-delete">{{get_phrase('Delete')}}</a>
                    </div>
                </div>
            </div>


            <!-- Cover Photo -->
            <div class="d-flex justify-content-between align-items-start flex-wrap g-20 mt-4">
                <div class="p-photo-left">
                    <h4 class="fz-20-sb-27-black pb-10 m-0"><span class="text-danger">*</span>{{get_phrase('Cover Photo')}} </h4>
                    <p class="fz-15-r-20-white-1">{{get_phrase('We recommend an image at least 1600px wide and 400px tall.')}}</p>
                </div>

                <div class="p-photo-right d-flex flex-column align-items-end gap-3 mb-2">

                    {{-- page cover photo --}}
                    <div class="coverPhoto position-relative">
                        <img src="{{ asset('assets/frontend/images/' . $creator->cover_photo) }}" class="cover_photo"
                            alt="" />
                    </div>

                    <div class="d-flex flex-wrap g-15">
                        <input type="file" name="cover_photo" id="cover_photo" hidden>

                        <a href="#" class="btn-upload" id="cover-upload-btn">{{get_phrase('Upload Cover Photo')}}</a>
                        <a href="{{ route('remove.photo', ['type' => 'cover_photo']) }}" class="btn-delete">{{get_phrase('Delete')}}</a>
                    </div>
                </div>
            </div>


            {{-- description --}}
            <div class="input-wrap mb-4">
                <label for="eInputDescription" class="eForm-label">{{get_phrase('Description')}}</label>
                <textarea name="description" id="eInputDescription" cols="30" rows="7" placeholder="Your page description">{{ $creator->description }}</textarea>
            </div>

            {{-- creator bio --}}
            <div class="input-wrap mb-4">
                <label for="eInputBio" class="eForm-label">Bio</label>
                <input type="text" class="form-control eForm-control" id="eInputBio"
                    @if ($creator->bio) value="{{ $creator->bio }}"
                @else placeholder="Bio" @endif
                    name="bio" aria-label="Bio" />
            </div>

            <!-- Form Button -->
            <div class="d-flex form-btn-group justify-content-center gap-3 mt-10">
                <button type="reset" class="btn-cancel">{{get_phrase('Cancel')}}</button>
                <button type="submit" class="btn-save border-0">{{get_phrase('Save')}}</button>
            </div>
        </form>
    </div>
</div>

<script>
    $(document).ready(function() {
        $('#profile-upload-btn').click(function(e) {
            e.preventDefault();
            $('#logo').click();
        });

        $('#logo').change(function(e) {
            e.preventDefault();
            $('.logo').removeClass('d-none');
        });

        $('#cover-upload-btn').click(function(e) {
            e.preventDefault();
            $('#cover_photo').click();
        });

        $(function() {
            $('#cover_photo, #logo').change(function(e) {
                e.preventDefault();

                var img_type = $(this).attr('id');
                var x = URL.createObjectURL(event.target.files[0]);
                $('.' + img_type).attr('src', x);
            });
        })
    });
</script>
