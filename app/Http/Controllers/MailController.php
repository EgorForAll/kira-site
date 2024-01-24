<?php

namespace App\Http\Controllers;

use App\Http\Requests\MailRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public function index(MailRequest $request)
    {
        $data = $request->validated();
        $text = $data['text'];
        $from = $data['from'];
        Mail::send(['text' => view('mail', compact('text', 'from'))], ['name' => $from], function ($message) use ($data) {
            $subject = $data['subject'];
            $message->to('eia.web.ss@gmail.com', 'Egor')->subject($subject);
            $message->from('egor-write@yandex.ru');
        });
    }
}
