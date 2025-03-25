@if ($fundraiser_complete->count() > 0)

    <div class="pb-20">
        <h4 class="fz-20-b-22-black">{{get_phrase('Complate Campaign')}}</h4>
    </div>

    <div class="col-lg-12">
        {{-- <div class="complate-main-wrap complete_wrap"> --}}
            <div class="row">
                @foreach ($fundraiser_complete as $row)
                <div class="col-xl-4 col-lg-6 col-md-6">
                   
                    @php
                        $raised_amount = $row->raised_amount;
                        $goal_amount = $row->goal_amount;
                        $value = ($raised_amount * 100) / $goal_amount;
                        $id = $row->id;
                    @endphp
                    <div class="blog-card blog-card-2 fund_card">
                        <div class="card custom_card fc_card border-none radius-8 bg-white p-0">
                            <div class="card-img">
                                @if ($row->cover_photo != '')
                                    <img src="{{ asset('assets/frontend/images/campaign/' . $row->cover_photo) }}"
                                        class="card-img-top" alt="blog">
                                @else
                                    <img src="{{ asset('storage/blog/coverphoto/default/default.jpg') }}"
                                        class="card-img-top" alt="blog">
                                @endif
                                <div class="card-donate">
                                    <img src="{{ asset('assets/frontend/css/fundraiser/images/fundraiser/donate.svg') }}"
                                        alt="donate">
                                    <p class="donate-count">{{ $goal_amount }}</p>
                                </div>
                            </div>
                            <div class="card-body">
                                <a href="javascript: void(0);"
                                    onclick="ajaxModal('{{ route('history.model', [$modal, 'id' => $row->id]) }}','{{ get_phrase('Payment history') }}')">
                                    <h5 class="card-title text_16 card_preview_title">{{ $row->title }}</h5>
                                </a>
                                <p class="card-text pera_text card_preview_text">{{ $row->description }}</p>
                                <div class="card-progress d-flex justify-content-between align-items-center">
                                    <progress id="progress_1" value="{{ $value }}" max="100"></progress>
                                    <p class="card-progress-value">{{ number_format($value, 2) }}%</p>
                                </div>
                                <div class="card-raised-area card-raised-area-2 d-flex justify-content-between">
                                    <p class="pera_text">Raised : <span class="text_green">${{ $raised_amount }}</span></p>
                                    <p class="pera_text">Goal : <span class="text_green">${{ $goal_amount }}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                @endforeach
            </div>
           
        {{-- </div> --}}
        @if (Route::currentRouteName() != 'campaign.history')
            @if ($fundraiser_complete->count() > 4)
                <div class="col-lg-12 mt-3 blog-see-more text-center">
                    <a href="{{ route('campaign.history', ['type' => 'histoty']) }}" id="see_more"
                        class="text_16 text_purple">
                       {{get_phrase('See all')}}
                    </a>
                </div>
            @endif
        @endif
    </div>
    @include('frontend.common_scripts')
    @include('backend.modal')


@endif
@include('frontend.common_scripts')
@include('backend.modal')
