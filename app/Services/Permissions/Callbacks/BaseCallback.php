<?php

namespace App\Services\Permissions\Callbacks;

abstract class BaseCallback
{
    public function __construct(
        protected CallbackArguments $arguments
    ) {
    }

    abstract public function handle(): bool;

    abstract public static function info(): string;
}
