@php
    $paid_content = App\Models\PaidContentCreator::where('user_id', auth()->user()->id)->first();
@endphp

{{-- cover pic and profile pic --}}
@include('frontend.paid_content.banner')

<div class="main-content-wraper mt-12">
    <div class="row">
        <div class="col-lg-12 col-sm-12">
            <div class="myPage-tabs-wraper">
                <div class="seetings-tabs-wrapper">

                    {{-- creator menu panel --}}
                    <div class="tabs-top">
                        @include('frontend.paid_content.tab_options')
                    </div>
                    
                    {{-- my page --}}
                    @if (isset($timeline_post) || isset($public_post) || isset($subscriber_post))
                        @include('frontend.paid_content.my_page')
                    @endif

                    {{-- creator package --}}
                    @isset($packages)
                        @include('frontend.paid_content.package')
                    @endisset

                    {{-- creator subscriber --}}
                    @isset($subscribers)
                        @include('frontend.paid_content.subscribers')
                    @endisset
                </div>
            </div>
        </div>

        {{-- paid content bio --}}
        {{-- <div class="col-lg-5 col-sm-12">
           
        </div> --}}
    </div>
</div>

@include('frontend.main_content.scripts')
@include('frontend.common_scripts')
