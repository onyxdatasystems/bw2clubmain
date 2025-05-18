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
        Schema::table('initiatives', function (Blueprint $table) {
            $table->integer('share_count')->default(0)->after('created_by');
        });
    }

    public function down()
    {
        //Schema::dropIfExists('initiatives');
    }
};
