<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agendamento extends Model
{
    use HasFactory;
    protected $table = 'appointments';

    protected $fillable = [
        'patient_id', 'user_id', 'service_id', 'appointment_date', 'notes'
    ];

    public function paciente()
    {
        return $this->belongsTo(Paciente::class, 'patient_id');
    }

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'user_id');
    }

    public function servico()
    {
        return $this->belongsTo(Service::class, 'service_id');
    }
}
