<h3 class="fz-28-sb-38-black pb-3 m-0">
   {{get_phrase('Become a paid content creator and earn money')}}
</h3>
<a href="#" class="btn-started mb-3" data-bs-toggle="modal" data-bs-target="#confirmSweetAlerts">{{get_phrase('Get
    Started')}}</a>
<div class="modal sm_modal sp_Modal fade" id="confirmSweetAlerts" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered paidModals">
        <div class="modal-content">
            <div class="modal-body d-block">
                <div class="creator_request_section px-5">
                    <p>{{get_phrase('Tell us about your page')}}</p>
                    {{-- request field section --}}
                    <form action="{{ route('request.author', auth()->user()->id) }}" method="post">
                        @csrf
                        <div class="mb-3">
                            <input type="text" class="form-control py-2" placeholder="Page name"
                                aria-label="Page name" name="title" required />
                        </div>

                        <div class="mb-3">
                            <textarea class="about-page form-control" placeholder="About page" name="description" required></textarea>
                        </div>

                        <div class="get-started-btn gap-3">
                            <a class="sign-btn cancle-btn" data-bs-dismiss="modal">{{get_phrase('Cancel')}}</a>
                            <button type="submit" class="sign-btn">{{get_phrase('Submit')}}</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>
</div>
