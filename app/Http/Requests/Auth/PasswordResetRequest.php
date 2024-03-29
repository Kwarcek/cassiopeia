<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\Request;

class PasswordResetRequest extends Request
{
    public function rules(): array
    {
        return [
            'email' => 'required|email',
        ];
    }
}
