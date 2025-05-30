<?php
use App\Http\Controllers\MainController;
use App\Http\Controllers\MemoriesController;
use App\Http\Controllers\BadgeController;
use App\Http\Controllers\ModalController;
use App\Http\Controllers\Profile;
use App\Http\Controllers\StoryController;
use Illuminate\Http\Request;
use App\Models\Account_active_request;
use Illuminate\Support\Facades\Route;

Route::get('/auth-checker', function () {
    if (auth::check()) {
        return true;
    } else {
        return false;
    }
})->name('auth-checker');

//Passing param
Route::get('/users/{user_id}', function ($user_id) {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::get('language/switch/{language}', function (Request $request, $language) {
    $request->session()->put('active_language', $language);
    return redirect()->back();
})->name('language.switch');

Route::get('/account-disable', function () {
    return view('frontend.disable_view');
})->name('frontend.disable_view');

Route::get('/account-enble-req/{id}', function (Request $request, $id) {

    $data['user_id'] = $id;
    $data['status'] = 'pending';
    Account_active_request::create($data);
    flash()->addSuccess('Account enable request successfully');
    return redirect()->back();
})->name('frontend.account_enble_req');


//Modal controllers group routing
Route::controller(ModalController::class)->middleware('auth', 'user', 'verified', 'activity')->group(function () {
    Route::any('/load_modal_content/{view_path}', 'common_view_function')->name('load_modal_content');
});

//Home controllers group routing
Route::controller(MainController::class)->middleware('auth', 'user', 'user', 'verified', 'activity', 'prevent-back-history')->group(function () {
    Route::get('/', 'timeline')->name('timeline');
    Route::post('/create_post', 'create_post')->name('create_post');
    Route::get('/edit_post_form/{id}', 'edit_post_form')->name('edit_post_form');
    Route::post('/edit_post/{id}', 'edit_post')->name('edit_post');
    Route::get('/load_post_by_scrolling', 'load_post_by_scrolling')->name('load_post_by_scrolling');
    Route::post('/my_react', 'my_react')->name('my_react');
    Route::get('/my_comment_react', 'my_comment_react')->name('my_comment_react');
    Route::get('/post_comment', 'post_comment')->name('post_comment');
    Route::get('/load_post_comments', 'load_post_comments')->name('load_post_comments');
    Route::get('/search_friends_for_tagging', 'search_friends_for_tagging')->name('search_friends_for_tagging');
    Route::get('/save-post/{id}', 'save_post')->name('save_post');
    Route::get('/unsave-post/{id}', 'unsave_post')->name('unsave_post');

    Route::get('/live/{post_id}', 'live')->name('live');
    Route::get('/live-ended/{post_id}', 'live_ended')->name('zoom-meeting-leave-url');

    Route::get('/view/single/post/{id?}', 'single_post')->name('single.post');

    Route::get('/preview_post', 'preview_post')->name('preview_post');

    Route::get('/post_comment_count', 'post_comment_count')->name('post_comment_count');

    Route::post('/post/report/save/', 'save_post_report')->name('save.post.report');

    Route::get('/delete/my/post', 'post_delete')->name('post.delete');

    Route::get('comment/delete', 'comment_delete')->name('comment.delete');

    Route::post('share/on/group', 'share_group')->name('share.group.post');
    Route::post('share/on/my/timeline', 'share_my_timeline')->name('share.my.timeline');

    // share page view
    Route::get('custom/shared/post/view/{id}', 'custom_shared_post_view')->name('custom.shared.post.view');

    //remove media files
    Route::get('media/file/delete/{id}', 'delete_media_file')->name('media.file.delete');

    // main addon layout
    Route::get('addons/manager', 'addons_manager')->name('addons.manager');
    Route::get('/user/settings', 'user_settings')->name('user.settings');
    Route::post('/save/user/settings', 'save_user_settings')->name('save.payment.settings');

    // live streaming
    Route::get('/streaming/live/{id}', 'live_streaming')->name('go.live');



    // Theme Controller
    Route::post('/update-theme-color', 'updateThemeColor')->name('update-theme-color');


    Route::get('album/details/page_show/{id}', 'details_album')->name('album.details.page_show');

    // Block User from frontend
    Route::get('/block_user/{id}', 'block_user')->name('block_user');
    Route::post('/block_user_post/{id}', 'block_user_post')->name('block_user_post');
    Route::get('/unblock_user/{id}', 'unblock_user')->name('unblock_user');

    Route::get('/ai/image-generator', 'imageGenerator')->name('ai_image.image_generator');

});


// Memories Controller
Route::controller(MemoriesController::class)->middleware('auth', 'user', 'verified', 'activity', 'prevent-back-history')->group(function () {
    Route::get('/memories', 'memories')->name('memories');
    Route::get('/load/memories', 'load_memories')->name('load.memories');
});

// Badge  Controller
Route::controller(BadgeController::class)->middleware('auth', 'user', 'verified', 'activity','prevent-back-history')->group(function () {
    Route::get('/badge', 'badge')->name('badge');
    Route::get('/badge/info', 'badge_info')->name('badge.info');
    Route::post('badge/payment_configuration/{id}', 'payment_configuration')->name('badge.payment_configuration');
});






//Story controllers group routing
/*Route::controller(StoryController::class)->middleware('auth', 'user', 'verified', 'activity')->group(function () {
    Route::post('/create_story', 'create_story')->name('create_story');

    Route::any('/stories/{offset?}/{limit?}', 'stories')->name('stories');

    Route::any('/stories/{offset?}/{limit?}', 'stories')->name('stories');
    Route::any('/story_details/{story_id}/{offset?}/{limit?}', 'story_details')->name('story_details');
    Route::any('/single_story_details/{story_id}', 'single_story_details')->name('single_story_details');
});*/

//Profile controllers group routing
Route::controller(Profile::class)->middleware('auth', 'verified', 'user', 'activity', 'prevent-back-history')->group(function () {
    Route::get('/profile', 'profile')->name('profile');
    Route::get('/profile/load_post_by_scrolling', 'load_post_by_scrolling')->name('profile.load_post_by_scrolling');
    Route::get('/profile/friends', 'friends')->name('profile.friends');

    Route::get('/profile/photos', 'photos')->name('profile.photos');
    Route::get('/profile/load_photos', 'load_photos')->name('profile.load_photos');

    Route::any('/profile/album/{action_type?}', 'album')->name('profile.album');
    Route::get('/profile/load_albums', 'load_albums')->name('profile.load_albums');

    Route::get('/profile/videos', 'videos')->name('profile.videos');
    Route::get('/profile/load_videos', 'load_videos')->name('profile.load_videos');

    Route::get('/profile/load_my_friends', 'load_my_friends')->name('profile.load_my_friends');
    Route::get('/profile/load_my_friend_requests', 'load_my_friend_requests')->name('profile.load_my_friend_requests');

    Route::post('/profile/accept_friend_request', 'accept_friend_request')->name('profile.accept_friend_request');
    Route::get('/profile/delete_friend_request', 'delete_friend_request')->name('profile.delete_friend_request');

    Route::post('/profile/about/{action_type?}', 'about')->name('profile.about');
    Route::any('/profile/my_info/{action_type?}', 'my_info')->name('profile.my_info');
    Route::get('/profile/load_photo_and_videos', 'load_photo_and_videos')->name('profile.load_photo_and_videos');

    Route::post('/profile/upload_photo/{photo_type}', 'upload_photo')->name('profile.upload_photo');

    Route::post('/profile/update_profile/', 'update_profile')->name('profile.update_profile');

    Route::get('/profile/save-post-list', 'savePostList')->name('profile.savePostList');

    Route::get('/profile/profile-lock', 'profileLock')->name('profile.profileLock');

    Route::get('/profile/profile-unlock', 'profileUnlock')->name('profile.profileUnlock');

    Route::get('/profile/check-ins', 'checkinsView')->name('profile.checkins_list');

});