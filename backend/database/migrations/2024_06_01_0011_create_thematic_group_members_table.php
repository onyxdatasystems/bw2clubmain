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
        Schema::create('thematic_group_members', function (Blueprint $table) {
            $table->id();
            $table->foreignId('thematic_group_id')->constrained();
            $table->foreignId('user_id')->constrained();
            $table->string('role', ['leader', 'member', 'contributor'])->default('member');
            $table->timestamps();
            $table->primary(['thematic_group_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('thematic_group_members');
    }
};
