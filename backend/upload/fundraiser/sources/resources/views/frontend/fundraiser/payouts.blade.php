@php
    $query = App\Models\Fundraiser_payout::where('user_id', auth()->user()->id)
        ->where('status', 0)
        ->latest('id');
    
    $balance = $query->first();
    $requested_amount = 0;
    if (isset($balance->requested_amount)) {
        $requested_amount = $balance->requested_amount;
    }
    $old_request = $query;
    $request = $request_id = 0;

    if ($old_request->exists()) {
        $old_request = $old_request->first();
        $request_id = $old_request->id;
        $request = 1;
    }
@endphp
<div class="payout-report settings-wraper">
    <!-- Withdrawal Options --> 
    <div class="withdrawalOptions  bg-white radius-8 p-20 mb-12 blog-type res_funrai ">

        <div class="row">
            <div class="col-md-4 col-sm-12">
                <div class="withdrawal-items">
                    <h4 class="title">{{get_phrase('Main Balance')}}</h4>
                    <p class="withdrawal-amount">{{ currency(number_format($main_balance, 2)) }}</p>
                    <p class="info">
                        {{get_phrase('Minimum withdrawal amount')}} <span>{{currency(get_phrase('50'))}}</span>
                    </p>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="withdrawal-items">
                    <h4 class="title">{{get_phrase('Total Payouts')}}</h4>
                    <p class="withdrawal-amount">{{ currency(number_format($total_payout, 2)) }}</p>
                    <p class="withdrawal-amount"></p>
                    <p class="info">
                       {{get_phrase(' It takes max')}} <span>{{get_phrase('2 days')}}</span>{{get_phrase('for verification')}}
                    </p>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">

                <div class="withdrawal-items">
                    <h4 class="title d-flex justify-content-between align-items-center"><span>{{get_phrase('Requested withdrawal')}}</span>

                        @if ($request == 1)
                            <span class="badge bg-warning">{{get_phrase('Pending')}}</span>
                        @endif

                    </h4>
                    <p class="withdrawal-amount">{{ currency(number_format($requested_amount, 2)) }}</p>
                    <p class="info">
                       {{get_phrase(' Minimum withdrawal amount')}} <span>{{currency(get_phrase('50'))}}</span>
                    </p>
                </div>
            </div>
        </div>

        @if ($request == 1)
            <div class="d-flex justify-content-end mt-3">
                <a onclick="confirmAction('<?php echo  route('campaign.payout.cancel', ['id' => $request_id]); ?>')" href="javascript:;"
                    class="btn text-white py-2 cancel-btn">{{get_phrase('Cancel Request')}}</a>
            </div>
        @else
            @include('frontend.fundraiser.payout_request')
        @endif

    </div>
    <!-- Payment History -->
    <div class="payment-history">
        <div class="content-panel">
            <div class=" bg-white radius-8 p-20 mb-12 blog-type res_funrai">
                <div class="pay_history d-flex justify-content-between">
                    <h4 class="fz-20-b-22-black mb-0">{{get_phrase('Payouts History')}}</h4>
                    <a href="javascript:;" onclick="printableDiv('printableDiv')" class="print-invoice "> <svg width="17" height="17" viewBox="0 0 17 17" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7.56807 12.7151C8.34888 13.4964 9.61519 13.4969 10.3965 12.716C10.3968 12.7157 10.3971 12.7154 10.3974 12.7151L12.5381 10.5745C12.785 10.3014 12.7638 9.87979 12.4907 9.63285C12.2364 9.40295 11.8492 9.40335 11.5954 9.63379L9.64475 11.5851L9.64941 1.30048C9.64938 0.932258 9.35091 0.633789 8.98272 0.633789C8.61454 0.633789 8.31607 0.932258 8.31607 1.30045L8.31007 11.5724L6.37007 9.63379C6.10957 9.37348 5.68738 9.37363 5.42707 9.63413C5.16675 9.89463 5.16691 10.3168 5.42741 10.5771L7.56807 12.7151Z"
                            fill="white" />
                        <path
                            d="M16.3163 11.3008C15.9481 11.3008 15.6496 11.5992 15.6496 11.9674V14.6341C15.6496 15.0023 15.3511 15.3008 14.9829 15.3008H2.98291C2.61472 15.3008 2.31625 15.0023 2.31625 14.6341V11.9675C2.31625 11.5993 2.01779 11.3008 1.6496 11.3008C1.28138 11.3008 0.98291 11.5993 0.98291 11.9675V14.6341C0.98291 15.7387 1.87835 16.6341 2.98291 16.6341H14.9829C16.0875 16.6341 16.9829 15.7387 16.9829 14.6341V11.9675C16.9829 11.5993 16.6844 11.3008 16.3163 11.3008Z"
                            fill="white" />
                    </svg>{{get_phrase('Print')}}</a>
                </div>
                 @include('frontend.fundraiser.payout_reports')
         </div> 
        </div>
    </div>

    <!-- Complate campaign History -->
    {{-- <div class="payment-history mt-4">
        <div class="content-panel">
            @include('frontend.fundraiser.complate_campaign_history')
        </div>
    </div> --}}

    <!--  campaign payout History  by date-->
    <div class="payment-history mt-4">
        <div class="content-panel">
            <div class="bg-white radius-8 p-20 mb-12 blog-type res_funrai">
                <div class="pay_history d-flex justify-content-between">
                    <h4 class="fz-20-b-22-black mb-0">{{get_phrase('Payment History')}}</h4>
                    <a href="javascript:;" onclick="printableDivs('printableDivs')" class="print-invoice "> <svg width="17" height="17" viewBox="0 0 17 17" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7.56807 12.7151C8.34888 13.4964 9.61519 13.4969 10.3965 12.716C10.3968 12.7157 10.3971 12.7154 10.3974 12.7151L12.5381 10.5745C12.785 10.3014 12.7638 9.87979 12.4907 9.63285C12.2364 9.40295 11.8492 9.40335 11.5954 9.63379L9.64475 11.5851L9.64941 1.30048C9.64938 0.932258 9.35091 0.633789 8.98272 0.633789C8.61454 0.633789 8.31607 0.932258 8.31607 1.30045L8.31007 11.5724L6.37007 9.63379C6.10957 9.37348 5.68738 9.37363 5.42707 9.63413C5.16675 9.89463 5.16691 10.3168 5.42741 10.5771L7.56807 12.7151Z"
                            fill="white" />
                        <path
                            d="M16.3163 11.3008C15.9481 11.3008 15.6496 11.5992 15.6496 11.9674V14.6341C15.6496 15.0023 15.3511 15.3008 14.9829 15.3008H2.98291C2.61472 15.3008 2.31625 15.0023 2.31625 14.6341V11.9675C2.31625 11.5993 2.01779 11.3008 1.6496 11.3008C1.28138 11.3008 0.98291 11.5993 0.98291 11.9675V14.6341C0.98291 15.7387 1.87835 16.6341 2.98291 16.6341H14.9829C16.0875 16.6341 16.9829 15.7387 16.9829 14.6341V11.9675C16.9829 11.5993 16.6844 11.3008 16.3163 11.3008Z"
                            fill="white" />
                    </svg>{{get_phrase('Print')}}</a>
                </div>
                @include('frontend.fundraiser.payment_history_report')
           </div>
        </div>
    </div>





    



</div>
