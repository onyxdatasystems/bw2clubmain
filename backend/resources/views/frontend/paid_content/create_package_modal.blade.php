<button type="button" class="btn-save border-0" data-bs-toggle="modal" data-bs-target="#addpackageModal">
    {{get_phrase('Add Package')}}
</button>


<div class="modal fade p-0" id="addpackageModal" tabindex="-1" aria-labelledby="addPackage" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">

            <div class="modal-header">
                <h5 class="modal-title text-center" id="addPackage">{{get_phrase('Add Package')}}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                    <i class="fa fa-close"></i>
                </button>
            </div>

            <div class="modal-body">
                <form action="{{ route('create.package') }}" method="post" class="d-flex flex-column gap-3">
                    @csrf

                    {{-- pcakage title --}}
                    <div class="product-form">
                        <label for="eInputPackageTitle" class="eForm-label">{{get_phrase('Package Title')}}</label>
                        <input type="text" class="form-control eForm-control" id="eInputPackageTitle" name="title"
                            placeholder="Package Title" aria-label="Package Title" required />
                    </div>

                    {{-- pcakage description --}}
                    <div class="product-form">
                        <label for="eInputDescription" class="eForm-label">{{get_phrase('Description')}}</label>
                        <input type="text" class="form-control eForm-control" id="eInputDescription"
                            name="description" placeholder="Description" aria-label="Description" required />
                    </div>

                    {{-- pcakage facilities --}}
                    {{-- <div class="product-form d-flex flex-column">
                        <label for="#" class="eForm-label">Facilities</label>
                        <select name="facilities" class="w-100" required>
                            <option value="">{{ get_phrase('Select facility') }}</option>
                            <option value="Choice1">Choice1</option>
                            <option value="Choice1">Choice2</option>
                            <option value="Choice1">Choice3</option>
                            <option value="Choice1">Choice4</option>
                        </select>
                    </div> --}}

                    {{-- pcakage status --}}
                    {{-- <div class="product-form d-flex flex-column">
                        <label for="#" class="eForm-label">Status</label>
                        <select name="status" class="w-100" required>
                            <option value="">Select package status</option>
                            <option value="1">Active</option>
                            <option value="0">Deactive</option>
                        </select>
                    </div> --}}

                    {{-- pcakage price --}}
                    <div class="product-form">
                        <label for="eInputMonthlyPrice" class="eForm-label">{{get_phrase('Monthly Price')}}</label>
                        <div class="input-group pcMonthlyPrice" id="eInputMonthlyPrice">
                            <span class="input-group-text"
                                id="basic-addon1">$</span>
                            <input type="text" class="form-control eForm-control" placeholder="00" min="1"
                                name="price" aria-describedby="basic-addon1" required />
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
            </div>

        </div>
    </div>
</div>
