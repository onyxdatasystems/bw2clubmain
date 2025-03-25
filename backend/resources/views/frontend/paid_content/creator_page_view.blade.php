{{-- creator banner area (profile_pic, cover_pic) --}}
@include('frontend.paid_content.banner')

{{-- show subscription pack if not subscribed  --}}
@if ($subscription == 0)
    @include('frontend.paid_content.user_subscription_packages')
@endif

<div id="paid_content_post">
    @include('frontend.main_content.posts', ['type' => 'paid_content'])
</div>

{{-- modal preview --}}
@include('frontend.main_content.scripts')
@include('frontend.common_scripts')
@include('backend.modal')
