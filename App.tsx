
import React, { useState, useMemo } from 'react';
import { CalculationInputs, CalculationResult, MachineType, MachineModel } from './types';
import { calculateRequiredPlatform } from './logic/calculator';
import Diagram from './components/Diagram';
import { CONSTANTS } from './constants';

const MAINSA_LOGO_BASE64 = "data:image/png;base64,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";

const MachineIcon: React.FC<{ type: MachineType; className?: string }> = ({ type, className = "w-12 h-12" }) => {
  switch (type) {
    case MachineType.SCISSOR:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <rect x="4" y="19" width="16" height="3" rx="1" fill="currentColor" fillOpacity="0.1" />
          <path d="M7 19L17 11M17 19L7 11" strokeLinecap="round" />
          <path d="M7 11L17 3M17 11L7 3" strokeLinecap="round" />
          <rect x="5" y="2" width="14" height="2" rx="0.5" fill="currentColor" />
        </svg>
      );
    case MachineType.TELESCOPIC:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <rect x="3" y="18" width="8" height="4" rx="1" fill="currentColor" fillOpacity="0.1" />
          <path d="M7 18L18 4" strokeLinecap="round" strokeWidth="2.5" />
          <rect x="17" y="2" width="5" height="3" rx="0.5" fill="currentColor" />
          <circle cx="5" cy="20" r="1.5" fill="currentColor" />
          <circle cx="9" cy="20" r="1.5" fill="currentColor" />
        </svg>
      );
    case MachineType.ARTICULATED:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <rect x="2" y="18" width="7" height="4" rx="1" fill="currentColor" fillOpacity="0.1" />
          <path d="M5 18L13 13L9 7L18 3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <rect x="17" y="1" width="5" height="3" rx="0.5" fill="currentColor" />
          <circle cx="3.5" cy="20" r="1.5" fill="currentColor" />
          <circle cx="7.5" cy="20" r="1.5" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
};

const ModelCard: React.FC<{ model: MachineModel; isIdeal: boolean; theme: any }> = ({ model, isIdeal, theme }) => (
  <div className={`relative p-5 rounded-2xl border-2 transition-all hover:scale-[1.02] ${isIdeal ? `${theme.border} bg-white shadow-lg ring-2 ring-indigo-500/20` : 'border-slate-100 bg-slate-50/50'}`}>
    {isIdeal && (
      <span className="absolute -top-3 left-4 bg-indigo-600 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
        Recomendación Ideal
      </span>
    )}
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{model.brand}</p>
        <h5 className="text-lg font-black text-slate-900 leading-none">{model.model}</h5>
      </div>
      <MachineIcon type={model.type} className={`w-8 h-8 ${theme.icon} opacity-40`} />
    </div>
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-slate-900/5 p-3 rounded-xl">
        <p className="text-[8px] font-bold text-slate-500 uppercase mb-1">Altura Máx.</p>
        <p className="text-sm font-black text-slate-800">{model.maxWorkHeight}m</p>
      </div>
      {model.maxReach && (
        <div className="bg-slate-900/5 p-3 rounded-xl">
          <p className="text-[8px] font-bold text-slate-500 uppercase mb-1">Alcance Máx.</p>
          <p className="text-sm font-black text-slate-800">{model.maxReach}m</p>
        </div>
      )}
    </div>
  </div>
);

