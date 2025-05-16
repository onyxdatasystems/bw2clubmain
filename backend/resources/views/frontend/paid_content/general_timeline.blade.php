    @php
        $query = DB::table('paid_content_creators')
            ->where('user_id', auth()->user()->id)
            ->first();
    @endphp


    <div class="settings-wraper paid_wraper overflow-visible">
        {{-- become a paid content creator --}}
        <div class="bg-white box-shadow-5 p-20 mb-20  radius-8 text-center">
            @if ($query)
                @if ($query->status == -1)
                    <h3 class="fz-28-sb-38-black m-0">{{get_phrase('Please wait, Admin will response soon.')}}</h3>
                @elseif($query->status == 0)
                    <h3 class="fz-28-sb-38-black m-0">{{get_phrase('Admin temporarily deactivated your page.')}}</h3>
                @endif
            @else
                @include('frontend.paid_content.get_started')
            @endif
        </div>

        <div class="bg-white box-shadow-5  radius-8 p-20 px-20">
            <div class="d-flex flex-wrap g-15 mb-20">
                @include('frontend.paid_content.search', ['type' => 'creator'])
            </div>
            <!-- Creator list -->
            @if ($creators->count() > 0)
                <div class="creator-items-wrap">
                    <div class="row">
                        @foreach ($creators as $creator)
                            <div class="col-xl-3 col-lg-4 col-md-3 col-sm-4 col-6">
                                <div class="crator-items">
                                    <img src="{{ asset('assets/frontend/images/' . $creator->cover_photo) }}"
                                        alt="" />
                                    <a href="{{ route('page.view', ['page' => $creator->title, 'id' => $creator->user_id]) }}"
                                        class="link">{{ $creator->title }}</a>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            @else
                <div class="no-package d-flex justify-content-center align-items-center py-4 mt-3">
                    <p class="text-16px fw-bolder" style="color: #101010">{{get_phrase('No creator is available')}}</p>
                </div>
            @endif
        </div>
    </div>
