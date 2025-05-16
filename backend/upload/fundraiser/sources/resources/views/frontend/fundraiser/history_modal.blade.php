<div class="payment-history">
    <!-- Table -->
    <div class="table-responsive px-30 py-30 ">
        <table class="table eTable tableCustom">
            <!-- Table Head -->
            <thead>
                <tr>
                    <th scope="col">{{get_phrase('Serial')}}</th>
                    <th scope="col">{{get_phrase('Name')}}</th>
                    <th scope="col">{{get_phrase('Amount')}}</th>
                    <th scope="col">{{get_phrase('Date Processed')}}</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($phistory as $key => $row)
                    <tr>
                        <td>
                            <div class="mi-w-108">
                                <p class="m-0">{{ ++$key }}</p>
                            </div>
                        </td>
                        <td>
                            <div class="mi-w-110">
                                <p class="m-0">{{ $row->name }}</p>
                            </div>
                        </td>
                        <td>
                            <div class="mi-w-110">
                                <span class="m-0">{{ $row->amount }}</span>
                            </div>
                        </td>
                        <td>
                            <div class="mi-w-110">
                                <span class="t-badge">{{ $row->created_at }}</span>
                            </div>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div>
</div>
