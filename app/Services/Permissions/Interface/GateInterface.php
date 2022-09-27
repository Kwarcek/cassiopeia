<?php

namespace App\Services\Permissions\Interface;

use Illuminate\Contracts\Auth\Access\Gate;

interface GateInterface
{
    public function check(AuthorityInterface $authority, string $ability, array $arguments = []): bool;
    public function registerGate(Gate $gate): void;
}
