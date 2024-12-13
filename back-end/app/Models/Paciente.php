<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paciente extends Model
{
    use HasFactory;

    // Campos permitidos para preenchimento em massa
    protected $fillable = ['name', 'email', 'phone', 'notes'];

    public function agendamento()
    {
        return $this->hasMany(Agendamento::class, 'patient_id');
    }
}
