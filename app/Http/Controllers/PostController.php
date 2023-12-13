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
}
