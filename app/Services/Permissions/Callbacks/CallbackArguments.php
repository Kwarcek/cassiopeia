<?php

namespace App\Services\Permissions\Callbacks;

use App\Services\Permissions\Interface\AuthorityInterface;

class CallbackArguments
{
    public function __construct(
        public AuthorityInterface $authority,
        public string $ability,
        public mixed $args
    ) {
    }
}
