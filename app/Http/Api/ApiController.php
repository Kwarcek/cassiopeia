<?php

namespace App\Http\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ApiController extends Controller
{
    private const VALID_PER_PAGE_NUMBERS = [5, 10, 15, 20, 25, 50];

    public function __construct(Request $request)
    {
        $this->validatePagination($request);
    }

    public function validatePagination(Request $request): void
    {
        $request->validate([
           'per_page' => ['sometimes', 'numeric', Rule::in(self::VALID_PER_PAGE_NUMBERS)],
           'page' => 'sometimes|numeric',
        ]);
    }
}
