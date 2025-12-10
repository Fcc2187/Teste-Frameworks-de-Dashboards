import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

const PALETTES = {
  padrao:  ['#60a5fa', '#fbbf24', '#f87171', '#34d399'],
  ocean:   ['#0ea5e9', '#6366f1', '#8b5cf6', '#d946ef'],
  forest:  ['#10b981', '#84cc16', '#eab308', '#14b8a6'],
  fire:    ['#ef4444', '#f97316', '#f59e0b', '#fbbf24'],
};

const COLORBLIND_PALETTE = ['#E69F00', '#56B4E9', '#009E73', '#F0E442', '#0072B2', '#D55E00', '#CC79A7'];

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('dark');
  const [paletteName, setPaletteName] = useState('padrao');
  const [isColorblind, setIsColorblind] = useState(false);

  const colors = isColorblind ? COLORBLIND_PALETTE : PALETTES[paletteName];

  // Variáveis auxiliares de COR (Hexadecimal) para SVGs
  const textColorHex = mode === 'dark' ? '#cbd5e1' : '#334155';
  const axisColorHex = mode === 'dark' ? '#475569' : '#cbd5e1';
  const gridColorHex = mode === 'dark' ? '#334155' : '#e2e8f0';
  const tooltipBgHex = mode === 'dark' ? '#1e293b' : '#ffffff';

  // Classes Tailwind para Layout (HTML Divs)
  const layout = {
    bg: mode === 'dark' ? 'bg-slate-900' : 'bg-gray-50',
    card: mode === 'dark' ? 'bg-slate-800 border-slate-700 shadow-lg' : 'bg-white border-gray-200 shadow-md',
    textMain: mode === 'dark' ? 'text-white' : 'text-slate-800',
    textSub: mode === 'dark' ? 'text-slate-400' : 'text-slate-500',
    textHighlight: mode === 'dark' ? 'text-yellow-400' : 'text-blue-600',
  };

  // Tema NIVO
  const nivoTheme = {
    background: "transparent",
    text: { fill: textColorHex },
    axis: {
      ticks: { text: { fill: textColorHex } },
      legend: { text: { fill: textColorHex } }
    },
    grid: { line: { stroke: gridColorHex, strokeDasharray: "4 4" } },
    tooltip: {
      container: {
        background: tooltipBgHex,
        color: mode === 'dark' ? '#fff' : '#000',
        fontSize: '12px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        border: `1px solid ${axisColorHex}`
      }
    }
  };

  // Estilos VICTORY
  const victoryStyles = {
    axis: {
      style: {
        axis: { stroke: axisColorHex },
        tickLabels: { fill: textColorHex, fontSize: 12, padding: 5 },
        grid: { stroke: gridColorHex, strokeDasharray: "4, 5" }
      }
    },
    tooltip: {
      style: { fill: mode === 'dark' ? '#fff' : '#000' },
      flyout: { fill: tooltipBgHex, stroke: axisColorHex }
    }
  };

  // Tema APEX
  const apexTheme = { mode: mode };

  return (
    <ThemeContext.Provider value={{ 
      mode, setMode, 
      paletteName, setPaletteName, 
      isColorblind, setIsColorblind,
      colors, 
      layout,
      nivoTheme,       // <--- Garanta que está aqui
      victoryStyles,   // <--- Garanta que está aqui
      apexTheme,
      textColorHex,    // <--- Exportando cor Hex para uso avulso
      availablePalettes: Object.keys(PALETTES)
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);