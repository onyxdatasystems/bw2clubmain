<?php

use App\Http\Controllers\InstallController;
use App\Http\Controllers\MainController;
use App\Http\Controllers\MemoriesController;
use App\Http\Controllers\BadgeController;
use App\Http\Controllers\ModalController;
use App\Http\Controllers\Profile;
use App\Http\Controllers\StoryController;
use App\Http\Controllers\Updater;
use Illuminate\Http\Request;
use App\Models\Account_active_request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

// Route::group(['domain' => '{subdomain}.localhost'], function(){
//     Route::any('/sssss', function($subdomain) {
//         return 'Subdomain ' . $subdomain;
//     });
// });

Route::get('/clear-cache', function () {
    Artisan::call('cache:clear');
    Artisan::call('config:clear');
    Artisan::call('route:clear');
    Artisan::call('view:clear');

    return 'Application cache cleared';
});

require __DIR__ . '/api/v1/auth.php';


//Updater routes are here
Route::controller(Updater::class)->middleware('auth', 'verified', 'activity')->group(function () {

    Route::post('admin/addon/create', 'update')->name('admin.addon.create');
    Route::post('admin/addon/update', 'update')->name('admin.addon.update');
    Route::post('admin/product/update', 'update')->name('admin.product.update');

    // addon install
    Route::get('admin/addon/manager', 'addon_manager')->name('admin.addon.manager');
    Route::post('admin/addon/install', 'update')->name('addon.install');
    Route::get('admin/addon/status/{status}/{id}', 'addon_status')->name('addon.status');
    Route::get('admin/addon/delete/{id}', 'addon_delete')->name('addon.delete');
    Route::get('admin/addon/form', 'addon_form')->name('addon.form');
});
//End Updater routes

