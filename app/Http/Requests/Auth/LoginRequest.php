<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\Request;

class LoginRequest extends Request
{
    public function rules(): array
    {
        return [
            'email' => 'required|email',
            'password' => 'required|min:6|confirmed',
        ];
    }
}
