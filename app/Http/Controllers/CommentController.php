<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Resources\Comment\CommentResource;

class CommentController extends Controller
{
    public function  index($post_id) {
        $comments = Comment::where('post_id', $post_id)->get();
        return CommentResource::collection($comments);
    }
}
