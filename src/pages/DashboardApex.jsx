import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useVendasData } from '../hooks/useVendasData';
import { useTheme } from '../context/ThemeContext';
import ThemeSelector from '../components/ThemeSelector';

const DashboardApex = () => {
  const [ano, setAno] = useState('2024');
  const { data, loading } = useVendasData(ano);
  
  const { colors, mode, layout } = useTheme();

  if (loading) return <div className={`min-h-screen flex items-center justify-center ${layout.bg} ${layout.textHighlight}`}>Carregando...</div>;
  const { kpis, vendasPorCategoria, vendasMensais } = data;

  const textSubHex = mode === 'dark' ? '#94a3b8' : '#64748b'; 
  const borderColorHex = mode === 'dark' ? '#334155' : '#e2e8f0';
  const tooltipTheme = mode;

  const commonOptions = {
    chart: { background: 'transparent', toolbar: { show: false }, animations: { enabled: true } },
    theme: { mode: mode },
    grid: { borderColor: borderColorHex, strokeDashArray: 4 },
    dataLabels: { enabled: false },
    tooltip: { theme: tooltipTheme }
  };

  const donutOptions = {
    ...commonOptions,
    labels: vendasPorCategoria.map(d => d.name),
    colors: colors,
    stroke: { show: true, colors: [mode === 'dark' ? '#1e293b' : '#fff'] },
    legend: { 
      position: 'bottom', 
      labels: { colors: textSubHex } 
    },
    plotOptions: {
      pie: { donut: { labels: { show: true, total: { show: true, label: 'Total', color: mode === 'dark' ? '#fff' : '#334155' } } } }
    }
  };

  const barOptions = {
    ...commonOptions,
    colors: [colors[1] || colors[0]],
    xaxis: { 
      categories: vendasMensais.map(d => d.name), 
      labels: { style: { colors: textSubHex } },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: { labels: { style: { colors: textSubHex } } },
    plotOptions: { bar: { borderRadius: 4, columnWidth: '60%' } }
  };

  const areaOptions = {
    ...commonOptions,
    chart: { ...commonOptions.chart, type: 'area', sparkline: { enabled: false } },
    colors: [colors[2] || colors[0]], // Cor terciária da paleta
    xaxis: { 
      categories: vendasMensais.map(d => d.name),
      labels: { style: { colors: textSubHex } },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: { labels: { style: { colors: textSubHex } } },
    stroke: { curve: 'smooth', width: 3 },
    fill: { 
        type: 'gradient', 
        gradient: { 
            shadeIntensity: 1, 
            opacityFrom: 0.6, 
            opacityTo: 0.1, 
            stops: [0, 90, 100] 
        } 
    }
  };

  return (
    <div className={`min-h-screen p-6 transition-colors duration-300 ${layout.bg} ${layout.textMain}`}>
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 border-b border-gray-700/30 pb-4">
        <div>
           <h1 className={`text-2xl font-bold ${layout.textHighlight}`}>DASHBOARD APEXCHARTS</h1>
           <p className={`text-sm ${layout.textSub}`}>Análise Financeira Completa</p>
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
          <KpiCard label="Ticket Médio" value={`R$ ${kpis.ticketMedio}`} layout={layout} />
          
          <div className={`p-6 rounded-xl border mt-auto shadow-lg ${layout.card}`}>
             <h3 className={`text-xs font-bold uppercase ${layout.textSub}`}>DESTAQUE</h3>
             <p className={`text-xl font-bold mt-2 ${layout.textHighlight}`}>{kpis.produtoDestaque}</p>
          </div>
        </div>

        <div className="lg:col-span-3 flex flex-col gap-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-96">
            <ChartCard title="Categorias" layout={layout}>
               <ReactApexChart options={donutOptions} series={vendasPorCategoria.map(d => d.value)} type="donut" height="100%" />
            </ChartCard>

            <ChartCard title="Faturamento Mensal" layout={layout}>
               <ReactApexChart options={barOptions} series={[{ name: 'Faturamento', data: vendasMensais.map(d => d.faturamento) }]} type="bar" height="100%" />
            </ChartCard>
          </div>

          <ChartCard title="Tendência (Unidades)" layout={layout} height="h-80">
             <ReactApexChart options={areaOptions} series={[{ name: 'Unidades', data: vendasMensais.map(d => d.unidades) }]} type="area" height="100%" />
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
    <div className="flex-1 min-h-0 relative">
        {children}
    </div>
  </div>
);

export default DashboardApex;