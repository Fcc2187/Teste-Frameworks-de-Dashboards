import React, { useState } from 'react';
import { useVendasData } from '../hooks/useVendasData';
import { useTheme } from '../context/ThemeContext';
import ThemeSelector from '../components/ThemeSelector';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';

const DashboardRecharts = () => {
  const [ano, setAno] = useState('2024');
  const { data, loading } = useVendasData(ano);
  const { colors, layout, mode } = useTheme();

  if (loading) return <div className={`min-h-screen flex items-center justify-center ${layout.bg} ${layout.textHighlight}`}>Carregando...</div>;
  const { kpis, vendasPorCategoria, vendasMensais } = data;

  return (
    <div className={`min-h-screen p-6 transition-colors duration-300 ${layout.bg} ${layout.textMain}`}>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 border-b border-gray-700/30 pb-4">
        <div>
           <h1 className={`text-2xl font-bold ${layout.textHighlight}`}>DASHBOARD RECHARTS</h1>
           <p className={`text-sm ${layout.textSub}`}>Visão Geral de Vendas</p>
        </div>
        <select value={ano} onChange={(e) => setAno(e.target.value)} className={`bg-transparent border border-gray-500 rounded p-2 ${layout.textSub}`}>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
        </select>
      </div>

      <ThemeSelector />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
         
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
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={vendasPorCategoria} dataKey="value" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5}>
                          {vendasPorCategoria.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} stroke={mode === 'dark' ? '#1e293b' : '#fff'} strokeWidth={2} />
                          ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ backgroundColor: layout.tooltipBg, borderColor: layout.gridStroke, color: layout.tooltipColor, borderRadius: '8px' }} 
                            itemStyle={{ color: layout.tooltipColor }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Faturamento Mensal" layout={layout}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={vendasMensais}>
                        <CartesianGrid strokeDasharray="3 3" stroke={layout.gridStroke} vertical={false} />
                        <XAxis dataKey="name" stroke={layout.textSub.includes('slate-400') ? '#94a3b8' : '#64748b'} tick={{fontSize: 12}} />
                        <Tooltip cursor={{fill: layout.gridStroke, opacity: 0.2}} contentStyle={{ backgroundColor: layout.tooltipBg, borderColor: layout.gridStroke, color: layout.tooltipColor, borderRadius: '8px' }} />
                        <Bar dataKey="faturamento" fill={colors[1] || colors[0]} radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>

            <ChartCard title="Tendência (Unidades)" layout={layout} height="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={vendasMensais}>
                    <defs>
                      <linearGradient id="colorUnidades" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={colors[2] || colors[0]} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={colors[2] || colors[0]} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={layout.gridStroke} vertical={false} />
                    <XAxis dataKey="name" stroke={layout.textSub.includes('slate-400') ? '#94a3b8' : '#64748b'} />
                    <YAxis stroke={layout.textSub.includes('slate-400') ? '#94a3b8' : '#64748b'} />
                    <Tooltip contentStyle={{ backgroundColor: layout.tooltipBg, borderColor: layout.gridStroke, color: layout.tooltipColor, borderRadius: '8px' }} />
                    <Area type="monotone" dataKey="unidades" stroke={colors[2] || colors[0]} fillOpacity={1} fill="url(#colorUnidades)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
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

export default DashboardRecharts;