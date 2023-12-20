<?php

namespace App\Http\Controllers;

use App\Services\Post\PostService;
use Illuminate\Http\Request;

class BaseController extends Controller
{
    public  $service;
    public function __construct(PostService $service)
    {
        $this->service = $service;
    }
}
