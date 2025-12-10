import { useState, useEffect } from 'react';

// BANCO DE DADOS MOCKADO (3 Anos de Histórico)
const DB_VENDAS = {
  '2023': {
    kpis: { totalFaturado: 8450.00, totalUnidades: 210, totalPedidos: 45, ticketMedio: 187.70, produtoDestaque: "Amendoim" },
    vendasPorCategoria: [
      { name: 'Coenzima Q10', value: 100 }, { name: 'Leite Pó', value: 200 },
      { name: 'Chocolate', value: 150 }, { name: 'Amendoim', value: 300 },
    ],
    vendasMensais: [
      { name: 'Jan', faturamento: 800, unidades: 20 }, { name: 'Fev', faturamento: 950, unidades: 25 },
      { name: 'Mar', faturamento: 1100, unidades: 30 }, { name: 'Abr', faturamento: 800, unidades: 22 },
      { name: 'Mai', faturamento: 1200, unidades: 35 }, { name: 'Jun', faturamento: 1500, unidades: 40 },
      { name: 'Jul', faturamento: 1300, unidades: 38 }, { name: 'Ago', faturamento: 1400, unidades: 42 },
      { name: 'Set', faturamento: 1600, unidades: 45 }, { name: 'Out', faturamento: 1800, unidades: 50 },
      { name: 'Nov', faturamento: 2100, unidades: 60 }, { name: 'Dez', faturamento: 2500, unidades: 70 },
    ]
  },
  '2024': {
    kpis: { totalFaturado: 14533.90, totalUnidades: 402, totalPedidos: 71, ticketMedio: 204.70, produtoDestaque: "Coenzima Q10" },
    vendasPorCategoria: [
      { name: 'Coenzima Q10', value: 400 }, { name: 'Leite Pó', value: 300 },
      { name: 'Chocolate', value: 300 }, { name: 'Amendoim', value: 200 },
    ],
    vendasMensais: [
      { name: 'Jan', faturamento: 1785, unidades: 75 }, { name: 'Fev', faturamento: 3139, unidades: 84 },
      { name: 'Mar', faturamento: 2621, unidades: 72 }, { name: 'Abr', faturamento: 4346, unidades: 106 },
      { name: 'Mai', faturamento: 2642, unidades: 65 }, { name: 'Jun', faturamento: 3200, unidades: 90 },
      { name: 'Jul', faturamento: 3400, unidades: 95 }, { name: 'Ago', faturamento: 3100, unidades: 88 },
      { name: 'Set', faturamento: 3800, unidades: 100 }, { name: 'Out', faturamento: 4100, unidades: 110 },
      { name: 'Nov', faturamento: 4500, unidades: 120 }, { name: 'Dez', faturamento: 5200, unidades: 140 },
    ]
  },
  '2025': {
    kpis: { totalFaturado: 22100.50, totalUnidades: 890, totalPedidos: 150, ticketMedio: 215.00, produtoDestaque: "Whey Protein" },
    vendasPorCategoria: [
      { name: 'Coenzima Q10', value: 500 }, { name: 'Leite Pó', value: 400 },
      { name: 'Whey Protein', value: 800 }, { name: 'Creatina', value: 600 },
    ],
    vendasMensais: [
      { name: 'Jan', faturamento: 5000, unidades: 150 }, { name: 'Fev', faturamento: 5500, unidades: 160 },
      { name: 'Mar', faturamento: 6000, unidades: 170 }, { name: 'Abr', faturamento: 6200, unidades: 180 },
      { name: 'Mai', faturamento: 5800, unidades: 165 }, { name: 'Jun', faturamento: 6500, unidades: 190 },
      // Futuro projetado (estamos em 2025)
      { name: 'Jul', faturamento: 7000, unidades: 200 }, { name: 'Ago', faturamento: 7200, unidades: 210 },
      { name: 'Set', faturamento: 7500, unidades: 220 }, { name: 'Out', faturamento: 8000, unidades: 230 },
      { name: 'Nov', faturamento: 9000, unidades: 250 }, { name: 'Dez', faturamento: 10000, unidades: 300 },
    ]
  }
};

export const useVendasData = (anoSelecionado = '2024') => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando delay de rede rápido (300ms) para dar sensação de "carregando"
    const timer = setTimeout(() => {
      setData(DB_VENDAS[anoSelecionado]);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [anoSelecionado]); // Toda vez que o ano mudar, isso roda de novo

  return { data, loading };
};