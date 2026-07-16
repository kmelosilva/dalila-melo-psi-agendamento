<?php

use App\Http\Controllers\AgendamentoController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HorariosDisponiveisController;
use App\Http\Controllers\PacienteController;
use App\Http\Controllers\ServicoController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::get('/horarios', [HorariosDisponiveisController::class, 'index']);

    Route::apiResource('pacientes', PacienteController::class);
    Route::apiResource('servicos', ServicoController::class);
    Route::apiResource('agendamentos', AgendamentoController::class);
});
