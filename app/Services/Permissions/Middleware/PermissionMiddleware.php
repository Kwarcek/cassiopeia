<?php

namespace App\Services\Permissions\Middleware;

use Closure;
use Illuminate\Http\Request;

class PermissionMiddleware
{
    public function handle(Request $request, Closure $next, ?string $ability = null): mixed
    {
        if (app('auth')->user()->cant($ability)) {
            throw new \Exception();
        }

        return $next($request);
    }
}
