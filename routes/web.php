<?php

use App\Http\Controllers\API\UserController;
use App\Http\Controllers\TotalPostsController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/{vue_capture?}', function () {
    return view('welcome');
});

Route::group(['prefix' => 'laravel_route'], function () {
    Route::get('/posts', PostController::class . '@index');
    Route::get('/comments/{post_id}', CommentController::class . '@index');
    Route::post('/comments', [CommentController::class, 'create'])->name('createComment');
});

Route::get('/laravel_route/user', [UserController::class, 'isUser'])->middleware('auth:sanctum');

