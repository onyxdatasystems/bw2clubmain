<div class="bg-white">
    @if (count($payments) > 0)
        <div class="creator-items-wrap">
            <div class="content-area single-content-list user_subscription">
                <table class="table table-borderless">
                    <thead>
                        <tr class="table-heading">
                            <th scope="col">No</th>
                            <th scope="col">Creator</th>
                            <th scope="col" class="text-center">Payment on</th>
                            <th scope="col" class="text-center">Amount</th>
                            <th scope="col" class="text-center">Method</th>
                            <th scope="col" class="text-center">Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($payments as $key => $item)
                            @php
                                $info = DB::table('paid_content_packages')
                                    ->where('id', $item->item_id)
                                    ->first();
                            @endphp

                            <tr class="single-row">
                                <th scope="row">
                                    <div class="single-cell ps-md-3 d-flex align-items-center">
                                        <div class="cell-item">
                                            <p>{{ $payments->firstItem() + $key }}</p>
                                        </div>
                                    </div>
                                </th>
                                <td>
                                    <div class="single-cell">
                                        <div class="cell-item d-flex gap-3">
                                            <div class="list-img-pic">
                                                <img src="{{ get_user_image($info->user_id, 'optimized') }}"
                                                    height="100%">
                                            </div>
                                            @php
                                                $user = DB::table('users')
                                                    ->where('id', $info->user_id)
                                                    ->first();
                                            @endphp
                                            <div>
                                                <h6>{{ $user->name }}</h6>
                                                <p>{{ $user->email }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <div class="single-cell flex-center">
                                        <div class="cell-item d-flex gap-3">
                                            <p class="issue-date">
                                                {{ date('d-m-Y', strtotime($item->created_at)) }}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="single-cell flex-center">
                                        <div class="cell-item">
                                            <p>
                                                {{ $item->amount }} {{ get_settings('system_currency') }}</p>
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="single-cell flex-center">
                                        <div class="cell-item cell-item d-flex a;ign-items-center">
                                            <p>
                                                {{ $item->identifier }}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="single-cell flex-center">
                                        <div class="cell-item cell-item d-flex a;ign-items-center">
                                            <p>
                                                {{ $item->item_type }}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                            </tr>
                        @endforeach

                    </tbody>
                </table>

                <div class="d-flex justify-content-end">
                    {{ $payments->links() }}
                </div>
            </div>
        </div>
    @else
        <div class="no-package d-flex justify-content-center align-items-center mt-3">
            <p class="m-0 py-4">No subscriptions yet.</p>
        </div>
    @endif
</div>
