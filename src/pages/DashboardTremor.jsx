import React, { useState } from 'react';
import { useVendasData } from '../hooks/useVendasData';
import { useTheme } from '../context/ThemeContext';
import ThemeSelector from '../components/ThemeSelector';
import { DonutChart, BarChart, AreaChart } from "@tremor/react";

const DashboardTremor = () => {
  const [ano, setAno] = useState('2024');
  const { data, loading } = useVendasData(ano);
  const { mode, paletteName, isColorblind, layout } = useTheme();

  if (loading) return <div className={`min-h-screen flex items-center justify-center ${layout.bg} ${layout.textHighlight}`}>Carregando...</div>;
  const { kpis, vendasPorCategoria, vendasMensais } = data;

  const getTremorColors = () => {
    if (isColorblind) return ["blue", "yellow", "orange", "cyan"];
    const mapping = {
      padrao: ["blue", "amber", "rose", "emerald"],
      ocean:  ["cyan", "blue", "indigo", "violet"],
      forest: ["emerald", "lime", "yellow", "teal"],
      fire:   ["red", "orange", "amber", "yellow"],
    };
    return mapping[paletteName] || ["blue", "cyan", "indigo", "violet"];
  };

  const tremorColors = getTremorColors();

  return (
    <div className={`min-h-screen p-6 transition-colors duration-300 ${layout.bg} ${layout.textMain} ${mode === 'dark' ? 'dark' : ''}`}>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 border-b border-gray-700/30 pb-4">
        <div>
           <h1 className={`text-2xl font-bold ${layout.textHighlight}`}>DASHBOARD TREMOR</h1>
           <p className={`text-sm ${layout.textSub}`}>Minimalismo e Performance</p>
        </div>
        <select value={ano} onChange={(e) => setAno(e.target.value)} className={`bg-transparent border border-gray-500 rounded p-2 ${layout.textSub}`}>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
        </select>
      </div>

      <ThemeSelector />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        <div className="lg:col-span-1 flex flex-col gap-4">
           <KpiCard label="Total Faturado" value={`R$ ${kpis.totalFaturado.toLocaleString()}`} layout={layout} />
           <KpiCard label="Total Unidades" value={kpis.totalUnidades} layout={layout} />
           <KpiCard label="Pedidos" value={kpis.totalPedidos} layout={layout} />
           <div className={`p-6 rounded-xl border mt-auto shadow-lg ${layout.card}`}>
              <h3 className={`text-xs font-bold uppercase ${layout.textSub}`}>DESTAQUE</h3>
              <p className={`text-xl font-bold mt-2 ${layout.textHighlight}`}>{kpis.produtoDestaque}</p>
           </div>
        </div>

        <div className="lg:col-span-3 flex flex-col gap-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-96">
            <ChartCard title="Categorias" layout={layout}>
              <div className="flex items-center justify-center h-full">
                <DonutChart
                  data={vendasPorCategoria}
                  category="value"
                  index="name"
                  colors={tremorColors}
                  variant="donut"
                  className="h-60"
                />
              </div>
            </ChartCard>

            <ChartCard title="Faturamento Mensal" layout={layout}>
              <BarChart
                className="mt-4 h-64"
                data={vendasMensais}
                index="name"
                categories={["faturamento"]}
                colors={[tremorColors[1]]}
                yAxisWidth={48}
                showAnimation={true}
              />
            </ChartCard>
          </div>

          <ChartCard title="Tendência (Unidades)" layout={layout} height="h-80">
             <AreaChart
                className="h-64 mt-4"
                data={vendasMensais}
                index="name"
                categories={["unidades"]}
                colors={[tremorColors[2] || tremorColors[0]]}
                yAxisWidth={40}
                showAnimation={true}
             />
          </ChartCard>
        </div>
      </div>
    </div>
  );
};

const KpiCard = ({ label, value, layout }) => (
  <div className={`p-6 rounded-xl border shadow-lg transition-transform hover:scale-105 ${layout.card}`}>
    <h3 className={`text-xs font-bold uppercase mb-2 ${layout.textSub}`}>{label}</h3>
    <p className={`text-2xl font-bold ${layout.textMain}`}>{value}</p>
  </div>
);

const ChartCard = ({ title, children, layout, height = "h-full" }) => (
  <div className={`p-4 rounded-xl border shadow-lg flex flex-col ${height} ${layout.card}`}>
    <h3 className={`font-semibold mb-4 ml-2 border-l-4 pl-2 ${layout.textHighlight.replace('text-', 'border-')}`}>{title}</h3>
    <div className="flex-1 min-h-0 relative w-full">{children}</div>
  </div>
);

export default DashboardTremor;