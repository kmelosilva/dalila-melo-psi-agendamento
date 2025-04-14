import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface Servico {
    id: number;
    name: string;
    price: number;
    description: string;
}

const Servicos: React.FC = () => {
    const [servicos, setServicos] = useState<Servico[]>([]);

    useEffect(() => {
        api.get('/servicos')
            .then(response => {
                setServicos(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar serviços:', error);
            });
    }, []);

    return (
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-6">Lista de Serviços</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {servicos.map(servico => (
              <div
                key={servico.id}
                className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
              >
                <h2 className="text-xl font-semibold">{servico.name}</h2>
                <p className="text-gray-700 mt-2">Descrição: {servico.description}</p>
                <p className="text-green-600 font-medium mt-1">Preço: R$ {servico.price}</p>
              </div>
            ))}
          </div>
        </div>
      );
      
};

export default Servicos;
