# Dalila Melo PSI — Sistema de Agendamento

Site de psicóloga com agendamento online. Pacientes fazem login e podem visualizar a agenda, agendar, editar e cancelar consultas.

## Arquitetura

```
dalila-melo-psi/
├── back-end/   # Laravel 10 + PHP 8.1 — REST API
├── frontend/   # Next.js 16 + React 19 + TypeScript + Tailwind CSS 4
└── docker-compose.yml
```

## Como rodar

```bash
docker-compose up -d
# Backend:  http://localhost:8000
# Frontend: http://localhost:3000
# MySQL:    localhost:3307 (db: agendamento, user: root, pass: root)
```

Ou manualmente:

```bash
# Backend
cd back-end && php artisan serve

# Frontend
cd frontend && npm run dev
```

## Regras de negócio principais

- Dois papéis: `psicologa` e `paciente` (coluna `role` na tabela `users`)
- Cancelamento de agendamento = soft delete via `active=0` (não apaga o registro)
- Tabela `horarios_disponiveis` controla os horários disponíveis da psicóloga
- Agendamento tem: paciente, psicóloga (usuario), serviço, data/hora, notas, status ativo

## Stack

| Camada   | Tecnologia                                        |
|----------|---------------------------------------------------|
| Backend  | Laravel 10, PHP 8.1, Sanctum (auth)               |
| Frontend | Next.js 16, React 19, TypeScript 5, Tailwind CSS 4 |
| Banco    | MySQL 8                                           |
| Infra    | Docker Compose                                    |

## Issues conhecidos

- `config/auth.php` referencia `App\Models\User` mas o modelo real é `App\Models\Usuario` — precisa corrigir para Sanctum funcionar
- Campo `active` na tabela `appointments` não está no `$fillable` do model `Agendamento`
- Nenhuma rota de API tem middleware de autenticação ainda (rotas abertas)
- Model `HorariosDisponiveis` não existe (só a migration da tabela)
