<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{
    use HasFactory, HasApiTokens;

    protected $table = 'users';

    protected $fillable = ['name', 'email', 'password', 'role', 'paciente_id'];

    protected $hidden = ['password'];

    public function agendamento()
    {
        return $this->hasMany(Agendamento::class, 'user_id');
    }
}
