<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('permissions_role_morph', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('role_id')->constrained('permissions_role');
            $table->morphs('roleable');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('permissions_role_morph');
    }
};
