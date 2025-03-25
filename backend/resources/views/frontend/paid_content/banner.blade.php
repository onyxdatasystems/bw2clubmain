<!-- Banner & Name -->
<div class="main-content-wraper paid_banner mt-0">
   <div class="profile-cover bg-white mb-12">
        <div class="profile-header"
            data-background="{{ asset('assets/frontend/images/' . $paid_content->cover_photo) }}">
        </div>
        <div class="n_main_tab border-none">
            <div class="profile-avatar d-flex align-items-center">
                <div class="avatar avatar-xl">
                    <img class="rounded-circle" src="{{ asset('assets/frontend/images/' . $paid_content->logo) }}" alt="" />
                </div>
                <div class="avatar-details contants">
                    <h3 class="n_font">{{ $paid_content->title }}</h3>
                    <p class="fz-16-r-22-white">{{ $paid_content->sub_title }}</p>
                </div>
            </div>
        </div>
   </div>
</div>
