<?php

namespace App\Http\Controllers;

use App\Models\HorariosDisponiveis;
use Illuminate\Http\Request;

class HorariosDisponiveisController extends Controller
{
    public function index(Request $request)
    {
        $query = HorariosDisponiveis::where('disponivel', true)
            ->where('data', '>=', now()->toDateString())
            ->orderBy('data')
            ->orderBy('hora');

        if ($request->has('data')) {
            $query->where('data', $request->data);
        }

        return $query->get();
    }
}
