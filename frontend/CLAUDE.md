# Front-End — Next.js 16

Interface do sistema de agendamento. Usa App Router do Next.js com TypeScript e Tailwind CSS 4.

## Estrutura de páginas planejada

```
app/
├── layout.tsx               # Root layout (já existe)
├── page.tsx                 # Home / redirect para login
├── (auth)/
│   └── login/page.tsx       # Formulário de login
├── dashboard/
│   ├── page.tsx             # Visão geral da agenda (paciente ou psicóloga)
│   ├── agendamentos/
│   │   ├── page.tsx         # Lista de agendamentos
│   │   ├── novo/page.tsx    # Novo agendamento
│   │   └── [id]/page.tsx    # Editar / cancelar agendamento
│   └── servicos/
│       └── page.tsx         # Lista de serviços disponíveis
└── globals.css
```

## Integração com a API

- Backend base URL: `http://localhost:8000/api`
- Autenticação: Laravel Sanctum (cookie-based para SPA)
- Criar camada de serviços em `lib/api.ts` com funções tipadas por recurso

## Convenções

- Framework: Next.js 16 App Router (não Pages Router)
- Componentes: React 19 com hooks funcionais
- Estilo: Tailwind CSS 4
- Tipagem: TypeScript strict
- Biblioteca de componentes: a definir (candidatos: shadcn/ui, Radix UI)

## Regras de negócio no front

- Paciente só vê/edita os próprios agendamentos
- Psicóloga vê todos os agendamentos de todos os pacientes
- Agendamentos com `active=0` aparecem como "Cancelado" na lista (não são ocultados)
- Horários disponíveis vêm da tabela `horarios_disponiveis` do back-end (endpoint a criar)
- Regras de antecedência mínima para cancelamento: a definir com a cliente

## Como rodar

```bash
npm run dev    # http://localhost:3000
npm run build
npm run lint
```
