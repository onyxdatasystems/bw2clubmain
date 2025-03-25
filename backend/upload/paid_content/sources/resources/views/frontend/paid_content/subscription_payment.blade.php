@php
    $selected_package = DB::table('paid_content_packages')
        ->where('id', $id)
        ->first();
    
    $page = DB::table('paid_content_creators')
        ->where('user_id', $selected_package->user_id)
        ->first();
    
@endphp



<form method="POST" action="{{ route('subscription.payment_configuration', $id) }}">
    @CSRF

    <input type="hidden" name="subscriber_id" value="{{ auth()->user()->id }}">
    <input type="hidden" name="package_id" value="{{ $id }}">
    <input type="hidden" name="creator_id" value="{{ $page->user_id }}">
    <input type="hidden" name="price" value="{{ $selected_package->price }}">
    <input type="hidden" name="issue_date" value="{{ time() }}">
    <input type="hidden" name="expire_date" value="{{ strtotime('+1 next month') }}">


    <div class="row">
        <div class="col-md-12 d-flex flex-column align-items-center">
            <div class="mb-3">
                <span>
                    <h2 class="ad-total-charged-amount fw-bold d-inline-block p-0 m-0">
                        ${{ $selected_package->price }}
                    </h2>

                </span>
            </div>

            <div class="subscription-details">

                <div class="d-flex align-items-center gap-3 subscriber">
                    <span class="package-info">Subscriber Name</span>
                    <span>: &nbsp {{ auth()->user()->name }}</span>
                </div>

                <div class="d-flex align-items-center gap-3 page">
                    <span class="package-info">Subscribe Page</span>
                    <span>: &nbsp {{ $page->title }}</span>
                </div>

                <div class="d-flex align-items-center gap-3 package">
                    <span class="package-info">Selected Package</span>
                    <span>: &nbsp {{ $selected_package->title }}</span>
                </div>


                <div class="d-flex align-items-center gap-3 start-date">
                    <span class="package-info">Issue Date</span>
                    <span>: &nbsp {{ date('d-M-Y', time()) }}</span>
                </div>

                <div class="d-flex align-items-center gap-3 expire-date">
                    <span class="package-info">Expire Date</span>
                    <span>: &nbsp {{ date('d-M-Y', strtotime('next month')) }}</span>
                </div>

            </div>

            {{-- sunmit button --}}
            <div class="mb-3 mt-4 flex-grow-1">
                <button type="submit" class="btn btn-primary text-white w-100 btn-payment-redirect"><i
                        class="bi bi-credit-card"></i> {{ get_phrase('Purchase package') }}</button>
            </div>
        </div>
    </div>
</form>
