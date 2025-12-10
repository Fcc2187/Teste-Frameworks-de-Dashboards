import React, { useState } from 'react';
import { useVendasData } from '../hooks/useVendasData';
import { useTheme } from '../context/ThemeContext';
import ThemeSelector from '../components/ThemeSelector'; 
import { 
  VictoryBar, VictoryChart, VictoryAxis, VictoryPie, VictoryArea,
  VictoryTooltip, VictoryContainer, VictoryLabel
} from 'victory';

const DashboardVictory = () => {
  const [ano, setAno] = useState('2024');
  const { data, loading } = useVendasData(ano);
  const { colors, layout, victoryStyles, textColorHex } = useTheme();

  if (loading || !victoryStyles) return (
    <div className={`min-h-screen flex items-center justify-center ${layout.bg} ${layout.textHighlight}`}>
      Carregando...
    </div>
  );

  const { kpis, vendasPorCategoria, vendasMensais } = data;

  return (
    <div className={`min-h-screen p-6 transition-colors duration-300 ${layout.bg} ${layout.textMain}`}>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 border-b border-gray-700/30 pb-4">
        <div>
           <h1 className={`text-2xl font-bold ${layout.textHighlight}`}>DASHBOARD VICTORY</h1>
           <p className={`text-sm ${layout.textSub}`}>Dados Corporativos</p>
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
            
            <div className={`p-6 rounded-xl border mt-4 lg:mt-auto shadow-lg ${layout.card}`}>
               <h3 className={`text-xs font-bold uppercase ${layout.textSub}`}>DESTAQUE</h3>
               <p className={`text-xl font-bold mt-2 ${layout.textHighlight}`}>{kpis.produtoDestaque}</p>
            </div>
         </div>

         <div className="lg:col-span-3 flex flex-col gap-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <ChartCard title="Categorias" layout={layout} height="h-80">
                   <div className="h-full flex items-center justify-center">
                       <VictoryPie
                         data={vendasPorCategoria}
                         x="name" y="value"
                         colorScale={colors} 
                         width={400} height={400} 
                         innerRadius={110}
                         labelRadius={140}
                         padAngle={2}
                         style={{ 
                             labels: { fill: textColorHex, fontSize: 14, fontWeight: 'bold' },
                             data: { stroke: layout.bg.includes('slate') ? '#0f172a' : '#fff', strokeWidth: 2 }
                         }}
                         containerComponent={<VictoryContainer responsive={true} />}
                       />
                   </div>
                </ChartCard>

                <ChartCard title="Faturamento Mensal" layout={layout} height="h-80">
                   <VictoryChart 
                      domainPadding={{ x: 20 }} 
                      padding={{ top: 20, bottom: 40, left: 60, right: 20 }}
                      containerComponent={<VictoryContainer responsive={true} />}
                   >
                      <VictoryAxis 
                        style={victoryStyles.axis.style} 
                        tickFormat={(t) => t.substring(0,3)} // Abrevia meses (Jan, Fev)
                      />
                      <VictoryAxis 
                        dependentAxis 
                        style={victoryStyles.axis.style} 
                        tickFormat={(x) => `${x/1000}k`} 
                      />
                      <VictoryBar
                        data={vendasMensais}
                        x="name" y="faturamento"
                        cornerRadius={{ top: 4 }}
                        style={{ data: { fill: colors[1] || '#3b82f6', width: 20 } }} 
                        labels={({ datum }) => `R$ ${datum.faturamento}`}
                        labelComponent={
                            <VictoryTooltip 
                                style={{ ...victoryStyles.tooltip.style, fontSize: 10 }} 
                                flyoutStyle={victoryStyles.tooltip.flyout}
                            />
                        }
                      />
                   </VictoryChart>
                </ChartCard>
            </div>

            <ChartCard title="Tendência (Unidades)" layout={layout} height="h-72">
                <VictoryChart 
                    width={800} height={250}
                    padding={{ top: 10, bottom: 30, left: 50, right: 30 }}
                    containerComponent={<VictoryContainer responsive={true} />}
                >
                    <defs>
                      <linearGradient id="gradientArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={colors[2] || '#10b981'} stopOpacity={0.4}/>
                        <stop offset="100%" stopColor={colors[2] || '#10b981'} stopOpacity={0.0}/>
                      </linearGradient>
                    </defs>

                    <VictoryAxis style={victoryStyles.axis.style} tickFormat={(t) => t.substring(0,3)} />
                    <VictoryAxis dependentAxis style={victoryStyles.axis.style} />
                    
                    <VictoryArea
                        data={vendasMensais}
                        x="name" y="unidades"
                        interpolation="catmullRom" // Curva mais suave que natural
                        style={{ 
                            data: { 
                                fill: "url(#gradientArea)", 
                                stroke: colors[2] || '#10b981', 
                                strokeWidth: 3 
                            } 
                        }}
                    />
                </VictoryChart>
            </ChartCard>
         </div>
      </div>
    </div>
  );
};

const KpiCard = ({ label, value, layout }) => (
  <div className={`p-5 rounded-xl border shadow-md hover:shadow-lg transition-all ${layout.card}`}>
    <h3 className={`text-xs font-bold uppercase mb-1 tracking-wider ${layout.textSub}`}>{label}</h3>
    <p className={`text-2xl font-bold ${layout.textMain}`}>{value}</p>
  </div>
);

const ChartCard = ({ title, children, layout, height = "h-96" }) => (
  <div className={`p-4 rounded-xl border shadow-md flex flex-col ${height} ${layout.card} relative overflow-hidden`}>
    <div className="flex justify-between items-center mb-2 pl-2 border-l-4" style={{ borderColor: layout.textHighlight.includes('text-') ? 'currentColor' : '#3b82f6' }}>
        <h3 className={`font-semibold ${layout.textMain}`}>{title}</h3>
    </div>
    <div className="flex-1 w-full min-h-0 relative">
        {children}
    </div>
  </div>
);

export default DashboardVictory;