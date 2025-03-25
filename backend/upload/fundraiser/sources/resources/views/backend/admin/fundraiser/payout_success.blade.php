<div class="table-responsive">
    <table class="table eTable w-100" id="server_side_users_data">
        <thead>
            <tr>
                <th>#</th>
                <th>{{ get_phrase('Name') }}</th>
                <th class="text-center">{{ get_phrase('Amount') }}</th>
                <th class="text-center">{{ get_phrase('Issue Date') }}</th>
                <th class="text-center">{{ get_phrase('Payout Date') }}</th>
                <th class="text-center">{{ get_phrase('Method') }}</th>
                <th class="text-center">{{ get_phrase('Status') }}</th>
                @if ($type == 'pending')
                    <th class="text-center">{{ get_phrase('Actions') }}</th>
                @endif
            </tr>
        </thead>
        <tbody>
            @foreach ($reports as $key => $report)
                @php
                    $info = DB::table('users')
                        ->where('id', $report->user_id)
                        ->first();
                @endphp
                <tr>
                    <td>{{ $reports->firstItem() + $key }}</td>
                    <td>{{ $info->name }}</td>
                    <td class="text-center"><b>{{ $report->requested_amount }}$</b></td>
                    <td class="text-center">{{ $report->issue_date }}</td>
                    <td class="text-center">{{ $report->received_date }}</td>
                    <td class="text-center">{{ $report->payment_method }}</td>
                    <td class="text-center">
                        @if ($report->status > 0)
                            <button class="btn btn-success" disabled>
                                <i class="fa-solid fa-check-double me-2" style="font-size: 12px"></i>Paid</button>
                        @else
                            <a href="{{ route('campaign.payout', ['id' => $report->id]) }}" class="btn btn-danger">
                                <i class="fa-regular fa-credit-card me-2" style="font-size: 12px"></i>Pay</a>
                        @endif
                    </td>

                    @if ($type == 'pending')
                        <td class="text-center">
                            @if ($report->status > 0)
                                <button class="btn btn-light" disabled>Delete</button>
                            @else
                                <a href="{{ route('delete.payout', ['id' => $report->id]) }}"
                                    class="btn btn-danger">Delete</a>
                            @endif
                        </td>
                    @endif

                </tr>
            @endforeach
        </tbody>
    </table>

    <div class="d-flex justify-content-end">
        {{ $reports->links() }}
    </div>
</div>
