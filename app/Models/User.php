<?php

namespace App\Models;

use App\Models\Traits\HasPermission;
use App\Models\Traits\HasUuid;
use App\Services\Permissions\Interface\AuthorityInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements AuthorityInterface, JWTSubject
{
    use HasFactory;
    use Notifiable;
    use HasPermission;
    use HasUuid;

    protected const ABILITY_CACHE_TAG = 'abilities';
    protected const ABILITY_CACHE_TTL = 600;

    public $incrementing = false;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getJWTIdentifier(): mixed
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims(): array
    {
        return [];
    }

    public function getAbilitiesForAuthority(bool $refreshCache = false): array
    {
        $cacheKey = $this->getAbilitiesCacheKey();

        if ($refreshCache) {
            \Cache::tags(self::ABILITY_CACHE_TAG)->forget($cacheKey);
        }

        if (\Cache::tags(self::ABILITY_CACHE_TAG)->has($cacheKey)) {
            return \Cache::tags(self::ABILITY_CACHE_TAG)->get($cacheKey);
        }

        $abilities = $this->loadMissing('roles.abilities')->roles()->get()->flatten()->toArray();

        \Cache::tags(self::ABILITY_CACHE_TAG)->add($cacheKey, $abilities, self::ABILITY_CACHE_TTL);

        return $abilities;
    }

    public function getAbilitiesCacheKey(): string
    {
        return self::ABILITY_CACHE_TAG . '-' . $this->getTable() . '-' . $this->getKey();
    }
}
