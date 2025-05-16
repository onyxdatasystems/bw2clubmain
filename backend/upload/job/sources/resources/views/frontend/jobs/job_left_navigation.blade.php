
<main class="main my-4">
    <div class="container">
        <div class="row">
            <div class="col-xl-3 col-lg-4">
                <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasRight"
                    aria-labelledby="offcanvasRightLabel">
                    <div class="offcanvas-header d-lg-none mb-3 py-4">
                        <div class="logo">
                            <a class="display-6" href="index.html">SocioPro</a>
                        </div>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body offcanvas-body-2">
                        <div class="timeline-search jSearch">
                            <h3 class="text_22 mt-3 mb-3">{{get_phrase('Jobs')}}</h3>
                        </div>
                        <div class="timeline-navigation">
                            <!-- Sidebar Tab Button Area -->
                            <div class="blog-nav-tab">
                                <div class="nav j_nav flex-column nav-pills" id="v-pills-tab" role="tablist"
                                    aria-orientation="vertical">
                                    <a href="{{ route('jobs') }}" class="d-block w-100 @if (Route::currentRouteName() == 'jobs') active @endif">
                                        <button
                                            class="nav-link custom_btn_1 w-100 "
                                            type="button">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_669_1318)">
                                                <path d="M4.26562 0H19.7344C20.1227 0 20.4375 0.314812 20.4375 0.703125V14.4727C20.4375 14.7227 20.3047 14.954 20.0887 15.08L12.3543 19.5917C12.1354 19.7194 11.8646 19.7194 11.6457 19.5917L3.91134 15.08C3.69534 14.954 3.5625 14.7227 3.5625 14.4727V0.703125C3.5625 0.314812 3.87731 0 4.26562 0Z" fill="url(#paint0_linear_669_1318)"/>
                                                <path d="M15.9844 5.625H14.8125V4.45312C14.8125 3.54848 14.0765 2.8125 13.1719 2.8125H10.8281C9.92348 2.8125 9.1875 3.54848 9.1875 4.45312V5.625H8.01562C7.11098 5.625 6.375 6.36098 6.375 7.26562V8.4375H17.625V7.26562C17.625 6.36098 16.889 5.625 15.9844 5.625ZM10.5938 4.45312C10.5938 4.32389 10.6989 4.21875 10.8281 4.21875H13.1719C13.3011 4.21875 13.4062 4.32389 13.4062 4.45312V5.625H10.5938V4.45312ZM6.375 9.84375H17.625V12.4219C17.625 13.3265 16.889 14.0625 15.9844 14.0625H8.01562C7.11098 14.0625 6.375 13.3265 6.375 12.4219V9.84375ZM24 12.4219V23.2969C24 23.6852 23.6852 24 23.2969 24H0.703125C0.314812 24 0 23.6852 0 23.2969V12.4219C0 12.2388 0.0714375 12.0629 0.199125 11.9316L3.5625 8.47416V14.4727C3.5625 14.7227 3.69534 14.954 3.91134 15.08L11.6457 19.5917C11.8646 19.7194 12.1354 19.7194 12.3543 19.5917L20.0887 15.08C20.3047 14.954 20.4375 14.7227 20.4375 14.4727V8.47416L23.8009 11.9316C23.9286 12.0628 24 12.2387 24 12.4219Z" fill="url(#paint1_linear_669_1318)"/>
                                                </g>
                                                <defs>
                                                <linearGradient id="paint0_linear_669_1318" x1="12" y1="19.6875" x2="12" y2="0" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFC8D1"/>
                                                <stop offset="1" stop-color="#FFF6F7"/>
                                                </linearGradient>
                                                <linearGradient id="paint1_linear_669_1318" x1="12" y1="24" x2="12" y2="2.8125" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FD3A84"/>
                                                <stop offset="1" stop-color="#FFA68D"/>
                                                </linearGradient>
                                                <clipPath id="clip0_669_1318">
                                                <rect width="24" height="24" fill="white"/>
                                                </clipPath>
                                                </defs>
                                                </svg>
                                                
                                            {{get_phrase('Explore All Jobs')}}
                                        </button>
                                    </a>
                                    <a href="{{route('job.myjob')}}" class="d-block w-100 @if(Route::currentRouteName() == 'job.myjob') active  @endif" >
                                        <button
                                            class="nav-link custom_btn_1 w-100"
                                            type="button">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_669_1344)">
                                                <path d="M5.67188 2.8125V2.10938C5.67188 1.71558 5.9812 1.40625 6.375 1.40625H9.1875C9.5813 1.40625 9.89062 1.71558 9.89062 2.10938V2.8125L10.5938 4.21875L11.2969 2.8125V2.10938C11.2969 0.942141 10.3547 0 9.1875 0H6.375C5.20781 0 4.26562 0.942188 4.26562 2.10938V2.8125L4.93172 4.21875L5.67188 2.8125ZM0 8.325V14.7656C0 15.1593 0.309328 15.4688 0.703125 15.4688H12.2391C12.5344 15.4688 12.8016 15.2859 12.9 15.0047C13.2516 14.0062 14.0532 13.2047 15.0375 12.8671C15.3187 12.7828 15.5157 12.5156 15.5157 12.2062V8.31089L7.78125 5.625L0 8.325ZM23.794 22.7998L19.6987 18.6576C19.424 18.3829 18.979 18.3829 18.7044 18.6576C18.4298 18.9322 18.4298 19.3772 18.7044 19.6518L22.7997 23.794C23.0744 24.0687 23.5193 24.0687 23.794 23.794C24.0687 23.5193 24.0687 23.0744 23.794 22.7998Z" fill="url(#paint0_linear_669_1344)"/>
                                                <path d="M15.5156 3.51562C15.5156 3.12183 15.2063 2.8125 14.8125 2.8125H0.703125C0.309328 2.8125 0 3.12183 0 3.51562V8.325C1.78598 9.19688 4.33594 9.75942 7.07812 9.82969V10.5469C7.07812 10.9406 7.38745 11.25 7.78125 11.25C8.17505 11.25 8.48438 10.9406 8.48438 10.5469V9.82969C11.2266 9.74531 13.7296 9.19688 15.5156 8.31094V3.51562ZM16.2188 11.25C14.193 11.25 12.2824 12.5277 11.577 14.5301C10.4489 17.7015 12.8108 21.0938 16.2188 21.0938C18.9324 21.0938 21.1406 18.8855 21.1406 16.1719C21.1406 13.4582 18.9324 11.25 16.2188 11.25Z" fill="url(#paint1_linear_669_1344)"/>
                                                </g>
                                                <defs>
                                                <linearGradient id="paint0_linear_669_1344" x1="12" y1="24" x2="12" y2="0" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#A93AFF"/>
                                                <stop offset="1" stop-color="#FF81FF"/>
                                                </linearGradient>
                                                <linearGradient id="paint1_linear_669_1344" x1="10.5703" y1="21.0938" x2="10.5703" y2="2.8125" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FFBEF9"/>
                                                <stop offset="1" stop-color="#FFF1FF"/>
                                                </linearGradient>
                                                <clipPath id="clip0_669_1344">
                                                <rect width="24" height="24" fill="white"/>
                                                </clipPath>
                                                </defs>
                                                </svg>
                                                
                                           {{get_phrase('My Job Post')}}
                                        </button>
                                    </a>
                                    <a href="{{route('job.save.view')}}" class="d-block w-100 @if(Route::currentRouteName() == 'job.save.view') active @endif" >
                                        <button
                                            class="nav-link custom_btn_1 w-100"
                                            type="button">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_669_1335)">
                                                <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="url(#paint0_linear_669_1335)"/>
                                                <path d="M15.4528 18.4608L12 14.9363L8.54719 18.4608C8.48282 18.5135 8.40482 18.5469 8.32225 18.5571C8.23967 18.5673 8.15589 18.5539 8.08062 18.5184C8.00536 18.4829 7.94169 18.4269 7.897 18.3567C7.85231 18.2865 7.82843 18.2051 7.82813 18.1219V6.48516C7.82812 6.20754 7.93831 5.94128 8.13448 5.74485C8.33065 5.54841 8.59676 5.43787 8.87438 5.4375H15.1256C15.4032 5.43787 15.6694 5.54841 15.8655 5.74485C16.0617 5.94128 16.1719 6.20754 16.1719 6.48516V18.1219C16.1716 18.2051 16.1477 18.2865 16.103 18.3567C16.0583 18.4269 15.9946 18.4829 15.9194 18.5184C15.8441 18.5539 15.7603 18.5673 15.6778 18.5571C15.5952 18.5469 15.5172 18.5135 15.4528 18.4608Z" fill="white"/>
                                                </g>
                                                <defs>
                                                <linearGradient id="paint0_linear_669_1335" x1="12" y1="0" x2="12" y2="23.8223" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#FDAE3E"/>
                                                <stop offset="1" stop-color="#FF0749"/>
                                                </linearGradient>
                                                <clipPath id="clip0_669_1335">
                                                <rect width="24" height="24" fill="white"/>
                                                </clipPath>
                                                </defs>
                                                </svg>
                                                
                                           {{get_phrase('Save Job')}}
                                        </button>
                                    </a>
                                    <a href="{{route('job.apply.all.list')}}" class="d-block w-100 @if(Route::currentRouteName() == 'job.apply.all.list') active @endif" >
                                        <button  class="nav-link custom_btn_1 w-100"   type="button"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_669_1322)">
                                            <path d="M22.5938 2.15625V0.75H2.10938C0.942141 0.75 0 1.69214 0 2.85938V21.1406C0 22.3079 0.942141 23.25 2.10938 23.25H22.5938V21.8438L21.1875 16.9219V7.07812L22.5938 2.15625Z" fill="url(#paint0_linear_669_1322)"/>
                                            <path d="M8.48438 11.2969C8.48438 10.1337 7.53816 9.1875 6.375 9.1875C5.21184 9.1875 4.26562 10.1337 4.26562 11.2969C4.26562 12.46 5.21184 13.4062 6.375 13.4062C7.53816 13.4062 8.48438 12.46 8.48438 11.2969ZM3.5625 17.625H9.1875C9.57614 17.625 9.89062 17.3105 9.89062 16.9219V15.5156C9.89062 14.3525 8.94441 13.4062 7.78125 13.4062H6.375H4.96875C3.80559 13.4062 2.85938 14.3525 2.85938 15.5156V16.9219C2.85938 17.3105 3.17386 17.625 3.5625 17.625ZM17.625 19.0312H3.5625C3.17386 19.0312 2.85938 19.3457 2.85938 19.7344C2.85938 20.123 3.17386 20.4375 3.5625 20.4375H17.625C18.0136 20.4375 18.3281 20.123 18.3281 19.7344C18.3281 19.3457 18.0136 19.0312 17.625 19.0312ZM17.625 16.2188H12C11.6114 16.2188 11.2969 16.5332 11.2969 16.9219C11.2969 17.3105 11.6114 17.625 12 17.625H17.625C18.0136 17.625 18.3281 17.3105 18.3281 16.9219C18.3281 16.5332 18.0136 16.2188 17.625 16.2188ZM14.1094 14.8125C14.2893 14.8125 14.4692 14.7438 14.6065 14.6065L17.419 11.794C17.6936 11.5193 17.6936 11.0744 17.419 10.7997C17.1443 10.5251 16.6994 10.5251 16.4247 10.7997L14.1094 13.1151L13.2002 12.206C12.9256 11.9313 12.4806 11.9313 12.206 12.206C11.9313 12.4806 11.9313 12.9256 12.206 13.2002L13.6122 14.6065C13.7496 14.7438 13.9295 14.8125 14.1094 14.8125ZM17.625 3.5625H3.5625C3.17386 3.5625 2.85938 3.87698 2.85938 4.26562V7.07812C2.85938 7.46677 3.17386 7.78125 3.5625 7.78125H17.625C18.0136 7.78125 18.3281 7.46677 18.3281 7.07812V4.26562C18.3281 3.87698 18.0136 3.5625 17.625 3.5625ZM22.5938 0.75C21.8203 0.75 21.1875 1.38281 21.1875 2.15625V7.07812H23.2969C23.6907 7.07812 24 6.7688 24 6.375V2.15625C24 1.37044 23.3504 0.75 22.5938 0.75ZM23.2969 16.9219H21.1875V21.8438C21.1875 22.6172 21.8203 23.25 22.5938 23.25C23.3529 23.25 24 22.6272 24 21.8438V17.625C24 17.2312 23.6907 16.9219 23.2969 16.9219Z" fill="url(#paint1_linear_669_1322)"/>
                                            </g>
                                            <defs>
                                            <linearGradient id="paint0_linear_669_1322" x1="11.2969" y1="23.25" x2="11.2969" y2="0.75" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#C81AB7"/>
                                            <stop offset="1" stop-color="#71B2FF"/>
                                            </linearGradient>
                                            <linearGradient id="paint1_linear_669_1322" x1="13.4297" y1="23.25" x2="13.4297" y2="0.75" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#ECF9FF"/>
                                            <stop offset="0.9973" stop-color="white"/>
                                            </linearGradient>
                                            <clipPath id="clip0_669_1322">
                                            <rect width="24" height="24" fill="white"/>
                                            </clipPath>
                                            </defs>
                                            </svg>
                                            {{get_phrase('Applied List')}}</button>
                                    </a>
                                    <a href="{{route('job.my.apply.list')}}" class="d-block w-100 @if(Route::currentRouteName() == 'job.my.apply.list') active @endif" >
                                        <button  class="nav-link custom_btn_1 w-100"   type="button"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.75 4C1.75 2.75736 2.75736 1.75 4 1.75H17C18.2427 1.75 19.25 2.75737 19.25 4V17C19.25 18.2427 18.2427 19.25 17 19.25H4C2.75737 19.25 1.75 18.2427 1.75 17V4ZM15.0227 7.32173C15.3197 7.61039 15.3266 8.08521 15.0379 8.38228L10.0377 13.5281C9.75454 13.8196 9.29073 13.8325 8.99179 13.5572L5.99194 10.7946C5.68725 10.514 5.66771 10.0396 5.9483 9.73486C6.2289 9.43016 6.70337 9.41062 7.00806 9.69122L9.4708 11.9591L13.9621 7.33696C14.2508 7.03989 14.7256 7.03307 15.0227 7.32173Z" fill="url(#paint0_linear_669_1340)"/>
                                            <path d="M22.0001 5.75098C22.4143 5.75098 22.7501 6.08676 22.7501 6.50098V21C22.7501 21.9665 21.9666 22.75 21.0001 22.75H6.50195C6.08774 22.75 5.75195 22.4142 5.75195 22C5.75195 21.5858 6.08774 21.25 6.50195 21.25H21.0001C21.1382 21.25 21.2501 21.1381 21.2501 21V6.50098C21.2501 6.08676 21.5859 5.75098 22.0001 5.75098Z" fill="url(#paint1_linear_669_1340)"/>
                                            <defs>
                                            <linearGradient id="paint0_linear_669_1340" x1="1.75" y1="1.75" x2="1.75" y2="22.75" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#E100FF"/>
                                            <stop offset="1" stop-color="#7F00FF"/>
                                            </linearGradient>
                                            <linearGradient id="paint1_linear_669_1340" x1="1.75024" y1="1.75" x2="1.75024" y2="22.75" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#E100FF"/>
                                            <stop offset="1" stop-color="#7F00FF"/>
                                            </linearGradient>
                                            </defs>
                                            </svg>
                                            {{get_phrase('My Applied Job')}}</button>
                                    </a>
                                </div>
                            </div>
                            <!-- Sidebar Footer Area -->
                            <div class="footer-nav">
                                <div class="footer-menu py-2">
                                    <ul>
                                        <li><a href="{{ route('about.view') }}">{{ get_phrase('About') }}</a></li>
                                        <li><a href="{{ route('policy.view') }}">{{ get_phrase('Privacy Policy') }}</a></li>
                                    </ul>
                                </div>
                                <div class="copy-rights text-muted">
                                    @php
                                        $sitename = \App\Models\Setting::where('type', 'system_name')->value('description');
                                    @endphp
                                    <p>© {{ date('Y') }} {{ $sitename }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
