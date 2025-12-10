import React, { useState } from 'react'; // Importar useState
import { useVendasData } from '../hooks/useVendasData';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

const COLORS = ['#60a5fa', '#fbbf24', '#f87171', '#34d399'];

const DashboardRecharts = () => {
  const [ano, setAno] = useState('2024');
  const { data, loading } = useVendasData(ano);
  if (loading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-yellow-400">Carregando dados de {ano}...</div>;

  const { kpis, vendasPorCategoria, vendasMensais } = data;

  return (
    <div className="bg-slate-900 min-h-screen p-6 text-white">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 border-b border-slate-700 pb-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-yellow-400">DASHBOARD RECHARTS</h1>
          <p className="text-sm text-slate-400">Visão Geral de Vendas</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-slate-300 text-sm">Ano de Referência:</label>
          <select
            value={ano}
            onChange={(e) => setAno(e.target.value)}
            className="bg-slate-800 border border-slate-600 text-white text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block p-2.5"
          >
            <option value="2023">2023 (Histórico)</option>
            <option value="2024">2024 (Consolidado)</option>
            <option value="2025">2025 (Projeção)</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">

        <div className="lg:col-span-1 flex flex-col gap-4">
          <KpiCard label="TOTAL FATURADO" value={`R$ ${kpis.totalFaturado.toLocaleString()}`} />
          <KpiCard label="TOTAL UNIDADES" value={kpis.totalUnidades} />
          <KpiCard label="TOTAL PEDIDOS" value={kpis.totalPedidos} />
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg mt-auto">
            <h3 className="text-slate-400 text-sm mb-1">PRODUTO DESTAQUE</h3>
            <p className="text-2xl font-bold text-yellow-400">{kpis.produtoDestaque}</p>
          </div>
        </div>

        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-80">
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-lg flex flex-col">
              <h3 className="text-slate-300 font-semibold mb-2">Vendas por Categoria</h3>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={vendasPorCategoria}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {vendasPorCategoria.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    {/* ADICIONEI O itemStyle ABAIXO */}
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                      itemStyle={{ color: '#f1f5f9' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-lg flex flex-col">
              <h3 className="text-slate-300 font-semibold mb-2">Faturamento Mensal</h3>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={vendasMensais}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <Tooltip cursor={{ fill: '#334155', opacity: 0.4 }} contentStyle={{ backgroundColor: '#1e293b', border: 'none', color: '#fff' }} />
                    <Bar dataKey="faturamento" fill="#fbbf24" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-lg h-64 flex flex-col">
            <h3 className="text-slate-300 font-semibold mb-2">Tendência Anual</h3>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={vendasMensais}>
                  <defs>
                    <linearGradient id="colorUnidades" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} />
                  <Area type="monotone" dataKey="unidades" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorUnidades)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const KpiCard = ({ label, value }) => (
  <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
    <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">{label}</h3>
    <p className="text-2xl font-bold text-white">{value}</p>
  </div>
);

export default DashboardRecharts;