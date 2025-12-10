import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { useVendasData } from '../hooks/useVendasData';

const DashboardApex = () => {
  // 1. Estado para controlar o ano
  const [ano, setAno] = useState('2024');
  
  // 2. Buscando dados do ano selecionado
  const { data, loading } = useVendasData(ano);

  if (loading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-yellow-400">Carregando Apex...</div>;
  const { kpis, vendasPorCategoria, vendasMensais } = data;

  // --- Configurações dos Gráficos (Dark Theme) ---
  const commonOptions = {
    chart: { background: 'transparent', toolbar: { show: false }, animations: { enabled: true } },
    theme: { mode: 'dark' },
    grid: { borderColor: '#334155' },
    dataLabels: { enabled: false },
    tooltip: { theme: 'dark' }
  };

  const pieOptions = {
    ...commonOptions,
    labels: vendasPorCategoria.map(d => d.name),
    colors: ['#3b82f6', '#fbbf24', '#f43f5e', '#10b981'],
    legend: { position: 'bottom', labels: { colors: '#cbd5e1' } },
    stroke: { show: false } // Remove borda branca padrão
  };

  const barOptions = {
    ...commonOptions,
    xaxis: { 
      categories: vendasMensais.map(d => d.name), 
      labels: { style: { colors: '#94a3b8' } },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: { labels: { style: { colors: '#94a3b8' } } },
    colors: ['#fbbf24'],
    plotOptions: { bar: { borderRadius: 4, columnWidth: '60%' } }
  };

  const areaOptions = {
    ...commonOptions,
    chart: { ...commonOptions.chart, type: 'area', sparkline: { enabled: false } },
    xaxis: { 
      categories: vendasMensais.map(d => d.name),
      labels: { style: { colors: '#94a3b8' } },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: { labels: { style: { colors: '#94a3b8' } } },
    colors: ['#8b5cf6'],
    stroke: { curve: 'smooth', width: 3 },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.1, stops: [0, 90, 100] } }
  };

  return (
    <div className="bg-slate-900 min-h-screen p-6 text-white">
      {/* Cabeçalho Interativo */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 border-b border-slate-700 pb-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-yellow-400">DASHBOARD APEX</h1>
          <p className="text-sm text-slate-400">Análise Financeira</p>
        </div>
        
        <div className="flex items-center gap-2">
          <label className="text-slate-300 text-sm">Ano:</label>
          <select 
            value={ano}
            onChange={(e) => setAno(e.target.value)}
            className="bg-slate-800 border border-slate-600 text-white text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block p-2.5"
          >
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Coluna KPIs */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <KpiCard label="Total Faturado" value={`R$ ${kpis.totalFaturado.toLocaleString()}`} />
          <KpiCard label="Total Unidades" value={kpis.totalUnidades} />
          <KpiCard label="Ticket Médio" value={`R$ ${kpis.ticketMedio}`} />
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 mt-auto shadow-lg">
             <h3 className="text-slate-400 text-xs font-bold uppercase">DESTAQUE</h3>
             <p className="text-xl text-yellow-400 font-bold">{kpis.produtoDestaque}</p>
          </div>
        </div>

        {/* Coluna Gráficos */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-80">
            <ChartCard title="Categorias">
              <Chart options={pieOptions} series={vendasPorCategoria.map(d => d.value)} type="donut" height="100%" />
            </ChartCard>
            <ChartCard title="Faturamento Mensal">
              <Chart options={barOptions} series={[{ name: 'Faturamento', data: vendasMensais.map(d => d.faturamento) }]} type="bar" height="100%" />
            </ChartCard>
          </div>

          <ChartCard title="Tendência (Unidades)" height="h-64">
             <Chart options={areaOptions} series={[{ name: 'Unidades', data: vendasMensais.map(d => d.unidades) }]} type="area" height="100%" />
          </ChartCard>
        </div>
      </div>
    </div>
  );
};

const KpiCard = ({ label, value }) => (
  <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg transition-all hover:border-slate-500">
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

export default DashboardApex;