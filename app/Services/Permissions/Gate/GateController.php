<?php

namespace App\Services\Permissions\Gate;

use App\Services\Permissions\Callbacks\CallbackArguments;
use App\Services\Permissions\Containers\PermissionCallbacksContainer;
use App\Services\Permissions\Interface\AuthorityInterface;
use App\Services\Permissions\Interface\GateInterface;
use Illuminate\Contracts\Auth\Access\Gate;

class GateController implements GateInterface
{
    protected PermissionCallbacksContainer $permissionCallbacksContainer;

    private array $callbacks = [];

    public function __construct(PermissionCallbacksContainer $container)
    {
        $this->permissionCallbacksContainer = $container;
    }

    public function check(
        AuthorityInterface $authority,
        string $ability,
        array $arguments = []
    ): bool
    {
        $abilities = $authority->getAbilitiesForAuthority();

        if ($this->isGod($abilities)) {
            return true;
        }

        $filteredAbilities = $this->filterAbilities(
            $abilities,
            $ability
        );

        if(!$filteredAbilities) {
            return false;
        }

        foreach ($filteredAbilities as $filteredAbility) {
            return match ($filteredAbility['permission']) {
                'deny' => false,
                'allow' => true,
                'callback' => $this->processCallback($filteredAbility, $authority, $ability, $arguments)
            };
        }
    }

    private function processCallback(
        array $filteredAbility,
        AuthorityInterface $authority,
        string $ability,
        array $arguments
    ): bool
    {
        $className = $this->permissionCallbacksContainer->fetch($filteredAbility['callback']);

        if($className) {
            return false;
        }

        $callbackArguments = new CallbackArguments($authority, $ability, $arguments);

        $this->callbacks[$className] = new $className($callbackArguments);
        return \call_user_func([$this->callbacks[$className], 'handle']);
    }

    public function registerGate(Gate $gate): void
    {
        $gate->before(function ($authority, $ability, $arguments = []) {
            return $this->check($authority, $ability, $arguments);
        });
    }

    protected function isGod(array $abilities): bool
    {
        return collect($abilities)->filter(function(array $ability) {
           return $ability['ability'] === 'godmode' &&  $ability['permission'] === 'allow';
        })->isNotEmpty();
    }

    private function filterAbilities(array $abilities, string $ability): array
    {
        return collect($abilities)->filter(function(array $loopAbility) use ($ability) {
            return $loopAbility['ability'] === $ability;
        })->toArray();
    }
}
