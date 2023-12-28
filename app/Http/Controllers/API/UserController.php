<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\ResetRequest;
use App\Models\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function register(Request $request)
    {
        try {
            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->save();

            $success = true;
            $message = 'User register successfully';
        } catch (\Illuminate\Database\QueryException $ex) {
            $success = false;
            $message = $ex->getMessage();
        }

        // response
        $response = [
            'success' => $success,
            'message' => $message,
        ];
        return response()->json($response);
    }

    /**
     * Login
     */
    public function login(Request $request)
    {
        $credentials = [
            'email' => $request->email,
            'password' => $request->password,
        ];

        if (Auth::attempt($credentials)) {
            $success = true;
            $message = 'Успешно вошли';
        } else {
            $success = false;
            $message = 'Пользователь с вашим именем не найден. Пожалуйста, зарегистрируйтесь';
        }

        // response
        $response = [
            'success' => $success,
            'message' => $message,
        ];
        return response()->json($response);
    }

    /**
     * Logout
     */
    public function logout(Request $request)
    {
        try {
            Session::flush();
            $success = true;
            $message = 'Successfully logged out';
        } catch (\Illuminate\Database\QueryException $ex) {
            $success = false;
            $message = $ex->getMessage();
        }

        // response
        $response = [
            'success' => $success,
            'message' => $message,
        ];
        return response()->json($response);
    }

    public function isUser()
    {
        $user = Auth::user();
        if ($user) {
            $success = true;
            $messages = [
                'name' => $user->name,
                'email' => $user->email
            ];
        } else {
            $success = false;
            $messages = 'Пользователь не авторизован';
        }
        $response = [
            'success' => $success,
            'messages' => $messages
        ];
        return response($response);
    }

    public function isAdmin()
    {
        $user = Auth::user();
        if ($user && $user->is_admin === 1) {
            $success = true;
        } else {
            $success = false;
        }
        $response = [
            'success' => $success
        ];
        return response($response);
    }

    public function reset(ResetRequest $request)
    {
        $email = $request->validated();
        $user = User::where('email', $email)->first();
        if ($user) {
            $password = Str::password();
            $user->password = Hash::make($password);
            $user->save();
            Mail::send(['text' => view('password', compact('password'))], ['name' => 'Kira-blog'], function ($message) use ($user) {
                $message->to($user->email, $user->name)->subject('Сброс пароля');
                $message->from('top-7.test@mail.ru');
            });
            $message = true;
        } else {
            $message = false;
        }
        $response = [
            'success' => $message
        ];
        return response()->json($response);
    }
}
