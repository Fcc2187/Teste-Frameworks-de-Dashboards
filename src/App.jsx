import React from 'react'; // Não esqueça do React
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext'; // <--- 1. IMPORTAR CONTEXTO

import Navbar from './components/Navbar';

// Páginas
import DashboardRecharts from './pages/DashboardRecharts';
import DashboardTremor from './pages/DashboardTremor';
import DashboardNivo from './pages/DashboardNivo';
import DashboardApex from './pages/DashboardApex';
import DashboardVictory from './pages/DashboardVictory';

// 2. Componente de Layout que consome o Tema
// Precisamos disso para que a div principal mude de cor (bg-gray-100 <-> bg-slate-900)
const LayoutContent = () => {
  const { layout } = useTheme(); 

  return (
    // Substituímos 'bg-gray-100' por layout.bg dinâmico
    <div className={`flex flex-row min-h-screen transition-colors duration-300 ${layout.bg}`}>
      
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
  );
};

function App() {
  return (
    // 3. O ThemeProvider deve abraçar TODA a aplicação
    <ThemeProvider>
      <Router>
        <LayoutContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;