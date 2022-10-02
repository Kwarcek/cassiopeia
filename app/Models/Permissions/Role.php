<?php

namespace App\Models\Permissions;

use App\Models\Model;
use App\Models\Traits\HasUuid;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Role extends Model
{
    use HasFactory;
    use HasUuid;

    protected $table = 'permissions_role';

    public $timestamps = false;

    protected $fillable = [
      'name'
    ];

    public function users(): MorphToMany
    {
        return $this->morphedByMany(User::class, 'roleable', 'permissions_role_morph');
    }
}
