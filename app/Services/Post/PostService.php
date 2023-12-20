<?php

namespace App\Services\Post;

use App\Models\Post;

class PostService
{
    public function store($data) {
        $this->service->store($data);
        Post::create($data);
    }
}
