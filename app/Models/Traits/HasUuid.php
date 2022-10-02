<?php

namespace App\Models\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

trait HasUuid
{
    protected static function boot(): void
    {
        parent::boot();

        static::creating(function (Model $model) {
            $model->setAttribute(
                $model->getKeyName(),
                Str::uuid()->toString()
            );
        });
    }
}
