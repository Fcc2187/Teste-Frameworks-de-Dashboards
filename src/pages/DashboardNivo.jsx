import React, { useState } from 'react';
import { useVendasData } from '../hooks/useVendasData';
import { useTheme } from '../context/ThemeContext'; 
import ThemeSelector from '../components/ThemeSelector';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveLine } from '@nivo/line';

const DashboardNivo = () => {
  const [ano, setAno] = useState('2024');
  const { data, loading } = useVendasData(ano);
  const { colors, nivoTheme, layout } = useTheme();

  if (loading || !nivoTheme) return <div className={`min-h-screen flex items-center justify-center ${layout.bg} ${layout.textHighlight}`}>Carregando...</div>;
  const { kpis, vendasPorCategoria, vendasMensais } = data;

  return (
    <div className={`min-h-screen p-6 transition-colors duration-300 ${layout.bg} ${layout.textMain}`}>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 border-b border-gray-700/30 pb-4">
        <div>
           <h1 className={`text-2xl font-bold ${layout.textHighlight}`}>DASHBOARD NIVO</h1>
           <p className={`text-sm ${layout.textSub}`}>Análise Visual Avançada</p>
        </div>
        <select value={ano} onChange={(e) => setAno(e.target.value)} className={`bg-transparent border border-gray-500 rounded p-2 ${layout.textSub}`}>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
        </select>
      </div>

      <ThemeSelector />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* COLUNA 1: KPIs */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <KpiCard label="Total Faturado" value={`R$ ${kpis.totalFaturado.toLocaleString()}`} layout={layout} />
          <KpiCard label="Total Unidades" value={kpis.totalUnidades} layout={layout} />
          <KpiCard label="Total Pedidos" value={kpis.totalPedidos} layout={layout} />
          <div className={`p-6 rounded-xl border mt-auto shadow-lg ${layout.card}`}>
             <h3 className={`text-xs font-bold uppercase ${layout.textSub}`}>DESTAQUE</h3>
             <p className={`text-xl font-bold mt-2 ${layout.textHighlight}`}>{kpis.produtoDestaque}</p>
          </div>
        </div>

        {/* COLUNA 2: GRÁFICOS */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-96">
            
            <ChartCard title="Categorias" layout={layout}>
              <ResponsivePie
                data={vendasPorCategoria.map(d => ({ id: d.name, label: d.name, value: d.value }))}
                margin={{ top: 30, right: 80, bottom: 30, left: 80 }}
                innerRadius={0.6}
                padAngle={2}
                cornerRadius={4}
                activeOuterRadiusOffset={8}
                colors={colors} 
                theme={nivoTheme} 
                arcLinkLabelsTextColor={nivoTheme?.text?.fill}
              />
            </ChartCard>

            <ChartCard title="Faturamento Mensal" layout={layout}>
              <ResponsiveBar
                data={vendasMensais}
                keys={['faturamento']}
                indexBy="name"
                margin={{ top: 20, right: 20, bottom: 40, left: 60 }}
                padding={0.3}
                colors={[colors[1] || colors[0]]} 
                theme={nivoTheme}
                borderRadius={4}
                enableGridX={false}
                axisLeft={{ format: v => `${v/1000}k` }}
                labelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
              />
            </ChartCard>
          </div>

          <ChartCard title="Tendência (Unidades)" layout={layout} height="h-80">
             <ResponsiveLine
                data={[{ id: "unidades", data: vendasMensais.map(d => ({ x: d.name, y: d.unidades })) }]}
                margin={{ top: 20, right: 30, bottom: 40, left: 50 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                curve="monotoneX"
                colors={[colors[2] || colors[0]]}
                theme={nivoTheme}
                lineWidth={3}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                enableArea={true}
                areaOpacity={0.3}
                useMesh={true}
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
    <div className="flex-1 min-h-0 relative">{children}</div>
  </div>
);

export default DashboardNivo;