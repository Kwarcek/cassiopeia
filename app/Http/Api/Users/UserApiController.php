<?php

namespace App\Http\Api\Users;

use App\Http\Api\ApiController;
use App\Http\Resources\Users\UserIndexResource;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Pagination\LengthAwarePaginator;

class UserApiController extends ApiController
{
    public function index(): AnonymousResourceCollection
    {
        return (UserIndexResource::collection(User::all()));
    }

    public function paginate(Request $request): LengthAwarePaginator
    {
        return User::query()
            ->when($request->sort, function(Builder $query) use ($request) {
                $sort = explode('|', $request->sort);
                $query->orderBy($sort[0], $sort[1]);
            })
            ->paginate(
                perPage: $request->per_page,
                page: $request->page
        );
    }
}
