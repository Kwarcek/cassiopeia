<?php

namespace App\Services\Permissions\Providers;

use App\Services\Permissions\Callbacks\SimpleBaseCallback;
use App\Services\Permissions\Containers\PermissionCallbacksContainer;
use App\Services\Permissions\Gate\GateController;
use App\Services\Permissions\Interface\GateInterface;
use Illuminate\Contracts\Auth\Access\Gate;
use Illuminate\Support\ServiceProvider;

class PermissionServiceProvider extends ServiceProvider
{
    public function boot(GateInterface $appGate, Gate $gate): void
    {
        $appGate->registerGate($gate);
        $this->registerCallbacks();
    }

    public function register(): void
    {
        $this->app->singleton(PermissionCallbacksContainer::class, function () {
            return new PermissionCallbacksContainer();
        });

        $this->app->singleton(GateInterface::class, function () {
            return new GateController(app(PermissionCallbacksContainer::class));
        });
    }

    private function registerCallbacks(): void
    {
        /** @var PermissionCallbacksContainer $permContainer */
        $permContainer = resolve(PermissionCallbacksContainer::class);
        $permContainer->add(SimpleBaseCallback::class);
    }
}
