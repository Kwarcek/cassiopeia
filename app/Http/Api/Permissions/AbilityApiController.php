<?php

namespace App\Http\Api\Permissions;

use App\Http\Api\ApiController;
use App\Models\User;

class AbilityApiController extends ApiController
{
    public function forUser(User $user): array
    {
        return $user->getAbilitiesForAuthority();
    }
}
