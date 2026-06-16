<?php
use App\Http\Controllers\PacienteController;
use App\Http\Controllers\ServicoController;
use App\Http\Controllers\AgendamentoController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::apiResource('pacientes', PacienteController::class);
    Route::apiResource('servicos', ServicoController::class);
    Route::apiResource('agendamentos', AgendamentoController::class);
    Route::apiResource('usuarios', UserController::class);
});
