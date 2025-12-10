import React, { useState } from 'react';
import { useVendasData } from '../hooks/useVendasData';
import { Card, Grid, Title, Text, Metric, DonutChart, BarChart, AreaChart } from "@tremor/react";

const DashboardTremor = () => {
  const [ano, setAno] = useState('2024');
  const { data, loading } = useVendasData(ano);

  if (loading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-yellow-400">Carregando Tremor...</div>;
  const { kpis, vendasPorCategoria, vendasMensais } = data;

  const dataFormatter = (number) => `R$ ${Intl.NumberFormat("pt-BR").format(number).toString()}`;

  return (
    <div className="bg-slate-900 min-h-screen p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 border-b border-slate-700 pb-4 gap-4">
        <Title className="text-yellow-400">DASHBOARD TREMOR</Title>
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
      
      <Grid numItems={1} numItemsLg={4} className="gap-6 h-full">
        <div className="flex flex-col gap-4">
          <Card className="bg-slate-800 ring-0 border border-slate-700">
            <Text className="text-slate-400">Total Faturado</Text>
            <Metric className="text-white">{dataFormatter(kpis.totalFaturado)}</Metric>
          </Card>
          <Card className="bg-slate-800 ring-0 border border-slate-700">
            <Text className="text-slate-400">Total Unidades</Text>
            <Metric className="text-white">{kpis.totalUnidades}</Metric>
          </Card>
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 mt-auto">
            <Text className="text-slate-400">Produto Destaque</Text>
            <Metric className="text-yellow-400">{kpis.produtoDestaque}</Metric>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-3 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-80">
            <Card className="bg-slate-800 ring-0 border border-slate-700 flex flex-col">
              <Title className="text-white">Por Categoria</Title>
              <DonutChart
                className="mt-4 flex-1"
                data={vendasPorCategoria}
                category="value"
                index="name"
                colors={["blue", "amber", "rose", "emerald"]}
                variant="pie"
              />
            </Card>
            <Card className="bg-slate-800 ring-0 border border-slate-700 flex flex-col">
              <Title className="text-white">Faturamento Mensal</Title>
              <BarChart
                className="mt-4 flex-1"
                data={vendasMensais}
                index="name"
                categories={["faturamento"]}
                colors={["amber"]}
                valueFormatter={dataFormatter}
                showLegend={false}
              />
            </Card>
          </div>

          <Card className="bg-slate-800 ring-0 border border-slate-700 h-64 flex flex-col">
            <Title className="text-white">Tendência (Unidades)</Title>
            <AreaChart
              className="mt-4 flex-1"
              data={vendasMensais}
              index="name"
              categories={["unidades"]}
              colors={["violet"]}
              showLegend={false}
            />
          </Card>
        </div>
      </Grid>
    </div>
  );
};

export default DashboardTremor;