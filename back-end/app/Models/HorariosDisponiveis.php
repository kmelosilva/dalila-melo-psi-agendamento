<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HorariosDisponiveis extends Model
{
    use HasFactory;

    protected $table = 'horarios_disponiveis';

    protected $fillable = ['user_id', 'data', 'hora', 'disponivel'];

    protected $casts = [
        'data' => 'date',
        'disponivel' => 'boolean',
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'user_id');
    }
}
