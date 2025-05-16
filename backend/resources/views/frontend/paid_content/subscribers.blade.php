    <div class="bg-white paid_subscribe box-shadow-5 radius-8 p-20 px-20">
        <!-- Search -->

        {{-- <div class="d-flex flex-wrap g-15 mb-20">
            @include('frontend.paid_content.search', ['type' => 'subscribers'])
        </div> --}}

        {{-- subscribers list --}}
        {{-- @if ($subscribers->count() > 0)
            <div class="creator-items-wrap">

                @foreach ($subscribers as $subscriber)
                    <div class="subscriber-item">
                        <a href="{{ route('user.profile.view', ['id' => $subscriber->subscriber_id]) }}"
                            class="c-search-item align-items-center" target="_blank">
                            <div class="logo position-relative me-2 load-item">
                                <img src="{{ get_user_image($subscriber->subscriber_id, 'optimized') }}" height="100%" />
                            </div>
                            <div class="info">
                                <h4>{{ $subscriber->name }}</h4>
                                <p>{{ $subscriber->email }}</p>
                            </div>
                        </a>
                    </div>
                @endforeach
            </div>
        @else
            <div class="no-package d-flex justify-content-center align-items-center py-4 mt-3">
                <p class="text-16px fw-bolder">{{get_phrase('No subscribers yet.')}}</p>
            </div>
        @endif --}}
        <div class="bg-white">
            @if (count($subscribers) > 0)
                <div class="creator-items-wrap">
                    <div class="content-area single-content-list subscription">
                        <table class="table table-borderless subs_table">
                            <thead>
                                <tr class="table-heading">
                                    <th scope="col">{{get_phrase('No')}}</th>
                                    <th scope="col">{{get_phrase('Subscriber')}}</th>
                                    <th scope="col" class="text-center">{{get_phrase('Package')}}</th>
                                    <th scope="col" class="text-center">{{get_phrase('Package price')}}</th>
                                    <th scope="col" class="text-end">{{get_phrase('Joined on')}}</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($subscribers as $key => $subscriber)
                                    <tr class="single-row">
                                        <th scope="row">
                                            <div class="single-cell ps-md-3 d-flex align-items-center">
                                                <div class="cell-item">
                                                    <p>{{ ++ $key }}</p>
                                                </div>
                                            </div>
                                        </th>
                                        <td>
                                            <div class="single-cell flex-center">
                                                <div class="cell-item d-flex gap-3">
                                                    <a target="_blank" href="{{ route('user.profile.view', ['id' => $subscriber->subscriber_id]) }}">
                                                    <p>{{ $subscriber->name }}</p>
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
        
                                        <td>
                                            <div class="single-cell flex-center">
                                                <div class="cell-item d-flex gap-3">
                                                    <p>{{ $subscriber->package_title }}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="single-cell flex-center">
                                                <div class="cell-item">
                                                    <p>{{ currency($subscriber->package_price) }}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="single-cell d-flex justify-content-end align-items-center">
                                                <div class="cell-item">
                                                    <p class="issue-date">
                                                        {{ date('Y-m-d', $subscriber->issue_date) }}</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                @endforeach
        
                            </tbody>
                        </table>
        
                        <div class="d-flex justify-content-end">
                            {{ $subscribers->links() }}
                        </div>
                    </div>
                </div>
            @else
                <div class="no-package d-flex justify-content-center align-items-center mt-3">
                    <p class="m-0 py-4">{{get_phrase('No subscribers yet.')}}</p>
                </div>
            @endif
        </div>
    </div>
