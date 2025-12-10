import React, { useState } from 'react';
import { useVendasData } from '../hooks/useVendasData';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveLine } from '@nivo/line';

const nivoTheme = {
  text: { fill: "#cbd5e1" },
  axis: { ticks: { text: { fill: "#94a3b8" } }, legend: { text: { fill: "#cbd5e1" } } },
  grid: { line: { stroke: "#334155" } },
  tooltip: { container: { background: "#1e293b", color: "#fff" } }
};

const DashboardNivo = () => {
  const [ano, setAno] = useState('2024');
  const { data, loading } = useVendasData(ano);

  if (loading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-yellow-400">Carregando Nivo...</div>;
  const { kpis, vendasPorCategoria, vendasMensais } = data;

  return (
    <div className="bg-slate-900 min-h-screen p-6 text-white">
      <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
        <h1 className="text-2xl font-bold text-yellow-400">DASHBOARD NIVO</h1>
        <select value={ano} onChange={(e) => setAno(e.target.value)} className="bg-slate-800 border border-slate-600 text-white rounded p-2">
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
        <div className="lg:col-span-1 flex flex-col gap-4">
          <KpiCard label="TOTAL FATURADO" value={`R$ ${kpis.totalFaturado.toLocaleString()}`} />
          <KpiCard label="TOTAL UNIDADES" value={kpis.totalUnidades} />
          <KpiCard label="TOTAL PEDIDOS" value={kpis.totalPedidos} />
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 mt-auto">
             <h3 className="text-slate-400 text-xs font-bold uppercase">DESTAQUE</h3>
             <p className="text-xl text-yellow-400 font-bold">{kpis.produtoDestaque}</p>
          </div>
        </div>

        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-80">
            <ChartCard title="Por Categoria">
              <ResponsivePie
                data={vendasPorCategoria.map(d => ({ id: d.name, label: d.name, value: d.value }))}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                innerRadius={0.5} padAngle={0.7} cornerRadius={3}
                colors={{ scheme: 'nivo' }} theme={nivoTheme} enableArcLinkLabels={false}
              />
            </ChartCard>

            <ChartCard title="Faturamento Mensal">
              <ResponsiveBar
                data={vendasMensais} keys={['faturamento']} indexBy="name"
                margin={{ top: 10, right: 10, bottom: 30, left: 40 }} padding={0.3}
                colors={['#fbbf24']} theme={nivoTheme} axisLeft={{ format: v => `${v/1000}k` }}
              />
            </ChartCard>
          </div>

          <ChartCard title="Tendência (Unidades)" height="h-64">
             <ResponsiveLine
                data={[{ id: "unidades", data: vendasMensais.map(d => ({ x: d.name, y: d.unidades })) }]}
                margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
                xScale={{ type: 'point' }} yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
                enableArea={true} colors={['#8b5cf6']} theme={nivoTheme}
                pointSize={8} pointColor={{ theme: 'background' }} pointBorderWidth={2} pointBorderColor={{ from: 'serieColor' }}
             />
          </ChartCard>
        </div>
      </div>
    </div>
  );
};

const KpiCard = ({ label, value }) => (
  <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
    <h3 className="text-slate-400 text-xs font-bold uppercase mb-2">{label}</h3>
    <p className="text-2xl font-bold text-white">{value}</p>
  </div>
);

const ChartCard = ({ title, children, height = "h-full" }) => (
  <div className={`bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-lg flex flex-col ${height}`}>
    <h3 className="text-slate-300 font-semibold mb-2">{title}</h3>
    <div className="flex-1 min-h-0">{children}</div>
  </div>
);

export default DashboardNivo;