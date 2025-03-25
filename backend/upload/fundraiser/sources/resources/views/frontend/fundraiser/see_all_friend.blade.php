<!-- Invite Friend -->

<div class="container">
    <div class="row">
        <div class="col"></div>
        <div class="col-md-7">
            <div class="px-5">

                <h4 class="mb-5">See more friends</h3>
                    {{-- ..........start......................................................................... --}}

                    @foreach ($friendships as $friendship)
                        @if ($friendship->requester == auth()->user()->id)
                            @php
                                $friends_user_data = DB::table('users')
                                    ->where('id', $friendship->accepter)
                                    ->first();
                            @endphp
                        @else
                            @php
                                $friends_user_data = DB::table('users')
                                    ->where('id', $friendship->requester)
                                    ->first();
                            @endphp
                        @endif



                        {{--  chekcing invite is already done or not   --}}
                        @php
                            $invite_details = DB::table('invites')
                                ->where('invite_reciver_id', $friends_user_data->id)
                                ->where('fundraiser_id', $fundraiser->id)
                                ->first();
                        @endphp

                        @php
                            $number_of_friend_friends = json_decode($friends_user_data->friends);
                            $number_of_my_friends = json_decode($user_info->friends);
                            
                            if (!is_array($number_of_friend_friends)) {
                                $number_of_friend_friends = [];
                            }
                            if (!is_array($number_of_my_friends)) {
                                $number_of_my_friends = [];
                            }
                            
                            if ($friends_user_data->id == auth()->user()->id) {
                                continue;
                            }
                            
                        $number_of_mutual_friends = count(array_intersect($number_of_friend_friends, $number_of_my_friends)); @endphp
                        <div
                            class="single-item-countable d-flex friend-item align-items-center justify-content-between mb-3">
                            <div class="d-flex align-items-center w-100">
                                <!-- Avatar -->
                                <div class="avatar">
                                    <a href="{{ route('user.profile.view', $friends_user_data->id) }}"><img
                                            class="avatar-img rounded-circle user_image_show_on_modal"
                                            src="{{ get_user_image($friends_user_data->photo, 'optimized') }}"
                                            alt="" height="40" width="40"></a>
                                </div>
                                <div class="avatar-info ms-2">
                                    <h6 class="mb-1"><a
                                            href="{{ route('user.profile.view', $friends_user_data->id) }}">{{ $friends_user_data->name }}</a>
                                    </h6>
                                    <div class="activity-time small-text text-muted">
                                        {{ $number_of_mutual_friends }}
                                        {{ get_phrase('Mutual Friends') }}</div>
                                </div>
                            </div>
                            <div class="invite_button_css">
                                @if (
                                    !empty($invite_details) &&
                                        $invite_details->invite_reciver_id == $friends_user_data->id &&
                                        $invite_details->is_accepted != '1')
                                    <button class=" btn_invited">Invited</button>
                                @elseif (
                                    !empty($invite_details) &&
                                        $invite_details->invite_reciver_id == $friends_user_data->id &&
                                        $invite_details->is_accepted == '1')
                                    <button class=" btn_invited">Invited </button>
                                @else
                                    <a class="btn_2"
                                        href="{{ route('fundraiser.invited', ['invited_friend_id' => $friends_user_data->id, 'requester_id' => auth()->user()->id, 'fundraiser_id' => $fundraiser->id]) }}">Invite</a>
                                @endif
                            </div>
                        </div>
                    @endforeach

                    {{-- ------------------END--------------------------------------------------------------------- --}}

                    <div class="d-flex justify-content-end" id="paginate">
                        {{ $friendships->links() }}
                    </div>

            </div>
        </div>
        <div class="col"></div>
    </div>
</div>
