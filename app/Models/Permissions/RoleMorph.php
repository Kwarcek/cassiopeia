<?php

namespace App\Models\Permissions;

use App\Models\Model;
use App\Models\Traits\HasUuid;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class RoleMorph extends Model
{
    use HasUuid;

    protected $table = 'permissions_role_morph';

    public $timestamps = false;

    public function roleable(): MorphTo
    {
        return $this->morphTo();
    }
}
