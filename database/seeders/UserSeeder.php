<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create HR Admin user
        User::create([
            'name' => 'HR Admin',
            'email' => 'hr@company.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        // Create HR user
        User::create([
            'name' => 'HR Manager',
            'email' => 'hrmanager@company.com',
            'password' => Hash::make('password'),
            'role' => 'hr',
            'email_verified_at' => now(),
        ]);

        // Create regular employee user for testing
        User::create([
            'name' => 'Test Employee',
            'email' => 'employee@company.com',
            'password' => Hash::make('password'),
            'role' => 'employee',
            'email_verified_at' => now(),
        ]);
    }
}