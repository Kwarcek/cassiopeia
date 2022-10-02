<?php

namespace App\Http\Api\Auth;

use App\Http\Api\ApiController;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\PasswordResetRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

class AuthApiController extends ApiController
{
    public function login(LoginRequest $request): JsonResponse
    {
        $token = auth('api')->attempt($request->only(['email','password']));

        if (!$token) {
            throw ValidationException::withMessages([
                'email' => 'Invalid email',
                'password' => 'Invalid password'
            ]);
        }

        $user = User::whereEmail($request->email)->first();

        return $this->respondWithToken($token, $user);
    }

    public function refresh(): JsonResponse
    {
        $this->middleware('auth:api');

        return $this->respondWithToken(auth('api')->refresh());
    }

    public function passwordReset(PasswordResetRequest $request)
    {
        $status = Password::sendResetLink(
            $request->only('email')
        );

        if($status === Password::RESET_LINK_SENT) {
            return response()->json([
                'status' => __($status)
            ]);
        }

        return response()->json([
            'email' => __($status)
        ], 422);
    }

    public function logout(): JsonResponse
    {
        $this->middleware('auth:api');

        auth('api')->logout();

        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    protected function respondWithToken(mixed $token, ?User $user = null): JsonResponse
    {
        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'bearer',
            'token_expiration_date' => auth('api')->factory()->getTTL() * 60
        ]);
    }
}
