<?php

namespace App\Http\Controllers;

use App\Models\Usuario; // Modelo User (se estiver diferente, ajuste o nome do modelo aqui)
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        // Retorna todos os usuários
        return Usuario::all();
    }

    public function store(Request $request)
    {
        // Validação dos dados
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8', // Adicione as regras necessárias
        ]);

        // Criação do usuário
        $validated['password'] = bcrypt($validated['password']); // Encripta a senha
        return Usuario::create($validated);
    }

    public function show(Usuario $user)
    {
        // Retorna o usuário específico
        return $user;
    }

    public function update(Request $request, Usuario $user)
    {
        // Validação dos dados
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8', // Atualiza apenas se fornecido
        ]);

        // Atualiza os campos fornecidos
        if (isset($validated['password'])) {
            $validated['password'] = bcrypt($validated['password']);
        }

        $user->update($validated);

        return $user;
    }

    public function destroy(Usuario $user)
    {
        // Exclui o usuário
        $user->delete();
        return response()->noContent();
    }
}
