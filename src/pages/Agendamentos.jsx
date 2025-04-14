import { useEffect, useState } from "react";
import api from "../services/api";

function Agendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    api.get("/agendamentos")
      .then((response) => {
        setAgendamentos(response.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar agendamentos", error);
      });
  }, []);

  return (
    <div>
      <h1>Agendamentos</h1>
      <ul>
        {agendamentos.map((agendamento) => (
          <li key={agendamento.id}>
            {agendamento.paciente.nome} - {agendamento.data_hora}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Agendamentos;
