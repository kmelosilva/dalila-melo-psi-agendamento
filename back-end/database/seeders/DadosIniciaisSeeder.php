<?php

namespace Database\Seeders;

use App\Models\HorariosDisponiveis;
use App\Models\Service;
use App\Models\Usuario;
use Illuminate\Database\Seeder;

class DadosIniciaisSeeder extends Seeder
{
    public function run(): void
    {
        // Psicóloga
        $psicologa = Usuario::firstOrCreate(
            ['email' => 'dalila@dalilamelo.com.br'],
            [
                'name'     => 'Dalila Melo',
                'password' => bcrypt('dalila123'),
                'role'     => 'psicologa',
            ]
        );

        // Serviços
        $servicos = [
            ['name' => 'Consulta Individual',     'price' => 180.00, 'description' => 'Atendimento psicológico individual com duração de 50 minutos.'],
            ['name' => 'Avaliação Psicológica',   'price' => 250.00, 'description' => 'Sessão de avaliação e diagnóstico.'],
            ['name' => 'Terapia de Casal',        'price' => 220.00, 'description' => 'Atendimento para casais com duração de 60 minutos.'],
        ];

        foreach ($servicos as $s) {
            Service::firstOrCreate(['name' => $s['name']], $s);
        }

        // Horários disponíveis para as próximas 3 semanas (seg, qua, sex)
        $horas = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
        $diasSemana = [1, 3, 5]; // Segunda, Quarta, Sexta

        $data = now()->startOfDay()->addDay();
        $limite = now()->addWeeks(3);

        while ($data->lessThanOrEqualTo($limite)) {
            if (in_array($data->dayOfWeek, $diasSemana)) {
                foreach ($horas as $hora) {
                    HorariosDisponiveis::firstOrCreate([
                        'user_id'    => $psicologa->id,
                        'data'       => $data->toDateString(),
                        'hora'       => $hora,
                    ], ['disponivel' => true]);
                }
            }
            $data->addDay();
        }

        $this->command->info('Dados iniciais criados: psicóloga Dalila, 3 serviços e horários para 3 semanas.');
    }
}
