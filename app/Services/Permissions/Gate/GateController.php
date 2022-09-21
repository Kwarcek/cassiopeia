<?php

/*
 * This file is part of Multiplay Management System
 * (c) Jakub Augustynowicz <j.augustynowicz@multiplay.pl>
 *     Przemysław Rakoniewski <p.rakoniewski@multiplay.pl>
 *
 */

namespace App\Services\Permissions\Gate;

use App\Services\Permissions\Callbacks\CallbackArguments;
use App\Services\Permissions\Containers\PermissionCallbacksContainer;
use App\Services\Permissions\Interface\AuthorityInterface;
use App\Services\Permissions\Interface\GateInterface;
use Illuminate\Contracts\Auth\Access\Gate;

class GateController implements GateInterface
{
    private array $callbacks = [];

    public function __construct(
        private PermissionCallbacksContainer $permissionCallbacksContainer
    ) {
    }

    public function check(AuthorityInterface $authority, string $ability, array $arguments = []): bool
    {
        $abilities = $authority->getAbilitiesForAuthority();

        if ($this->isGod($abilities)) {
            return true;
        }

        $filteredAbilities = $this->filterAbilities(
            $abilities,
            $ability
        );

        if (!$filteredAbilities) {
            return false;
        }

        foreach ($filteredAbilities as $filteredAbility) {
            return true;
//            match($filteredAbility['permission']) {
//                'deny' => false,
//                'allow' => true,
//                'callback' => true, // x
//            };
        }

        if ($filteredAbilities = $this->filterAbilities(
            $abilities,
            $ability
        )) {//sprawdzamy, czy uprawnienie nie jest na deny lub czy uprawnienia nie mają jakiegoś kodu do obróbki
            foreach ($filteredAbilities as $filteredAbility) {
                $argumentRet = true; // Historycznie dla obsługi argumentów Gate.

                if ($argumentRet && 'deny' === $filteredAbility['permission']) {
                    return false;
                }
                if ($argumentRet && 'allow' === $filteredAbility['permission']) {
                    return true;
                }
                if ($argumentRet && 'callback' === $filteredAbility['permission']) {
                    $arguments = new CallbackArguments(
                        $authority,
                        $ability,
                        $arguments
                    );

                    if ($className = $this->permissionCallbacksContainer->fetch($filteredAbility['callback'])) {
                        $this->callbacks[$className] = new $className($arguments);
                        return \call_user_func([$this->callbacks[$className], 'handle']);
                    }

                    return false;
                }
            }
        }

        return false;
    }

    public function registerGate(Gate $gate): void
    {
        $gate->before(function (AuthorityInterface $authority, string $ability, array $arguments = []) {
            return $this->check($authority, $ability, $arguments);
        });
    }

    protected function isGod(iterable $abilities): bool
    {
        foreach ($abilities as $ability) {
            if (\in_array($ability['ability'], ['godmode', 'core.developer'], true)) {
                return 'allow' === $ability['permission'];
            }
        }

        return false;
    }

    private function filterAbilities(array $abilities, string $search): array
    {
        $abilities = array_filter($abilities, function ($value) use ($search) {
            if ($value['ability'] === $search) {
                return $value;
            }
        });

        return $abilities;
    }
}
