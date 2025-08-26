<?php

namespace Database\Factories;

use App\Models\Employee;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PermitRequest>
 */
class PermitRequestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = fake()->dateTimeBetween('+1 day', '+1 month');
        $endDate = fake()->dateTimeBetween($startDate, '+2 months');

        return [
            'employee_id' => Employee::factory(),
            'start_datetime' => $startDate,
            'end_datetime' => $endDate,
            'vehicle_type' => fake()->randomElement(['Sedan', 'SUV', 'Van', 'Truck', 'Motorcycle']),
            'license_plate' => fake()->bothify('???-####'),
            'status' => fake()->randomElement(['pending', 'approved', 'rejected']),
            'notes' => fake()->optional()->sentence(),
        ];
    }

    /**
     * Indicate that the permit request is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'reviewed_by' => null,
            'reviewed_at' => null,
        ]);
    }

    /**
     * Indicate that the permit request is approved.
     */
    public function approved(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'approved',
            'reviewed_by' => User::factory(),
            'reviewed_at' => fake()->dateTimeBetween('-1 week', 'now'),
        ]);
    }

    /**
     * Indicate that the permit request is rejected.
     */
    public function rejected(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'rejected',
            'reviewed_by' => User::factory(),
            'reviewed_at' => fake()->dateTimeBetween('-1 week', 'now'),
            'notes' => fake()->sentence(),
        ]);
    }
}