<?php

namespace App\Models\Traits;

use App\Models\Permissions\Ability;
use App\Models\Permissions\Role;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

trait HasPermission
{
    public function abilities(): BelongsTo
    {
        return $this->belongsTo(Ability::class, 'ability_id', 'id');
    }

    public function roles(): MorphToMany
    {
        return $this->morphToMany(Role::class, 'roleable', 'permissions_role_morph');
    }

    public function getAbilitiesCacheKey(): string
    {
        return $this->getAbilityCacheTag() . '-' . $this->getTable() . '-' . $this->getKey();
    }

    public function getAbilityCacheTag(): string
    {
        return 'abilities';
    }
}
