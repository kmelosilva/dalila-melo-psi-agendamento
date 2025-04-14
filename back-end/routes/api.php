<?php
use App\Http\Controllers\PacienteController;
use App\Http\Controllers\ServicoController;
use App\Http\Controllers\AgendamentoController;
use App\Http\Controllers\UserController;

Route::apiResource('pacientes', PacienteController::class);
Route::apiResource('servicos', ServicoController::class);
Route::apiResource('agendamentos', AgendamentoController::class);
Route::apiResource('usuarios', UserController::class);
