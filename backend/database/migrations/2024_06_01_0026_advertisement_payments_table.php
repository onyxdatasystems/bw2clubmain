<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::dropIfExists('advertisement_payments');
        Schema::create('advertisement_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            //$table->foreignId('sponsor_id')->constrained();
            $table->string('payment_identifier')->unique();
            $table->decimal('amount', 10, 2);
            $table->integer('duration_days');
            $table->enum('status', ['pending', 'completed', 'failed'])->default('pending');
            $table->dateTime('completed_at')->nullable();
            $table->unsignedBigInteger('sponsor_id');
            $table->timestamps();
        });

        // Change sponsor_id to BIGINT
        Schema::table('advertisement_payments', function (Blueprint $table) {
            $table->unsignedBigInteger('sponsor_id')->change();
        });

// Add foreign key constraint
        Schema::table('advertisement_payments', function (Blueprint $table) {
            $table->foreign('sponsor_id')
                ->references('id')
                ->on('sponsors')
                ->onDelete('cascade');
        });

        Schema::create('job_wishlists', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('job_id')->constrained();
            $table->timestamps();

            $table->unique(['user_id', 'job_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('advertisement_payments');
    }
};
