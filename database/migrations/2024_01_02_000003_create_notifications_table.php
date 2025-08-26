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
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('title')->comment('Notification title');
            $table->text('message')->comment('Notification message');
            $table->string('type')->comment('Notification type (permit_request, status_update)');
            $table->json('data')->nullable()->comment('Additional notification data');
            $table->boolean('read')->default(false)->comment('Whether notification has been read');
            $table->timestamp('read_at')->nullable()->comment('When notification was read');
            $table->timestamps();
            
            // Indexes for performance
            $table->index(['user_id', 'read']);
            $table->index(['user_id', 'created_at']);
            $table->index('type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};