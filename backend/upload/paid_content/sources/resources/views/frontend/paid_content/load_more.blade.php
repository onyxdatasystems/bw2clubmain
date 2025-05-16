@foreach ($search_list as $list)
    @php
        if (isset($search_as)) {
            $url = route('page.view', ['page' => $list->title, 'id' => $list->user_id]);
            $src = asset('assets/frontend/images/' . $list->cover_photo);
        } else {
            $url = route('user.profile.view', ['id' => $list->subscriber_id]);
            $src = get_user_image($list->subscriber_id, 'optimized');
        }
    @endphp

    <li class="search-result list-unstyled single-item-countable">
        <a href="{{ $url }}" class="c-search-item align-items-center" target="_blank">
            <div class="logo position-relative me-2 load-item">
                <img src="{{ $src }}" height="100%" />
            </div>
            <div class="info">
                @if (isset($search_as))
                    <h4>{{ $list->title }}</h4>
                    <p>{{ $list->sub_title }}</p>
                    <span>Total post : {{ $list->total_post }}</span>
                @else
                    <h4>{{ $list->name }}</h4>
                    <p>{{ $list->email }}</p>
                @endif
            </div>
        </a>
    </li>
@endforeach
