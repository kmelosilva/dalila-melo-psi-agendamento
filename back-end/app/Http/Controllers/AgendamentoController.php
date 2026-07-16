<?php

namespace App\Http\Controllers;

use App\Models\Agendamento;
use App\Models\Usuario;
use Illuminate\Http\Request;

class AgendamentoController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $query = Agendamento::with(['paciente', 'usuario', 'servico']);

        if ($user->role === 'paciente') {
            $query->where('patient_id', $user->paciente_id);
        }

        return $query->orderBy('appointment_date', 'desc')->get();
    }

    public function store(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'service_id'       => 'nullable|exists:services,id',
            'appointment_date' => 'required|date|after:now',
            'notes'            => 'nullable|string',
        ]);

        $psicologa = Usuario::where('role', 'psicologa')->first();

        $agendamento = Agendamento::create([
            'patient_id'       => $user->paciente_id,
            'user_id'          => $psicologa?->id,
            'service_id'       => $validated['service_id'] ?? null,
            'appointment_date' => $validated['appointment_date'],
            'notes'            => $validated['notes'] ?? null,
            'active'           => 1,
        ]);

        return $agendamento->load(['paciente', 'usuario', 'servico']);
    }

    public function show(Agendamento $agendamento)
    {
        return $agendamento->load(['paciente', 'usuario', 'servico']);
    }

    public function update(Request $request, Agendamento $agendamento)
    {
        $validated = $request->validate([
            'service_id'       => 'nullable|exists:services,id',
            'appointment_date' => 'sometimes|required|date|after:now',
            'notes'            => 'nullable|string',
        ]);

        $agendamento->update($validated);

        return $agendamento->load(['paciente', 'usuario', 'servico']);
    }

    public function destroy(Agendamento $agendamento)
    {
        $agendamento->update(['active' => 0]);
        return response()->noContent();
    }
}
