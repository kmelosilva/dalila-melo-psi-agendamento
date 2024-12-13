<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    use HasFactory;
    protected $table = 'users';

    protected $fillable = ['name', 'email', 'password'];
    public function agendamento()
    {
        return $this->hasMany(Agendamento::class, 'user_id');
    }
}
