    <div class="settings-wraper package_wrapper">
        <div class="box-shadow-5 radius-8 p-20 bg-white">

            {{-- create package modal --}}
            @include('frontend.paid_content.create_package_modal')


            {{-- package lists --}}
            @if ($packages->count() > 0)
                <div class="package-list d-flex flex-column gap-3 mt-3">
                    @foreach ($packages as $package)
                        @php
                            $page_title = DB::table('paid_content_creators')
                                ->where('user_id', $package->user_id)
                                ->first();
                        @endphp
                            <div class="paid-membership-item d-flex flex-column justify-content-between border border-secondary"
                            id="package{{ $package->id }}">
                            <div>
                                <div class="d-flex justify-content-between">
                                    <h6 class="title package-title">{{ $package->title }}</h6>
                                    <div class="actions d-flex gap-3">
                                        <a href="javascript:void(0)"
                                            onclick="showCustomModal('<?php echo route('edit.package', $package->id); ?>', '{{ get_phrase('Edit Package') }}', '')">
                                            {{ get_phrase('Edit') }}</a>

                                        <a href="javascript:void(0)"
                                            onclick="confirmAction('<?php echo route('delete.package', ['id' => $package->id]); ?>')">{{get_phrase('Delete')}}</a>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 class="price"><span>${{ $package->price }}</span>
                                </h4>
                            </div>
                        </div>
                    @endforeach
                </div>
            @else
                <div class="no-package d-flex justify-content-center align-items-center py-4 mt-3">
                    <p class="text-16px fw-bolder">{{get_phrase('No packages')}}</p>
                </div>
            @endif
        </div>
    </div>
