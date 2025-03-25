@isset($timeline_post)
    @include('frontend.main_content.create_post', ['paid_content_id' => $paid_content->id])
    @php $posts = $timeline_post @endphp
@endisset

@isset($public_post)
    @php $posts = $public_post @endphp
@endisset

@isset($subscriber_post)
    @php $posts = $subscriber_post @endphp
@endisset

<div id="pc-timeline-posts">
    @include('frontend.main_content.posts', ['type' => 'paid_content'])
</div>
