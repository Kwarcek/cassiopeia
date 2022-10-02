<?php

namespace Database\Factories\Permissions;

use Database\Factories\Factory;

class AbilityFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'description' => $this->faker->text(100),
        ];
    }
}
