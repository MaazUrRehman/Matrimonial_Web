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
        Schema::create('family_background', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id'); // Changed from string to unsignedBigInteger
            $table->foreign('user_id')->references('id')->on('users');
            $table->string('father_name');
            $table->string('mother_name');
            $table->string('father_profession');
            $table->string('mother_profession');
            $table->string('brothers_count');
            $table->string('brothers_married');
            $table->string('sisters_count');
            $table->string('sisters_married');
            $table->string('social_status');
            $table->string('family_residence');
            $table->string('financial_status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('family_background');
    }
};
