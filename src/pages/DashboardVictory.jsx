import React, { useState } from 'react';
import { useVendasData } from '../hooks/useVendasData';
import { 
  VictoryBar, VictoryChart, VictoryAxis, VictoryPie, VictoryArea, 
  VictoryTooltip, VictoryContainer, VictoryLabel 
} from 'victory';

const DashboardVictory = () => {
  const [ano, setAno] = useState('2024');
  const { data, loading } = useVendasData(ano);

  if (loading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-yellow-400">Carregando Victory...</div>;
  const { kpis, vendasPorCategoria, vendasMensais } = data;

  // Estilo Dark customizado para os eixos
  const axisStyle = {
    axis: { stroke: "#475569" }, // slate-600
    tickLabels: { fill: "#94a3b8", fontSize: 10, padding: 5 }, // slate-400
    grid: { stroke: "#334155", strokeDasharray: "4, 5" } // slate-700 tracejado
  };

  return (
    <div className="bg-slate-900 min-h-screen p-6 text-white">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 border-b border-slate-700 pb-4 gap-4">
        <div>
           <h1 className="text-2xl font-bold text-yellow-400">DASHBOARD VICTORY</h1>
           <p className="text-sm text-slate-400">Dados Corporativos</p>
        </div>
        <select 
            value={ano}
            onChange={(e) => setAno(e.target.value)}
            className="bg-slate-800 border border-slate-600 text-white text-sm rounded-lg p-2.5"
          >
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* KPIs */}
        <div className="lg:col-span-1 flex flex-col gap-4">
           <KpiCard label="Total Faturado" value={`R$ ${kpis.totalFaturado.toLocaleString()}`} />
           <KpiCard label="Total Unidades" value={kpis.totalUnidades} />
           <KpiCard label="Pedidos" value={kpis.totalPedidos} />
           <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 mt-auto">
             <h3 className="text-slate-400 text-xs font-bold uppercase">DESTAQUE</h3>
             <p className="text-xl text-yellow-400 font-bold">{kpis.produtoDestaque}</p>
          </div>
        </div>

        {/* Gráficos */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-80">
            {/* Pizza */}
            <ChartCard title="Por Categoria">
               <VictoryPie
                 data={vendasPorCategoria}
                 x="name" y="value"
                 colorScale={['#3b82f6', '#fbbf24', '#f43f5e', '#10b981']}
                 innerRadius={70}
                 padAngle={2}
                 animate={{ duration: 500 }} // Animação na troca de ano
                 style={{ labels: { fill: "#cbd5e1", fontSize: 12 } }}
                 containerComponent={<VictoryContainer responsive={true}/>}
               />
            </ChartCard>

            {/* Barras */}
            <ChartCard title="Faturamento Mensal">
               <VictoryChart domainPadding={20} containerComponent={<VictoryContainer responsive={true}/>}>
                  <VictoryAxis style={axisStyle} />
                  <VictoryAxis dependentAxis style={axisStyle} tickFormat={(x) => `${x/1000}k`} />
                  <VictoryBar
                    data={vendasMensais}
                    x="name" y="faturamento"
                    animate={{ duration: 500, onLoad: { duration: 500 } }} // Animação
                    style={{ data: { fill: "#fbbf24", width: 20 } }}
                    labels={({ datum }) => `R$ ${datum.faturamento}`}
                    labelComponent={<VictoryTooltip style={{ fill: "#000" }} flyoutStyle={{ fill: "white" }} />}
                  />
               </VictoryChart>
            </ChartCard>
          </div>

          {/* Área */}
          <ChartCard title="Tendência (Unidades)" height="h-64">
             <VictoryChart containerComponent={<VictoryContainer responsive={true}/>}>
                <VictoryAxis style={axisStyle} />
                <VictoryAxis dependentAxis style={axisStyle} />
                <VictoryArea
                  data={vendasMensais}
                  x="name" y="unidades"
                  animate={{ duration: 1000, onLoad: { duration: 500 } }} // Animação mais lenta na área
                  style={{ data: { fill: "#8b5cf6", fillOpacity: 0.6, stroke: "#8b5cf6", strokeWidth: 3 } }}
                />
             </VictoryChart>
          </ChartCard>
        </div>
      </div>
    </div>
  );
};

const KpiCard = ({ label, value }) => (
  <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
    <h3 className="text-slate-400 text-xs font-bold uppercase mb-2">{label}</h3>
    <p className="text-xl font-bold text-white">{value}</p>
  </div>
);

const ChartCard = ({ title, children, height = "h-full" }) => (
  <div className={`bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col ${height}`}>
    <h3 className="text-slate-300 font-semibold mb-2">{title}</h3>
    <div className="flex-1 min-h-0">{children}</div>
  </div>
);

export default DashboardVictory;