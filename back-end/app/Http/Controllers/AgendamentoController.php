<?php

namespace App\Http\Controllers;

use App\Models\Agendamento;
use Illuminate\Http\Request;

class AgendamentoController extends Controller
{
    public function index()
    {
        return Agendamento::with(['paciente', 'user', 'service'])->get(); // Listar todos os agendamentos com relações
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'patient_id' => 'required|exists:pacientes,id',
            'user_id' => 'required|exists:users,id',
            'service_id' => 'nullable|exists:services,id',
            'appointment_date' => 'required|date',
            'notes' => 'nullable|string',
        ]);

        return Agendamento::create($validated); // Criar um novo agendamento
    }

    public function show(Agendamento $agendamento)
    {
        return $agendamento->load(['paciente', 'user', 'service']); // Exibir agendamento específico com relações
    }

    public function update(Request $request, Agendamento $agendamento)
    {
        $validated = $request->validate([
            'patient_id' => 'sometimes|required|exists:pacientes,id',
            'user_id' => 'sometimes|required|exists:users,id',
            'service_id' => 'nullable|exists:services,id',
            'appointment_date' => 'sometimes|required|date',
            'notes' => 'nullable|string',
        ]);

        $agendamento->update($validated);

        return $agendamento; // Atualizar agendamento
    }

    public function destroy(Agendamento $agendamento)
    {
        $agendamento->delete(); // Excluir agendamento
        return response()->noContent();
    }
}
