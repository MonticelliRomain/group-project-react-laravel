<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
            $table->string('name');
            $table->dateTime('date_event');
            $table->integer('author');
            $table->text('description')->nullable();
            $table->text('address');
            $table->dateTime('reminder')->nullable();
            $table->string('media_type');
            $table->text('image_url')->nullable();
            $table->boolean('reminded')->nullable();
            $table->foreign('author')->references('id')->on('users');
            // add an adress field
            // add a video_url field
            // add listing participants
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('events');
    }
}
