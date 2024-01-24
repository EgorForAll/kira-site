<?php

namespace App\Http\Controllers;

use App\Http\Requests\Post\StoreRequest;
use App\Http\Requests\Post\UpdateRequest;
use App\Http\Resources\Post\PostResource;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{

    public function index()
    {
        $posts = Post::orderBy('created_at', 'desc')->paginate(9);
        return PostResource::collection($posts);
    }

    public function like($id)
    {
        $post = Post::find($id);
        if (!$post->liked()) {
            $post->like();
            $post->save();

            $success = true;
            $messages = 'post was liked successfully';

        } else {
            $success = false;
            $messages = 'post was already liked by current user';
        }

        $response = [
            'success' => $success,
            'message' => $messages,
        ];

        return response()->json($response);
    }

    public function unlike($id)
    {
        $post = Post::find($id);
        $post->unlike();
        $post->save();

        $response = [
            'success' => true,
            'message' => 'post was unliked successfully',
        ];

        return response()->json($response);
    }

    public function likes($id)
    {
        $post = Post::find($id);
        $likes = $post->likeCount;
        $user = Auth::user();
        if ($user) {
            $liked = $post->liked;
        } else {
            $liked = false;
        }
        $response = [
            'likes' => $likes,
            'liked' => $liked
        ];

        return response()->json($response);
    }

    public function store(StoreRequest $request)
    {
        try {
            $data = $request->validated();
            $data['image'] = Storage::put('public/images', $data['image']);
            Post::create($data);
            $emails = User::all()->reject(function (User $user) {
                return $user->is_notified !== 1;
            })->map(function (User $user) {
                return $user->email;
            });
            foreach ($emails as $email) {
                Mail::send(['text' => view('push')], ['name' => 'Kira'], function ($message) use ($email) {
                    $subject = 'Новая запись на kira-blog.ru';
                    $message->to($email)->subject($subject);
                    $message->from('egor-write@yandex.ru');
                });
            }
        } catch (\Exception $e) {
            dd($e);
        }

    }

    public function update(UpdateRequest $request, Post $post) {
        try {
             $data = $request->validated();
            $prevImage = str_replace('/storage', '', $post->image);
            Storage::delete($prevImage);
             $data['image'] = Storage::put('public/images', $data['image']);
             $post->update($data);
             $message = 'post was updated successfully';
        } catch (\Exception $e) {
            $message = $e;
        }
        return response()->json([
            'success' => $message
        ]);
    }

    public function delete(Post $post) {
        $post->delete();
        return response()->json([
            'success' => 'post was deleted successfully'
        ]);
    }
}
