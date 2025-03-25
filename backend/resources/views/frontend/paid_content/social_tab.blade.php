<div class="tab-pane fade" id="socialNetwork" role="tabpanel" aria-labelledby="socialNetwork-tab">
    <!-- Form -->
    <div class="p-20 py-30 box-shadow-5 bg-white radius-8">
        <form action="{{ route('update.settings', auth()->user()->id) }}" method="post" class="d-flex flex-column g-20">
            @csrf

            {{-- define update field --}}
            <input type="hidden" name="update" value="social">

            @php
                $social_media = json_decode($creator->social_accounts);
            @endphp

            @foreach ($social_media as $key => $name)
                <div class="input-wrap">
                    <label for="eInputInstagram" class="eForm-label text-capitalize">{{ $key }}</label>
                    <input type="text" class="form-control eForm-control" id="eInputInstagram"
                        name="{{ $key }}"
                        @if ($name != '') value="{{ $name }}" aria-label="{{ $name }}" 
                        @else placeholder="http//www" aria-label="http//www" @endif />
                </div>
            @endforeach

            <!-- Form Button -->
            <div class="form-btn-group d-flex justify-content-center gap-3 mt-10">
                <button type="reset" class="btn-cancel">{{get_phrase('Cancel')}}</button>
                <button type="submit" class="btn-save border-0">{{get_phrase('Save')}}</button>
            </div>
        </form>
    </div>
</div>
