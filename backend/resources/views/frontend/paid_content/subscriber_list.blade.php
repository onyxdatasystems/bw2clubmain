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
                                            <p>{{ $subscribers->firstItem() + $key }}</p>
                                        </div>
                                    </div>
                                </th>
                                <td>
                                    <div class="single-cell">
                                        <div class="cell-item d-flex gap-3">
                                            <div class="user_img">
                                                <img src="{{ get_user_image($subscriber->subscriber_id, 'optimized') }}"
                                                    height="100%">
                                            </div>
                                            <div class="user_info">
                                                <h6>{{ $subscriber->name }}</h6>
                                                <p>{{ $subscriber->email }}</p>
                                            </div>
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
