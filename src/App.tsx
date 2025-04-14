import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Agendamentos from './pages/Agendamentos';
import Pacientes from './pages/Pacientes';
import Servicos from './pages/Servicos';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pacientes" element={<Pacientes />} />
          <Route path="/agendamentos" element={<Agendamentos />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="*" element={<h1>Página não encontrada</h1>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
