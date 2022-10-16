<?php

namespace App\Models;

use App\Models\Traits\HasPermission;
use App\Models\Traits\HasUuid;
use App\Services\Permissions\Interface\AuthorityInterface;
use Illuminate\Database\Eloquent\Builder;
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

    protected const ABILITY_CACHE_TTL = 600;

    protected $appends = ['display_name'];

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

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('active', true);
    }

    public function getAbilitiesForAuthority(bool $refreshCache = false): array
    {
        $cacheKey = $this->getAbilitiesCacheKey();

        if ($refreshCache) {
            \Cache::tags($this->getAbilityCacheTag())->forget($cacheKey);
        }

        if (\Cache::tags($this->getAbilityCacheTag())->has($cacheKey)) {
            return \Cache::tags($this->getAbilityCacheTag())->get($cacheKey);
        }

        $abilities = $this->loadMissing('roles.abilities')
            ->roles()
            ->get()
            ->flatten()
            ->toArray();

        \Cache::tags($this->getAbilityCacheTag())->add(
            $cacheKey,
            $abilities,
            self::ABILITY_CACHE_TTL
        );

        return $abilities;
    }

    public function getDisplayNameAttribute(): string
    {
        return $this->firstname.' '.$this->lastname;
    }
}
