<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('permit_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained('employees')->onDelete('cascade');
            $table->datetime('start_datetime')->comment('Vehicle usage start date and time');
            $table->datetime('end_datetime')->comment('Vehicle usage end date and time');
            $table->string('vehicle_type')->comment('Type of vehicle requested');
            $table->string('license_plate')->comment('Vehicle license plate number');
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending')->comment('Request status');
            $table->text('notes')->nullable()->comment('Additional notes or rejection reason');
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('reviewed_at')->nullable()->comment('When the request was reviewed');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('status');
            $table->index('start_datetime');
            $table->index('end_datetime');
            $table->index(['employee_id', 'status']);
            $table->index(['status', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permit_requests');
    }
};