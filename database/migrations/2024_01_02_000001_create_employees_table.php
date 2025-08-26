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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('employee_id')->unique()->comment('Unique employee identifier');
            $table->string('name')->comment('Employee full name');
            $table->string('department')->comment('Employee department');
            $table->string('grade')->comment('Employee grade/position');
            $table->string('email')->unique()->comment('Employee email address');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('employee_id');
            $table->index('department');
            $table->index('name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};