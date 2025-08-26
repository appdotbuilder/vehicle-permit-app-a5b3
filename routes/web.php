<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PermitRequestController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Home page with permit request form
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Public route for permit requests (employees don't need login)
Route::controller(PermitRequestController::class)->group(function () {
    Route::get('/request-permit', 'create')->name('permit-requests.create');
    Route::post('/request-permit', 'store')->name('permit-requests.store');
    Route::get('/permit-requests/{permitRequest}', 'show')->name('permit-requests.show');
});

// Public API route for employee lookup
Route::get('/api/employees/by-id', [EmployeeController::class, 'show'])->name('employees.by-id');

// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Employee management (HR/Admin only)
    Route::resource('employees', EmployeeController::class);
    
    // Permit request management (HR/Admin only)
    Route::controller(PermitRequestController::class)->group(function () {
        Route::get('/permit-requests', 'index')->name('permit-requests.index');
        Route::patch('/permit-requests/{permitRequest}', 'update')->name('permit-requests.update');
        Route::delete('/permit-requests/{permitRequest}', 'destroy')->name('permit-requests.destroy');
    });
    
    // Notifications
    Route::controller(NotificationController::class)->group(function () {
        Route::get('/notifications', 'index')->name('notifications.index');
        Route::patch('/notifications/{notification}', 'update')->name('notifications.update');
        Route::post('/notifications/mark-all-read', 'store')->name('notifications.mark-all-read');
        Route::get('/api/notifications/unread-count', function() {
            return app(\App\Http\Controllers\NotificationController::class)->show('unread-count');
        })->name('notifications.unread-count');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
