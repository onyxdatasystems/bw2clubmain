@php
    if ($type == 'valid') {
        $subscription = $valid;
    } else {
        $subscription = $expired;
    }
@endphp

<div class="bg-white">
    @if (count($subscription) > 0)
        <div class="creator-items-wrap">
            <div class="content-area single-content-list user_subscription">
                <table class="table table-borderless">
                    <thead>
                        <tr class="table-heading">
                            <th scope="col">No</th>
                            <th scope="col">Creator</th>
                            <th scope="col" class="text-center">Joined</th>
                            <th scope="col" class="text-center">Expires</th>
                            <th scope="col" class="text-center">Status</th>
                            <th scope="col" class="text-center">View Page</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($subscription as $key => $subscriber)
                            <tr class="single-row">
                                <th scope="row">
                                    <div class="single-cell ps-md-3 d-flex align-items-center">
                                        <div class="cell-item">
                                            <p>{{ $subscription->firstItem() + $key }}</p>
                                        </div>
                                    </div>
                                </th>
                                <td>
                                    <div class="single-cell">
                                        <div class="cell-item d-flex gap-3">
                                            <div class="list-img-pic">
                                                <img src="{{ get_user_image($subscriber->creator_id, 'optimized') }}"
                                                    height="100%">
                                            </div>
                                            <div>
                                                @php
                                                    $info = App\Models\Users::where('id', $subscriber->creator_id)->first();
                                                @endphp
                                                <h6>{{ $info->name }}</h6>
                                                <p>{{ $info->email }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <div class="single-cell flex-center">
                                        <div class="cell-item d-flex gap-3">
                                            <p>
                                                {{ date('d-m-Y', $subscriber->issue_date) }}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="single-cell flex-center">
                                        <div class="cell-item">
                                            <p class="issue-date">
                                                {{ date('d-m-Y', $subscriber->expire_date) }}</p>
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="single-cell flex-center">
                                        <div class="cell-item cell-item d-flex a;ign-items-center">
                                            <p>
                                                @if ($subscriber->status == 0)
                                                    <span class="badge rounded-pill bg-warning">Expired</span>
                                                @else
                                                    <span class="badge rounded-pill bg-primary">Valid</span>
                                                @endif
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="single-cell flex-center">
                                        <div class="cell-item cell-item d-flex a;ign-items-center">
                                            @php
                                                $page = App\Models\PaidContentCreator::where('user_id', $subscriber->creator_id)->value('title');
                                            @endphp
                                            <p>
                                                <a href="{{ route('page.view', ['page' => $page, 'id' => $subscriber->creator_id]) }}"
                                                    class="btn btn-primary">View page</a>
                                            </p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        @endforeach

                    </tbody>
                </table>

                <div class="d-flex justify-content-end">
                    {{ $subscription->links() }}
                </div>
            </div>
        </div>
    @else
        <div class="no-package d-flex justify-content-center align-items-center mt-3">
            <p class="m-0 py-4">No subscriptions yet.</p>
        </div>
    @endif
</div>
