<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'employee_id' => 'EMP' . str_pad((string)fake()->unique()->numberBetween(1, 9999), 3, '0', STR_PAD_LEFT),
            'name' => fake()->name(),
            'department' => fake()->randomElement(['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'Design']),
            'grade' => fake()->randomElement(['Junior', 'Senior', 'Manager', 'Director', 'Specialist', 'Analyst']),
            'email' => fake()->unique()->safeEmail(),
        ];
    }
}