<div class="settings-wraper p_setting">
    {{-- <div class="d-flex justify-content-between align-items-center flex-wrap g-20 pb-20">
        <h4 class="fz-20-b-22-black">{{get_phrase('Settings')}}</h4>
    </div> --}}

    <div class="seetings-tabs-wrapper">
        <ul class="nav nav-tabs eNav-Tabs-custom px-3 mb-3" id="myTab" role="tablist">
            @include('frontend.paid_content.setting_tabs')
        </ul>


        @php
            $creator = DB::table('paid_content_creators')
                ->where('user_id', auth()->user()->id)
                ->first();
        @endphp

        <div class="tab-content eNav-Tabs-content" id="myTabContent">
            @include('frontend.paid_content.profile_tab')
            @include('frontend.paid_content.email_notification_tab')
            @include('frontend.paid_content.social_tab')
        </div>
    </div>
</div>
