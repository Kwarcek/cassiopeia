<?php

namespace Database\Factories\Permissions;

use Database\Factories\Factory;

class RoleFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->jobTitle(),
        ];
    }
}