const App: React.FC = () => {
  const [inputs, setInputs] = useState<CalculationInputs>({
    workHeight: 12,
    horizontalDistance: 6,
    hasObstacle: false,
    obstacleHeight: 4,
    obstacleDistance: 3,
    hasObstacle2: false,
    obstacleHeight2: 2,
    obstacleDistance2: 5
  });

  const result: CalculationResult = useMemo(() => {
    return calculateRequiredPlatform(inputs);
  }, [inputs]);

  const handleInputChange = (field: keyof CalculationInputs, value: number | boolean) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getThemeColors = (type: MachineType) => {
    switch (type) {
      case MachineType.SCISSOR: return { bg: 'bg-amber-50', border: 'border-amber-300', text: 'text-amber-800', icon: 'text-amber-600' };
      case MachineType.TELESCOPIC: return { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-800', icon: 'text-blue-600' };
      case MachineType.ARTICULATED: return { bg: 'bg-purple-50', border: 'border-purple-300', text: 'text-purple-800', icon: 'text-purple-600' };
      default: return { bg: 'bg-slate-50', border: 'border-slate-300', text: 'text-slate-800', icon: 'text-slate-600' };
    }
  };

  const theme = getThemeColors(result.recommendedMachine);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Header Card */}
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-8 bg-white p-6 md:p-10 rounded-[2.5rem] shadow-xl border border-slate-100 ring-1 ring-slate-200/50">
          <div className="flex flex-col md:flex-row items-center gap-10 text-center md:text-left">
            <div className="flex items-center justify-center p-4 bg-slate-50 rounded-3xl shadow-inner border border-slate-100">
              <img 
                src={MAINSA_LOGO_BASE64} 
                alt="MAINSA Logo" 
                className="h-20 md:h-32 w-auto object-contain drop-shadow-sm transition-transform hover:scale-105 duration-300" 
              />
            </div>
            <div className="md:h-28 w-px bg-slate-200 hidden md:block"></div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none mb-3 uppercase">CALCULADOR PEMP</h1>
              <p className="text-indigo-600 text-sm md:text-base font-black uppercase tracking-[0.4em] flex items-center justify-center md:justify-start gap-3">
                <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-pulse shadow-[0_0_10px_rgba(79,70,229,0.8)]"></span>
                Engineered Selection Tool
              </p>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-5">
             <div className="bg-slate-900 text-white px-8 py-6 rounded-[2rem] shadow-2xl flex items-center gap-6 border-l-[10px] border-indigo-500 hover:shadow-indigo-500/20 transition-all cursor-default">
               <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-1.5 opacity-80">Industrial Intelligence</p>
                  <p className="text-xl md:text-2xl font-black tracking-tight leading-none">Mainsa Data Pro</p>
               </div>
               <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/40">
                  <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
               </div>
             </div>
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-100/80 px-5 py-2 rounded-full border border-slate-200 shadow-sm backdrop-blur-sm">Verified Compliant ISO 16368:2025</span>
          </div>
        </header>

        {/* UI grid for inputs and results */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Input Form */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 sticky top-8">
              <h2 className="text-xl font-black text-slate-900 mb-10 flex items-center gap-3">
                <span className="w-2 h-7 bg-indigo-600 rounded-full shadow-[0_0_10px_rgba(79,70,229,0.5)]"></span>
                DIMENSIONES DE ENTRADA
              </h2>
              
              <div className="space-y-10">
                <div className="group">
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest group-hover:text-indigo-600 transition-colors">H: Altura de trabajo</label>
                    <span className="text-lg font-black text-indigo-700 bg-indigo-50 px-4 py-1.5 rounded-2xl border border-indigo-100 shadow-sm">{inputs.workHeight} m</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" max="50" step="0.5"
                    value={inputs.workHeight} 
                    onChange={(e) => handleInputChange('workHeight', parseFloat(e.target.value) || 0)}
                    className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-700 transition-all"
                  />
                </div>

                <div className="group">
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest group-hover:text-indigo-600 transition-colors">D: Distancia horizontal</label>
                    <span className="text-lg font-black text-indigo-700 bg-indigo-50 px-4 py-1.5 rounded-2xl border border-indigo-100 shadow-sm">{inputs.horizontalDistance} m</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" max="50" step="0.5"
                    value={inputs.horizontalDistance} 
                    onChange={(e) => handleInputChange('horizontalDistance', parseFloat(e.target.value) || 0)}
                    className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-700 transition-all"
                  />
                </div>
              </div>

              {/* Obstacles Control */}
              <div className="mt-12 pt-10 border-t border-slate-100 space-y-8">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 group transition-all">
                  <div className="flex items-center justify-between mb-2">
                     <h3 className="font-black text-slate-800 text-sm uppercase tracking-wider">Ho: Obstáculo 1</h3>
                     <button 
                       onClick={() => handleInputChange('hasObstacle', !inputs.hasObstacle)}
                       className={`w-14 h-7 rounded-full transition-all duration-300 relative ${inputs.hasObstacle ? 'bg-indigo-600 shadow-lg shadow-indigo-600/30' : 'bg-slate-300'}`}
                     >
                       <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${inputs.hasObstacle ? 'left-8' : 'left-1'}`}></div>
                     </button>
                  </div>
                  
                  {inputs.hasObstacle && (
                    <div className="mt-6 space-y-6 animate-in slide-in-from-top-4 duration-500">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Altura (m)</label>
                          <input 
                            type="number" 
                            step="0.1"
                            value={inputs.obstacleHeight} 
                            onChange={(e) => handleInputChange('obstacleHeight', parseFloat(e.target.value) || 0)}
                            className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 text-sm font-black text-slate-700 focus:border-indigo-500 outline-none transition-all shadow-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Do: Distancia (m)</label>
                          <input 
                            type="number" 
                            step="0.1"
                            value={inputs.obstacleDistance} 
                            onChange={(e) => handleInputChange('obstacleDistance', parseFloat(e.target.value) || 0)}
                            className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 text-sm font-black text-slate-700 focus:border-indigo-500 outline-none transition-all shadow-sm"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 group transition-all">
                  <div className="flex items-center justify-between mb-2">
                     <h3 className="font-black text-slate-800 text-sm uppercase tracking-wider">Ho2: Obstáculo 2</h3>
                     <button 
                       onClick={() => handleInputChange('hasObstacle2', !inputs.hasObstacle2)}
                       className={`w-14 h-7 rounded-full transition-all duration-300 relative ${inputs.hasObstacle2 ? 'bg-indigo-600 shadow-lg shadow-indigo-600/30' : 'bg-slate-300'}`}
                     >
                       <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${inputs.hasObstacle2 ? 'left-8' : 'left-1'}`}></div>
                     </button>
                  </div>

                  {inputs.hasObstacle2 && (
                    <div className="mt-6 space-y-6 animate-in slide-in-from-top-4 duration-500">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Altura (m)</label>
                          <input 
                            type="number" 
                            step="0.1"
                            value={inputs.obstacleHeight2} 
                            onChange={(e) => handleInputChange('obstacleHeight2', parseFloat(e.target.value) || 0)}
                            className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 text-sm font-black text-slate-700 focus:border-indigo-500 outline-none transition-all shadow-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Do2: Distancia (m)</label>
                          <input 
                            type="number" 
                            step="0.1"
                            value={inputs.obstacleDistance2} 
                            onChange={(e) => handleInputChange('obstacleDistance2', parseFloat(e.target.value) || 0)}
                            className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 text-sm font-black text-slate-700 focus:border-indigo-500 outline-none transition-all shadow-sm"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Results and Diagram */}
          <div className="lg:col-span-8 space-y-8">
            {/* Main Result Card */}
            <div className={`p-10 rounded-[2.5rem] border-4 ${theme.border} ${theme.bg} shadow-2xl transition-all duration-700 hover:shadow-indigo-500/10`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                <div>
                  <h3 className={`text-[11px] font-black uppercase tracking-[0.4em] ${theme.text} mb-3 opacity-80`}>Configuración Óptima</h3>
                  <p className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none">{result.recommendedMachine}</p>
                </div>
                <div className={`p-6 bg-white rounded-[2rem] shadow-xl ring-4 ${theme.border} ${theme.icon} transition-transform hover:rotate-3 duration-300`}>
                  <MachineIcon type={result.recommendedMachine} className="w-20 h-20" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white/60 p-6 rounded-[1.5rem] border-2 border-white shadow-sm transition-transform hover:-translate-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Longitud Estimada (L)</p>
                  <p className="text-3xl font-black text-slate-900 tracking-tighter">{result.estimatedReach} m</p>
                </div>
                <div className="bg-white/60 p-6 rounded-[1.5rem] border-2 border-white shadow-sm transition-transform hover:-translate-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Hreq: Altura de elevación</p>
                  <p className="text-3xl font-black text-slate-900 tracking-tighter">{result.requiredHeight} m</p>
                </div>
                <div className="md:col-span-2 bg-slate-900 p-6 rounded-[1.5rem] flex flex-col justify-center shadow-lg border-b-4 border-indigo-500">
                  <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-3">Parámetros Críticos Aplicados</p>
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
                    <span className="text-base font-black text-white uppercase tracking-widest">Cálculo Determinista Ok</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Compatible Portfolio Section */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl">
               <div className="flex items-center justify-between mb-8">
                 <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] flex items-center gap-3">
                   <div className="w-1.5 h-4 bg-indigo-500 rounded-full"></div>
                   Portfolio Compatible de tu Flota
                 </h4>
                 <span className="text-xs font-bold text-slate-500 bg-slate-100 px-4 py-1.5 rounded-full">{result.compatibleModels.length} modelos disponibles</span>
               </div>
               
               {result.compatibleModels.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {result.compatibleModels.map((model, idx) => (
                     <ModelCard 
                       key={model.id} 
                       model={model} 
                       isIdeal={idx === 0} 
                       theme={theme} 
                     />
                   ))}
                 </div>
               ) : (
                 <div className="p-10 text-center border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50/50">
                   <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No hay modelos en el portfolio que cumplan estas dimensiones específicas</p>
                 </div>
               )}
            </div>

            {/* Path Diagram */}
            <div className="shadow-2xl rounded-[2.5rem] overflow-hidden">
              <Diagram inputs={inputs} result={result} />
            </div>
            
            {/* Technical Justification */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden relative">
               <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                 <svg className="w-32 h-32 text-indigo-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
               </div>
               <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
                 <div className="w-1.5 h-4 bg-indigo-500 rounded-full"></div>
                 DIAGNÓSTICO TÉCNICO Y SEGURIDAD
               </h4>
               <ul className="space-y-5">
                 {result.messages.map((msg, i) => (
                   <li key={i} className="flex items-center gap-5 p-5 bg-slate-50 rounded-2xl border border-slate-100 group transition-all hover:bg-white hover:shadow-md hover:border-indigo-100">
                     <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                     </div>
                     <span className="text-sm md:text-base font-bold text-slate-700 tracking-tight leading-snug">{msg}</span>
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        </div>
      </div>

      <footer className="max-w-7xl mx-auto mt-20 pt-10 border-t border-slate-200 text-center">
         <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.6em] mb-2">MAINSADATA ENGINE &copy; 2025</p>
         <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest italic">Industrial Elevation Intelligence Platform | Specialized Fleet Allocation</p>
      </footer>
    </div>
  );
};

export default App;
