<div class="content-area single-content-list payout" id="printableDivs">
    @if (count($reports) > 0)
        <table class="table table-borderless">
            <thead>
                <tr class="table-heading">
                    <th scope="col">{{get_phrase('Serial')}}</th>
                    <th scope="col" class="text-center">{{get_phrase('Payout')}}</th>
                    <th scope="col" class="text-center">{{get_phrase('Amount')}}</th>
                    <th scope="col" class="text-center">{{get_phrase('Received')}}</th>
                    <th scope="col" class="text-center">{{get_phrase('Method')}}</th>
                    {{-- <th scope="col" class="text-center">{{get_phrase('Invoice')}}</th> --}}
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
                        {{-- <td>
                            <div class="single-cell flex-center">
                                <div class="cell-item download-invoice flex-center">

                                    <a href="javascript:;" onclick="printableDivs('printableDivs')" class="print-invoice">
                                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M7.56807 12.7151C8.34888 13.4964 9.61519 13.4969 10.3965 12.716C10.3968 12.7157 10.3971 12.7154 10.3974 12.7151L12.5381 10.5745C12.785 10.3014 12.7638 9.87979 12.4907 9.63285C12.2364 9.40295 11.8492 9.40335 11.5954 9.63379L9.64475 11.5851L9.64941 1.30048C9.64938 0.932258 9.35091 0.633789 8.98272 0.633789C8.61454 0.633789 8.31607 0.932258 8.31607 1.30045L8.31007 11.5724L6.37007 9.63379C6.10957 9.37348 5.68738 9.37363 5.42707 9.63413C5.16675 9.89463 5.16691 10.3168 5.42741 10.5771L7.56807 12.7151Z"
                                                fill="white" />
                                            <path
                                                d="M16.3163 11.3008C15.9481 11.3008 15.6496 11.5992 15.6496 11.9674V14.6341C15.6496 15.0023 15.3511 15.3008 14.9829 15.3008H2.98291C2.61472 15.3008 2.31625 15.0023 2.31625 14.6341V11.9675C2.31625 11.5993 2.01779 11.3008 1.6496 11.3008C1.28138 11.3008 0.98291 11.5993 0.98291 11.9675V14.6341C0.98291 15.7387 1.87835 16.6341 2.98291 16.6341H14.9829C16.0875 16.6341 16.9829 15.7387 16.9829 14.6341V11.9675C16.9829 11.5993 16.6844 11.3008 16.3163 11.3008Z"
                                                fill="white" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </td> --}}
                    </tr>
                @endforeach
            </tbody>
        </table>

        <div class="d-flex justify-content-end">
            {{ $reports->links() }}
        </div>
    @else
        <div class="no-package d-flex justify-content-center align-items-center mt-3">
            <p class="m-0 py-4">{{get_phrase('No payments are done.')}}</p>
        </div>
    @endif
</div>


<script type="text/javascript">
    "use strict"

    function printableDivs(printableAreaDivId) {
        var printContents = document.getElementById(printableAreaDivId).innerHTML;
        var originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;

        window.print();

        document.body.innerHTML = originalContents;
    }
</script>
