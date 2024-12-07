<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHorariosDisponiveisTable extends Migration
{
    public function up()
    {
        Schema::create('horarios_disponiveis', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id'); // Referência ao psicólogo
            $table->date('data');
            $table->time('hora');
            $table->boolean('disponivel')->default(true);
            $table->timestamps();

            // Chave estrangeira
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('horarios_disponiveis');
    }
}
