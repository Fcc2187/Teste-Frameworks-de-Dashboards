import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeSelector = () => {
  const { mode, setMode, paletteName, setPaletteName, isColorblind, setIsColorblind, availablePalettes, layout } = useTheme();

  return (
    <div className={`p-4 rounded-xl mb-6 border flex flex-col md:flex-row gap-6 items-center justify-between transition-colors duration-300 ${layout.card}`}>
      
      {/* 1. Toggle Claro/Escuro */}
      <div className="flex items-center gap-3">
        <span className={`text-xs font-bold uppercase tracking-wider ${layout.textSub}`}>Tema:</span>
        <button 
          onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${mode === 'dark' ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-gray-200 text-slate-800 hover:bg-gray-300'}`}
        >
          {mode === 'dark' ? '🌙 Escuro' : '☀️ Claro'}
        </button>
      </div>

      {/* 2. Toggle Daltonismo */}
      <div className="flex items-center gap-2">
         <label className="flex items-center cursor-pointer relative">
            <input 
              type="checkbox" 
              checked={isColorblind} 
              onChange={(e) => setIsColorblind(e.target.checked)} 
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className={`ml-2 text-sm font-medium ${layout.textMain}`}>Modo Daltônico</span>
         </label>
      </div>

      {/* 3. Seletor de Paletas (Desaparece se for daltônico) */}
      {!isColorblind && (
        <div className="flex items-center gap-3">
          <span className={`text-xs font-bold uppercase tracking-wider ${layout.textSub}`}>Cores:</span>
          <div className="flex gap-2">
            {availablePalettes.map(pal => (
              <button
                key={pal}
                onClick={() => setPaletteName(pal)}
                className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${paletteName === pal ? 'border-current scale-110 ring-2 ring-offset-2 ring-blue-500' : 'border-transparent'}`}
                title={pal}
                style={{ background: pal === 'padrao' ? '#60a5fa' : pal === 'ocean' ? '#0ea5e9' : pal === 'forest' ? '#10b981' : '#ef4444' }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;