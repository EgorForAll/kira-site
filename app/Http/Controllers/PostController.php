<?php

namespace App\Http\Controllers;

use App\Http\Resources\Post\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function  index() {
        $posts = Post::paginate(9);
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

    public function likes($id) {
        $post = Post::find($id);
        $likes = $post->likeCount;
        $liked = $post->liked;
        $response = [
            'likes' => $likes,
            'liked' => $liked
        ];

        return response()->json($response);
    }
}
