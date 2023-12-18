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

    public function create(Request $request) {
        $comment = new Comment();
        $comment->user = $request->user;
        $comment->comment = $request->comment;
        $comment->post_id = $request->post_id;
        $comment->save();

        return response()->json('The comment successfully added');
    }
}
