<?php

use App\Http\Controllers\Fundraiser\FundraiserController;
use Illuminate\Support\Facades\Route;

Route::controller(FundraiserController::class)->middleware('auth', 'verified', 'activity', 'prevent-back-history')->group(function () {

    // fundraiser Explore
    Route::get('/fundraiser/explore', 'index')->name('fundraiser.index');
    Route::get('/fundraiser/explore/search', 'search')->name('fundraiser.search');
    Route::get('/fundraiser/category/{type}', 'category')->name('fundraiser.category');

    Route::get('/fundraiser/campaigns/{type}', 'campaign_by_category')->name('campaign.category');

    Route::post('/fundraiser/store', 'store')->name('fundraiser.store');
    Route::get('/fundraiser/create', 'create')->name('fundraiser.create');
    Route::get('/fundraiser/edit/{id}', 'edit')->name('fundraiser.edit');
    Route::post('/fundraiser/update/{id}', 'update')->name('fundraiser.update');

    
    // Activity route
    Route::get('/fundraiser/myactivity/explore/{donor?}', 'myactivity')->name('fundraiser.myactivity');
    Route::get('/fundraiser/myactivity/donor/activity', 'donor')->name('fundraiser.donor');
    Route::get('/fundraiser/myactivity/donor/history', 'dhistory')->name('donor.history');
    Route::get('/fundraiser/myactivity/explore/delete/{id}', 'explore_delete')->name('explore.delete');
    Route::get('/fundraiser/myactivity/explore/status/{id}', 'status')->name('fundraiser.status');

    // profile for fundraiser
    Route::get('/fundraiser/profile/{id}', 'profile')->name('fundraiser.profile');
    Route::get('/fundraiser/donate/modal{id}', 'donate_modal')->name('fundraiser.model');
    Route::post('/fundraiser/donate/store', 'donate_modal_store')->name('fundraiser.model_store');

    // payment  route
    Route::get('/fundraiser/myactivity/campaign/payment/history/{type}', 'campaign_history')->name('campaign.history');
    Route::get('/fundraiser/myactivity/payment/history', 'phistory')->name('fundraiser.payment');
    Route::get('/fundraiser/myactivity/payment/history/model/{id}', 'phistory_model')->name('history.model');
    Route::get('/test', 'test')->name('test');

    Route::post('/fundraiser/myactivity/campaign/payout', 'campaign_payout')->name('fundraiser.payout');

    Route::get('/fundraiser/myactivity/campaign/{type}', 'campaign_type')->name('campaign.type');
    Route::get('/fundraiser/myactivity/campaign/payment/cancel/{id}', 'campaign_cancel')->name('campaign.payout.cancel');

    //share
    Route::any('/fundraiser/profile/share/', 'share_modal')->name('fundraiser.share');

    //invited
    Route::get('/fundraiser/profile/invite/{invited_friend_id}/{requester_id}/{fundraiser_id}', 'invited')->name('fundraiser.invited');
    Route::get('/fundraiser/profile/see/all/friends/{type}/{id}', 'see_more_friend')->name('fundraiser.friend');
    Route::post('/fundraiser/invites/sent', 'sent_invition')->name('fundraiser.invition');

    Route::post('fundraiser/share/on/my/timeline', 'share_my_timeline')->name('fundraiser.share.my.timeline');




    //Backend route.....................
    Route::get('/admin/fundraiser/payment/success', 'payout_report')->name('backend.fundraiser.report');
    Route::get('/admin/fundraiser/payment/pending', 'pending_report')->name('backend.fundraiser.pending');
    Route::get('/admin/fundraiser/payment/pending/delete/{id}', 'delete_payout')->name('delete.payout');
    Route::get('/admin/fundraiser/payment/pending/accept/{id}', 'author_payout')->name('campaign.payout');

});
