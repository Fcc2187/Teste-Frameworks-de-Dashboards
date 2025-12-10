import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// Importando as páginas (vamos criar o conteúdo delas no próximo passo)
import DashboardRecharts from './pages/DashboardRecharts';
import DashboardTremor from './pages/DashboardTremor';
import DashboardNivo from './pages/DashboardNivo';
import DashboardApex from './pages/DashboardApex';
import DashboardVictory from './pages/DashboardVictory';

function App() {
  return (
    <Router>
      <div className="flex flex-row min-h-screen bg-gray-100">
        {/* Menu Lateral */}
        <Navbar />

        {/* Área de Conteúdo */}
        <main className="flex-1 p-8 overflow-auto">
          <Routes>
            <Route path="/" element={<DashboardRecharts />} />
            <Route path="/tremor" element={<DashboardTremor />} />
            <Route path="/nivo" element={<DashboardNivo />} />
            <Route path="/apex" element={<DashboardApex />} />
            <Route path="/victory" element={<DashboardVictory />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;