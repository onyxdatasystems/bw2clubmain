<div class="bg-white p-3" id="show_more_items">
    @if ($search_list->count() > 0)
        @include('frontend.paid_content.load_more', ['search_list' => $search_list])
    @else
        <div class="no-package d-flex justify-content-center align-items-center mt-3">
            <p class="m-0 py-4">No subscriptions yet.</p>
        </div>
    @endif
</div>
