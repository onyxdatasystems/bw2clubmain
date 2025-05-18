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
        Schema::create('cheers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('initiative_id')->constrained();
            $table->foreignId('user_id')->constrained();
            $table->timestamps();

            $table->unique(['initiative_id', 'user_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('cheers');
    }
};
