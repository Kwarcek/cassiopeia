<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', [\App\Http\Api\Auth\AuthApiController::class, 'login']);
    Route::post('password/reset', [\App\Http\Api\Auth\AuthApiController::class, 'passwordReset']);
});

Route::group([
    'middleware' => 'api'
], function () {

    Route::group([
        'prefix' => 'auth',
    ], function () {
        Route::post('logout', [\App\Http\Api\Auth\AuthApiController::class, 'logout']);
        Route::post('refresh', [\App\Http\Api\Auth\AuthApiController::class, 'refresh']);
    });

    Route::group([
        'prefix' => 'users',
    ], function () {
        Route::get('paginate', [\App\Http\Api\Users\UserApiController::class, 'paginate']);
        Route::get('/', [\App\Http\Api\Users\UserApiController::class, 'index']);
    });

});
