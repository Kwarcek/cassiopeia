<?php

namespace App\Services\Permissions\Interface;

interface AuthorityInterface
{
    public function getAbilitiesForAuthority(bool $refreshCache = false): array;
    public function getAbilitiesCacheKey(): string;
}
