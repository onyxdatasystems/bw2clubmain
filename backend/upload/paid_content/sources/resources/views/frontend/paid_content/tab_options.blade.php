{{-- <ul class="creator-menu ">
    <li class="creator-menu-item @if (Route::currentRouteName() == 'creator.timeline') active @endif">
        <a href="{{ route('creator.timeline', ['type' => 'timeline']) }}" class="creator-menu-link">{{get_phrase('My page')}}</a>
    </li>
    <li class="creator-menu-item @if (Route::currentRouteName() == 'creator.package') active @endif">
        <a href="{{ route('creator.package') }}" class="creator-menu-link">{{get_phrase('Package')}}</a>
    </li>
    <li class="creator-menu-item @if (Route::currentRouteName() == 'creator.package') active @endif">
        <a href="{{ route('creator.package') }}" class="creator-menu-link">{{get_phrase('Package')}}</a>
    </li>
    <li class="creator-menu-item @if (Route::currentRouteName() == 'creator.subscribers') active @endif">
        <a href="{{ route('creator.subscribers') }}" class="creator-menu-link">{{get_phrase('Subscriber')}}</a>
    </li>

    <li class="creator-menu-item @if (Route::currentRouteName() == 'post.type') active @endif">
        <button type="button" class="post-type creator-menu-link">{{get_phrase('More')}}<i class="fa-solid fa-sort-down ms-2"></i></button>

        <ul class="creator-dropdown-menu">
            <li>
                <a class="dropdown-item" href="{{ route('post.type', ['type' => 'public_post']) }}">
                    <img src="{{ asset('assets/frontend/paid-content/images/new/world.svg') }}" alt="" />
                    {{get_phrase('Public Post')}}</a>
            </li>
            <li>
                <a class="dropdown-item" href="{{ route('post.type', ['type' => 'subscriber_post']) }}">
                    <img src="{{ asset('assets/frontend/paid-content/images/new/subscribe.svg') }}" alt="" />
                    {{get_phrase('Subscriber Post')}}</a>
            </li>
        </ul>
    </li>
</ul> --}}
<ul class="Etab etab_paid pt-2 pb-2 d-flex">
    <li class="@if (Route::currentRouteName() == 'creator.timeline') active @endif">
        <a href="{{ route('creator.timeline', ['type' => 'timeline']) }}">{{get_phrase('My page')}}</a>
    </li>
    <li class="@if (Route::currentRouteName() == 'creator.package') active @endif">
        <a href="{{ route('creator.package') }}">{{get_phrase('Package')}}</a>
    </li>

    <li class=" @if (Route::currentRouteName() == 'creator.subscribers') active @endif">
        <a href="{{ route('creator.subscribers') }}" >{{get_phrase('Subscriber')}}</a>
    </li>
    <li class=" @if (Route::currentRouteName() == 'creator.payout') active @endif">
        <a href="{{ route('creator.payout') }}" >{{get_phrase('Payment')}}</a>
    </li>

    <li class=" @if (Route::currentRouteName() == 'post.type') actives-bg @endif">
        <button type="button" class="post-type creator-menu-link">{{get_phrase('More')}}<i class="fa-solid fa-sort-down ms-2"></i></button>

        <ul class="creator-dropdown-menu">
            <li>
                <a class="dropdown-item" href="{{ route('post.type', ['type' => 'public_post']) }}">
                    <img src="{{ asset('assets/frontend/paid-content/images/new/world.svg') }}" alt="" />
                    {{get_phrase('Public Post')}}</a>
            </li>
            <li>
                <a class="dropdown-item" href="{{ route('post.type', ['type' => 'subscriber_post']) }}">
                    <img src="{{ asset('assets/frontend/paid-content/images/new/subscribe.svg') }}" alt="" />
                    {{get_phrase('Subscriber Post')}}</a>
            </li>
        </ul>
    </li>
</ul>
