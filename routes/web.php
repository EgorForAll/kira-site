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

//Route::get('/{vue_capture?}', [\App\Http\Controllers\HomeController::class, 'index']);
Route::get('/{vue_capture?}', [\App\Http\Controllers\HomeController::class, 'index']);

Route::group(['prefix' => 'laravel_route'], function () {
    Route::get('/admin', [UserController::class, 'isAdmin']);
    Route::get('/posts', [PostController::class, 'index']);
    Route::post('/posts/create', [PostController::class, 'store'])->name('post-create');
    Route::patch('/posts/update/{post}', [PostController::class, 'update'])->name('post-update');
    Route::delete('/posts/delete/{post}', [PostController::class, 'delete'])->name('post-delete');
    Route::get('/user', [UserController::class, 'isUser'])->middleware('auth:sanctum');
    Route::get('/comments', [CommentController::class, 'index'])->name('load-comments');
    Route::get('/comments{id}', [CommentController::class, 'fetchCommentsById'])->name('fetch-comments');
    Route::post('/comments', [CommentController::class, 'create'])->name('createComment');
    Route::post('/like/{post}', [PostController::class, 'like'])->name('like-post');
    Route::post('/unlike/{post}', [PostController::class, 'unlike'])->name('unlike-post');
    Route::get('/likes/{post}', [PostController::class, 'likes'])->name('likes-post');
});



