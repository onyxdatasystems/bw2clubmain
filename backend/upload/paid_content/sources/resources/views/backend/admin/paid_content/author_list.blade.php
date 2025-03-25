<div class="main_content">
    <!-- Mani section header and breadcrumb -->
    <div class="mainSection-title">
        <div class="row">
            <div class="col-12">
                <div class="d-flex justify-content-between align-items-center flex-wrap gr-15">
                    <div class="d-flex flex-column">
                        <h4>{{ get_phrase('Author Request') }}</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Start Admin area -->
    <div class="row">
        <div class="col-12">
            <div class="eSection-wrap-2">
                <!-- Filter area -->

                <div class="table-responsive">
                    <table class="table eTable w-100" id="server_side_users_data">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>{{ get_phrase('Name') }}</th>
                                <th>{{ get_phrase('Email') }}</th>
                                <th>{{ get_phrase('Status') }}</th>
                                <th class="text-center">{{ get_phrase('Actions') }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($authors as $key => $author)
                                @php
                                    $info = DB::table('users')
                                        ->where('id', $author->user_id)
                                        ->first();
                                @endphp
                                <tr>
                                    <td>{{ $authors->firstItem() + $key }}</td>
                                    <td>{{ $info->name }}</td>
                                    <td>{{ $info->email }}</td>
                                    </td>
                                    <td class="status">
                                        @if ($author->status > 0)
                                            <span class="badge bg-success">Active</span>
                                        @else
                                            <span class="badge bg-danger">Deactive</span>
                                        @endif
                                    </td>
                                    <td>
                                        <div class="adminTable-action me-auto">
                                            <button type="button"
                                                class="eBtn eBtn-black dropdown-toggle table-action-btn-2"
                                                data-bs-toggle="dropdown" aria-expanded="false">
                                                {{ get_phrase('Actions') }}
                                            </button>
                                            <ul
                                                class="dropdown-menu dropdown-menu-end eDropdown-menu-2 eDropdown-table-action">

                                                <li>
                                                    <a href="{{ route('author.review.request', $author->user_id) }}"
                                                        class="dropdown-item">
                                                        {{ get_phrase('Review') }}
                                                    </a>
                                                </li>

                                                @if ($author->status > 0)
                                                    <li>
                                                        <a href="{{ route('author.status', ['id' => $author->user_id, 'status' => 1]) }}"
                                                            class="dropdown-item">
                                                            {{ get_phrase('Deactive') }}
                                                        </a>
                                                    </li>
                                                @else
                                                    <li>
                                                        <a href="{{ route('author.status', ['id' => $author->user_id, 'status' => 0]) }}"
                                                            class="dropdown-item">
                                                            {{ get_phrase('Active') }}
                                                        </a>
                                                    </li>
                                                @endif
                                                <li>
                                                    <a href="{{ route('author.delete', $author->user_id) }}"
                                                        class="dropdown-item">
                                                        {{ get_phrase('Delete') }}
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>

                    <div class="d-flex justify-content-end">
                        {{ $authors->links() }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
