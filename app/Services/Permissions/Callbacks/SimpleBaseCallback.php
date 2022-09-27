<?php

namespace App\Services\Permissions\Callbacks;

use App\Models\User;

class SimpleBaseCallback extends BaseCallback
{
    public function handle(): bool
    {
        return $this->arguments->authority instanceof User;
    }

    public static function info(): string
    {
        return 'Check if authority is \App\Models\User instance';
    }
}
