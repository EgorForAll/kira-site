<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Resources\Comment\CommentResource;

class CommentController extends Controller
{
    public function  index($id) {
        $comments_filtered = Comment::all()->reject(function (Comment $comment) use ($id) {
            return $comment->post_id > $id;
        });
        return CommentResource::collection($comments_filtered);
    }
}
