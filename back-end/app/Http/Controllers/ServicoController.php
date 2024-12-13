<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;

class ServicoController extends Controller
{
    public function index()
    {
        return Service::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
        ]);

        return Service::create($validated);
    }

    public function show(Service $servico)
    {
        return $servico;
    }

    public function update(Request $request, Service $servico)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'sometimes|required|numeric|min:0',
        ]);

        $servico->update($validated);

        return $servico;
    }

    public function destroy(Service $servico)
    {
        $servico->delete();
        return response()->noContent();
    }
}
