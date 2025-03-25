<form>
    @csrf
    <button type="button" class="custom_date_btn">
        <span class="date-report-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                <g clip-path="url(#clip0_54_1122)">
                    <path
                        d="M7.2194 10.5H5.55273C4.63357 10.5 3.88607 11.2475 3.88607 12.1667V13.8333C3.88607 14.7525 4.63357 15.5 5.55273 15.5H7.2194C8.13857 15.5 8.88607 14.7525 8.88607 13.8333V12.1667C8.88607 11.2475 8.13857 10.5 7.2194 10.5ZM5.55273 13.8333V12.1667H7.2194V13.8333H5.55273ZM16.3861 2.16667H15.5527V1.33333C15.5527 0.873333 15.1802 0.5 14.7194 0.5C14.2586 0.5 13.8861 0.873333 13.8861 1.33333V2.16667H7.2194V1.33333C7.2194 0.873333 6.8469 0.5 6.38607 0.5C5.92523 0.5 5.55273 0.873333 5.55273 1.33333V2.16667H4.7194C2.4219 2.16667 0.552734 4.03583 0.552734 6.33333V16.3333C0.552734 18.6308 2.4219 20.5 4.7194 20.5H16.3861C18.6836 20.5 20.5527 18.6308 20.5527 16.3333V6.33333C20.5527 4.03583 18.6836 2.16667 16.3861 2.16667ZM4.7194 3.83333H16.3861C17.7644 3.83333 18.8861 4.955 18.8861 6.33333V7.16667H2.2194V6.33333C2.2194 4.955 3.34107 3.83333 4.7194 3.83333ZM16.3861 18.8333H4.7194C3.34107 18.8333 2.2194 17.7117 2.2194 16.3333V8.83333H18.8861V16.3333C18.8861 17.7117 17.7644 18.8333 16.3861 18.8333Z"
                        fill="white" />
                </g>
                <defs>
                    <clipPath id="clip0_54_1122">
                        <rect width="20" height="20" fill="white" transform="translate(0.552734 0.5)" />
                    </clipPath>
                </defs>
            </svg>
        </span>
        <span class="ps-3 select-date">
            <input type="button" name="select-date" value="{{ date('d-m-Y') }}" id="select-date" />
        </span>
    </button>
</form>

<div class="reports mt-4">
    @include('frontend.fundraiser.payout_report_day')
</div>


<script>
    $(function() {
        $('input[name="select-date"]').daterangepicker({
            singleDatePicker: true,
            showDropdowns: true,
            locale: {
                format: "DD-MM-YYYY",

            },
            minYear: 1901,
            maxYear: parseInt(moment().format('YYYY'), 10)
        }, function(start, end, label) {
            var years = moment().diff(start, 'years');
        });
    });

    $(function(e) {
        $('#select-date').change(function() {
            var date = $(this).val();

            $.ajax({
                type: "get",
                url: "{{ route('test') }}",
                data: {
                    date: date,
                },
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')
                },
                success: function(response) {
                    $('.reports').empty();
                    $('.reports').append(response);
                }
            })
        });
    })
</script>
