<?php

namespace App\Http\Controllers;

use App\Models\Paciente;
use Illuminate\Http\Request;

class PacienteController extends Controller
{
    public function index()
    {
        return Paciente::all(); // Listar todos os pacientes
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:pacientes,email',
            'phone' => 'nullable|string|max:20',
            'notes' => 'nullable|string',
        ]);

        return Paciente::create($validated); // Criar um novo paciente
    }

    public function show(Paciente $paciente)
    {
        return $paciente; // Exibir um paciente específico
    }

    public function update(Request $request, Paciente $paciente)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:pacientes,email,' . $paciente->id,
            'phone' => 'nullable|string|max:20',
            'notes' => 'nullable|string',
        ]);

        $paciente->update($validated);

        return $paciente; // Atualizar um paciente específico
    }

    public function destroy(Paciente $paciente)
    {
        $paciente->delete(); // Excluir um paciente
        return response()->noContent();
    }
}
