<?php

namespace App\Http\Controllers;

use App\Http\Requests\Post\StoreRequest;
use App\Http\Resources\Post\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends BaseController
{

    public function index()
    {
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

    public function likes($id)
    {
        $post = Post::find($id);
        $likes = $post->likeCount;
        $liked = $post->liked;
        $response = [
            'likes' => $likes,
            'liked' => $liked
        ];

        return response()->json($response);
    }

    public function store(StoreRequest $request)
    {
        $data = $request->validated();
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('uploads', 'public');
            $data->image = $path;
        }
        $this->service->store($data);
    }
}
