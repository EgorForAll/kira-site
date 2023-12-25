<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Resources\Comment\CommentResource;

class CommentController extends Controller
{
    public function  index() {
        $comments = Comment::all();
        return CommentResource::collection($comments);
    }

    public function fetchCommentsById($id) {
        $comments = Comment::where('post_id', $id)->get();
        return CommentResource::collection($comments);
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
