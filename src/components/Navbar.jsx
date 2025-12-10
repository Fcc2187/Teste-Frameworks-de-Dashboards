import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-64 min-h-screen bg-slate-900 text-white flex flex-col p-4 shadow-xl">
      <h1 className="text-2xl font-bold mb-8 text-blue-400 border-b border-gray-700 pb-4">
        Teste Frameworks <span className="text-white text-sm block font-normal">Benchmark de Gráficos</span>
      </h1>
      
      <div className="flex flex-col gap-2">
        <Link to="/" className="p-3 hover:bg-slate-700 rounded transition-colors flex items-center gap-2">
           📊 Recharts
        </Link>
        <Link to="/tremor" className="p-3 hover:bg-slate-700 rounded transition-colors flex items-center gap-2">
           ⚡ Tremor
        </Link>
        <Link to="/nivo" className="p-3 hover:bg-slate-700 rounded transition-colors flex items-center gap-2">
           🎨 Nivo
        </Link>
        <Link to="/apex" className="p-3 hover:bg-slate-700 rounded transition-colors flex items-center gap-2">
           📈 ApexCharts
        </Link>
        <Link to="/victory" className="p-3 hover:bg-slate-700 rounded transition-colors flex items-center gap-2">
           🏆 Victory
        </Link>
      </div>

      <div className="mt-auto pt-4 border-t border-gray-700 text-xs text-gray-400">
        Desenvolvido para ATI
      </div>
    </nav>
  );
};

export default Navbar;