<form action="{{ route('update.package', $package->id) }}" method="post" class="d-flex p_form flex-column gap-3">
    @csrf

    {{-- pcakage title --}}
    <div class="product-form">
        <label for="eInputPackageTitle" class="eForm-label">{{get_phrase('Package Title')}}</label>
        <input type="text" class="form-control eForm-control" id="eInputPackageTitle" name="title"
            value="{{ $package->title }}" aria-label="Package Title" />
    </div>

    {{-- pcakage description --}}
    <div class="product-form">
        <label for="eInputDescription" class="eForm-label">{{get_phrase('Description')}}</label>
        <input type="text" class="form-control eForm-control" id="eInputDescription" name="description"
            value="{{ $package->description }}" aria-label="Description" />
    </div>

    {{-- pcakage price --}}
    <div class="product-form">
        <label for="eInputMonthlyPrice" class="eForm-label">{{get_phrase('Monthly Price')}}</label>
        <div class="input-group pcMonthlyPrice" id="eInputMonthlyPrice">
            <span class="input-group-text" id="basic-addon1">{{currency()}}</span>
            <input type="text" class="form-control eForm-control" value="{{ $package->price }}" min="1"
                name="price" aria-describedby="basic-addon1" />
        </div>
    </div>

    {{-- submit & cancle button --}}
    <div class="d-flex w-100 gap-3 mt-2">
        <div class="w-50">
            <button type="button" class="btn-cancel border-0" data-bs-dismiss="modal">{{get_phrase('Cancel')}}</button>
        </div>
        <div class="w-50">
            <button type="submit" class="btn-save border-0">{{get_phrase('Save')}}</button>
        </div>
    </div>

</form>

<script>
    $(document).ready(function() {
        $('.btn-cancel').click(function(e) {
            e.preventDefault();
            $('.custom-modal').removeClass('custom-modal-show');
        });
    });
</script>
@include('frontend.initialize')
