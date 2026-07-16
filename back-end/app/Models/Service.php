<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'price'];

    public function agendamentos()
    {
        return $this->hasMany(Agendamento::class, 'service_id');
    }
}
