@php
    $reports = DB::table('paid_content_payouts')
        ->where('user_id', auth()->user()->id)
        ->latest('id')
        ->paginate(10);
@endphp
<div class="content-area single-content-list payout" id="printableDiv">
    @if (count($reports) > 0)
        <table class="table table-borderless">
            <thead>
                <tr class="table-heading">
                    <th scope="col">{{get_phrase('Serial')}}</th>
                    <th scope="col" class="text-center">{{get_phrase('Payout')}}</th>
                    <th scope="col" class="text-center">{{get_phrase('Amount')}}</th>
                    <th scope="col" class="text-center">{{get_phrase('Received')}}</th>
                    <th scope="col" class="text-center">{{get_phrase('Method')}}</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($reports as $key => $report)
                    <tr class="single-row @if ($report->status == 0) table-light @endif">
                        <th scope="row">
                            <div class="single-cell ps-md-3 d-flex align-items-center">
                                <div class="cell-item">
                                    <p>{{ $reports->firstItem() + $key }}</p>
                                </div>
                            </div>
                        </th>
                        <td>
                            <div class="single-cell flex-center">
                                <div class="cell-item">
                                    <p>{{ date('Y-m-d', strtotime($report->issue_date)) }}</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="single-cell flex-center">
                                <div class="cell-item">
                                    <p>{{ $report->requested_amount }}$</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="single-cell flex-center">
                                <div class="cell-item">
                                    @if ($report->status > 0)
                                        <p class="issue-date">
                                            {{ date('Y-m-d', strtotime($report->received_date)) }}
                                        </p>
                                    @else
                                        <span class="badge bg-danger">{{get_phrase('Pending')}}</span>
                                    @endif
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="single-cell flex-center">
                                <div class="cell-item">
                                    @if ($report->status > 0)
                                        <p>{{ $report->payment_method }}</p>
                                    @else
                                        <span class="badge bg-danger">{{get_phrase('Pending')}}</span>
                                    @endif

                                </div>
                            </div>
                        </td>
                    </tr>
                @endforeach

            </tbody>
        </table>

        <div class="d-flexjustify-content-end">
            {{ $reports->links() }}
        </div>
    @else
        <div class="no-package d-flex justify-content-center align-items-center mt-3">
            <p class="m-0 py-4">No payments are done.</p>
        </div>
    @endif
</div>


<script type="text/javascript">
    "use strict"

    function printableDiv(printableAreaDivId) {
        var printContents = document.getElementById(printableAreaDivId).innerHTML;
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    }
</script>
