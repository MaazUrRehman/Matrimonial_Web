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
        Schema::create('education_and_profession', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id'); // Changed from string to unsignedBigInteger
            $table->foreign('user_id')->references('id')->on('users');
            $table->string('education_level');
            $table->string('occupation');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('education_and_profession');
    }
};
