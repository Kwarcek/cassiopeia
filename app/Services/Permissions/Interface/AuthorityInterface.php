<?php

namespace App\Services\Permissions\Interface;

interface AuthorityInterface
{
    public function getAbilitiesForAuthority(): array;
}
