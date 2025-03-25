@if ($packages->count() > 0)
    <div class="paid-membership user_paid pb-3">
       <div class="bg-white p-3 radius-8">
            <h4 class=" fz-28-sb-38-black text-center mb-3">{{get_phrase('Select a membership level')}}</h4>
            <div class="paid-membership-items d-flex gap-3">
                @foreach ($packages as $package)
                    @php
                        $page_title = DB::table('paid_content_creators')
                            ->where('user_id', $package->user_id)
                            ->first();
                    @endphp
                    <div class="paid-membership-item d-flex flex-column justify-content-between">
                        <h6 class="title">{{ $package->title }}</h6>

                        <div>
                            <h4 class="title">{{ $package->name }}</h4>
                            <h6 class="titleTwo">{{ $page_title->title }}</h6>
                            <p class="pb-0">{{ $package->description }}</p>
                        </div>

                        <div>
                            <h4 class="price mb-3"><span>${{ $package->price }}</span>
                            </h4>
                            <a href="javascript: void(0);" class="paidBtn"
                                onclick="ajaxModal('{{ route('load_modal_content', ['frontend.paid_content.subscription_payment', 'id' => $package->id]) }}','{{ get_phrase('Purchase') }}')">{{get_phrase('Get Started')}}</a>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
@else
    <div class="alert alert-light" role="alert">
        <strong class="text-danger">{{get_phrase("Creator hasn't set packages for subscription.")}}</strong>
    </div>
@endif
