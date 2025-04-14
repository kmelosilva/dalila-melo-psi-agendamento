import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface Paciente {
    id: number;
    name: string;
    email: string;
    phone: string;
    notes: string;
}

const Pacientes: React.FC = () => {
    const [pacientes, setPacientes] = useState<Paciente[]>([]);

    useEffect(() => {
        api.get('/pacientes')
            .then(response => {
                setPacientes(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar pacientes:', error);
            });
    }, []);

    return (
        <div>
            <h1>Lista de Pacientes</h1>
            <ul>
                {pacientes.map(paciente => (
                    <li key={paciente.id}>{paciente.name} - {paciente.email} Phone: {paciente.phone} Obs: {paciente.notes}</li>
                ))}
            </ul>
        </div>
    );
};

export default Pacientes;
