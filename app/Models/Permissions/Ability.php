<?php

namespace App\Models\Permissions;

use App\Models\Model;
use App\Models\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Ability extends Model
{
    use HasFactory;
    use HasUuid;

    protected $table = 'permissions_ability';

    public $timestamps = false;

    protected $fillable = [
        'name', 'description'
    ];
}
