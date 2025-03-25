<div class="container">
    <div class="row">
        <div class="col-12">

            <div class="d-flex justify-content-end">
                <a href="{{ route('author.list') }}" class="btn btn-primary px-4 my-3">Back</a>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col"></div>
        <div class="col-md-7">
            <div class="eSection-wrap-2">
                <div class="title mb-3">
                    <h6 class="text-dark pb-2 border-bottom border-secondary">Review Request</h6>
                </div>

                <div class="input-wrap d-flex align-items-start flex-column mb-3">
                    <label class="text-14px eForm-label">Page Name</label>
                    <input type="text" class="form-control eForm-control" placeholder="Page name"
                        value="{{ $review->title }}" aria-label="page_name" readonly />
                </div>

                <div class="input-wrap d-flex align-items-start flex-column mb-3 w-100">
                    <label class="text-14px eForm-label">About Page</label>
                    <textarea class="form-control w-100 text-secondary" style="max-height: 300px; min-height: 100px; font-size: 0.8125rem"
                        readonly>{{ $review->description }}</textarea>
                </div>

                <div class="action-buttons d-flex justify-content-end gap-3">
                    @if ($review->status > 0)
                        <a href="{{ route('author.status', ['id' => $review->user_id]) }}"
                            class="btn-warning text-white rounded-3 py-2 px-4">
                            {{ get_phrase('Deactive') }}
                        </a>
                    @else
                        <a href="{{ route('author.status', ['id' => $review->user_id]) }}"
                            class="btn-success rounded-3 py-2 px-4">
                            {{ get_phrase('Active') }}
                        </a>
                    @endif
                    <a href="{{ route('author.delete', $review->user_id) }}" class="btn-danger rounded-3 py-2 px-4">
                        {{ get_phrase('Delete') }}
                    </a>
                </div>
            </div>
        </div>
        <div class="col"></div>
    </div>
</div>
