<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notification>
 */
class NotificationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = ['permit_request', 'status_update'];
        $type = fake()->randomElement($types);

        $titles = [
            'permit_request' => 'New Vehicle Permit Request',
            'status_update' => 'Permit Request Update',
        ];

        $messages = [
            'permit_request' => 'New permit request from ' . fake()->name(),
            'status_update' => 'Your permit request has been ' . fake()->randomElement(['approved', 'rejected']),
        ];

        return [
            'user_id' => User::factory(),
            'title' => $titles[$type],
            'message' => $messages[$type],
            'type' => $type,
            'data' => [
                'permit_request_id' => fake()->numberBetween(1, 100),
                'employee_name' => fake()->name(),
            ],
            'read' => fake()->boolean(30), // 30% chance of being read
            'read_at' => fake()->optional(0.3)->dateTimeBetween('-1 week', 'now'),
        ];
    }

    /**
     * Indicate that the notification is unread.
     */
    public function unread(): static
    {
        return $this->state(fn (array $attributes) => [
            'read' => false,
            'read_at' => null,
        ]);
    }

    /**
     * Indicate that the notification is read.
     */
    public function read(): static
    {
        return $this->state(fn (array $attributes) => [
            'read' => true,
            'read_at' => fake()->dateTimeBetween('-1 week', 'now'),
        ]);
    }
}