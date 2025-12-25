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
        Schema::create('personal_information', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id'); // Changed from string to unsignedBigInteger
            $table->foreign('user_id')->references('id')->on('users');
            $table->string('full_name');
            $table->string('age');
            $table->date('date_of_birth');
            $table->string('gender');
            $table->string('height_feet');
            $table->string('height_inches');
            $table->string('religion');
            $table->string('sect')->nullable();
            $table->string('caste');
            $table->string('marital_status');
            $table->string('city');
            $table->string('country');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('personal_information');
    }
};
