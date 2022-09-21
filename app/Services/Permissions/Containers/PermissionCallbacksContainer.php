<?php

namespace App\Services\Permissions\Containers;

use Illuminate\Support\Collection;

class PermissionCallbacksContainer
{
    protected Collection $container;

    public function __construct()
    {
        $this->container = new Collection();
    }

    public function add(string $callback): self
    {
        $this->container->push($callback);

        return $this;
    }

    public function getContainer(): Collection
    {
        return $this->container;
    }

    public function fetch($className)
    {
        if (false !== ($key = $this->container->search($className))) {
            return $this->container[$key];
        }

        return null;
    }
}
