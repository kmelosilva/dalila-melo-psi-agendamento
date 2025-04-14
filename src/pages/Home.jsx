import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div class="card">
      <div class="card-header grid text-center">
      Bem-vindo ao Sistema de Agendamentos
      </div>
      <div class="card-body grid text-center">
        <h5 class="card-title">Gerencie pacientes, agendamentos e serviços de forma simples e eficiente.</h5>
        <p class="card-text">Escolha abaixo a opção desejada</p>
        <div class="grid text-center">
          <div className="d-flex justify-content-center gap-2">
            <Link to="/pacientes" className="btn btn-primary">Pacientes</Link>
            <Link to="/agendamentos" className="btn btn-primary">Agendamentos</Link>
            <Link to="/servicos" className="btn btn-primary">Serviços</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
