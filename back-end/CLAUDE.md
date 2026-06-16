# Back-End — Laravel 10

REST API para o sistema de agendamento da psicóloga Dalila Melo.

## Endpoints da API

```
# Pacientes
GET    /api/pacientes
POST   /api/pacientes          { name, email, phone?, notes? }
GET    /api/pacientes/{id}
PUT    /api/pacientes/{id}
DELETE /api/pacientes/{id}     # Hard delete

# Serviços
GET    /api/servicos
POST   /api/servicos           { name, description?, price }
GET    /api/servicos/{id}
PUT    /api/servicos/{id}
DELETE /api/servicos/{id}

# Agendamentos
GET    /api/agendamentos       # Inclui relações: paciente, usuario, servico
POST   /api/agendamentos       { patient_id, user_id, service_id?, appointment_date, notes? }
GET    /api/agendamentos/{id}
PUT    /api/agendamentos/{id}
DELETE /api/agendamentos/{id}  # Soft delete: seta active=0

# Usuários (psicóloga/paciente)
GET    /api/usuarios
POST   /api/usuarios           { name, email, password, role? }
GET    /api/usuarios/{id}
PUT    /api/usuarios/{id}
DELETE /api/usuarios/{id}
```

## Modelos e relacionamentos

```
Usuario (tabela: users)
  role: 'psicologa' | 'paciente'
  hasMany → Agendamento (user_id)

Paciente (tabela: pacientes)
  hasMany → Agendamento (patient_id)

Service (tabela: services)
  hasMany → Agendamento (service_id)

Agendamento (tabela: appointments)
  belongsTo → Paciente (patient_id)
  belongsTo → Usuario  (user_id)
  belongsTo → Service  (service_id)
  active: 1=ativo, 0=cancelado
```

## Banco de dados

- Driver: MySQL 8, database: `agendamento`
- Tabelas: `users`, `pacientes`, `services`, `appointments`, `horarios_disponiveis`
- `appointments.active` = 1 por padrão; cancelamento seta para 0
- `horarios_disponiveis`: user_id, data (date), hora (time), disponivel (bool)

## Autenticação

- Laravel Sanctum instalado e configurado (`config/sanctum.php`)
- Domínio stateful configurado: `localhost:3000`
- **Pendente**: aplicar middleware `auth:sanctum` nas rotas protegidas de `routes/api.php`
- **Bug**: `config/auth.php` usa `App\Models\User`; corrigir para `App\Models\Usuario`

## Padrões de código

- Controllers: validação inline com `$request->validate([...])`
- Soft delete de agendamento: `$agendamento->update(['active' => 0])` no método `destroy()`
- Relacionamentos carregados com `->with(['paciente', 'usuario', 'servico'])` nos métodos `index()` e `show()`
- Senhas: `bcrypt($request->password)` no `store()` e `update()` do UserController

## Arquivos-chave

| Arquivo | Função |
|---------|--------|
| `routes/api.php` | Definição de todas as rotas REST |
| `app/Models/Agendamento.php` | Model principal (tabela: appointments) |
| `app/Http/Controllers/AgendamentoController.php` | CRUD + soft delete de consultas |
| `database/migrations/` | Schema completo do banco |
| `config/sanctum.php` | Configuração de autenticação SPA |
| `config/cors.php` | CORS liberado para localhost:3000 |
