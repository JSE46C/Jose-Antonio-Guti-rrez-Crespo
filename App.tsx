
import React, { useState, useMemo } from 'react';
import { CalculationInputs, CalculationResult, MachineType, MachineModel } from './types';
import { calculateRequiredPlatform } from './logic/calculator';
import Diagram from './components/Diagram';
import { CONSTANTS } from './constants';

const MAINSA_LOGO_BASE64 = "data:image/png;base64,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";

const App: React.FC = () => {
  const [inputs, setInputs] = useState<CalculationInputs>({
    workHeight: 8,
    horizontalDistance: 6,
    hasObstacle: false,
    obstacleHeight: 3,
    obstacleDistance: 3,
    hasObstacle2: false,
    obstacleHeight2: 4,
    obstacleDistance2: 5,
  });

  const result: CalculationResult = useMemo(() => {
    return calculateRequiredPlatform(inputs);
  }, [inputs]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : parseFloat(value) || 0
    }));
  };

  const getRecommendationTheme = (type: MachineType) => {
    switch (type) {
      case MachineType.SCISSOR: return { bg: 'bg-amber-50', border: 'border-amber-500', text: 'text-amber-900', accent: 'bg-amber-600' };
      case MachineType.TELESCOPIC: return { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-900', accent: 'bg-blue-600' };
      case MachineType.ARTICULATED: return { bg: 'bg-purple-50', border: 'border-purple-500', text: 'text-purple-900', accent: 'bg-purple-600' };
      default: return { bg: 'bg-slate-50', border: 'border-slate-500', text: 'text-slate-900', accent: 'bg-slate-600' };
    }
  };

  const theme = getRecommendationTheme(result.recommendedMachine);

  return (
    <div className="min-h-screen bg-[#f1f5f9] p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Modern Mainsa Header */}
        <header className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6 bg-white p-6 rounded-[2rem] shadow-xl border border-slate-100">
          <div className="flex items-center gap-6">
             <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 shadow-inner">
               <img src={MAINSA_LOGO_BASE64} alt="Mainsa" className="h-16 w-auto object-contain" />
             </div>
             <div>
               <h1 className="text-3xl font-black uppercase tracking-tighter leading-none">Mainsa <span className="text-indigo-600">Calculadora</span></h1>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1">Smart Fleet Selection System</p>
             </div>
          </div>
          <div className="flex items-center gap-4 bg-slate-900 text-white px-6 py-4 rounded-[1.5rem] shadow-lg border-l-8 border-indigo-500">
             <div className="text-right">
                <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">ISO 16368 Compliant</p>
                <p className="text-lg font-black tracking-tight">Cálculo de Seguridad v2.5</p>
             </div>
             <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Enhanced Inputs */}
          <div className="lg:col-span-4 space-y-8">
            <section className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600"></div>
              <h2 className="text-xs font-black uppercase mb-8 text-slate-400 tracking-[0.4em] flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                Objetivo Geométrico
              </h2>
              <div className="space-y-10">
                <div className="group">
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">H: Altura Trabajo</label>
                    <span className="text-lg font-black text-indigo-600 bg-indigo-50 px-4 py-1 rounded-full border border-indigo-100">{inputs.workHeight} m</span>
                  </div>
                  <input type="range" name="workHeight" min="1" max="50" step="0.5" value={inputs.workHeight} onChange={handleInputChange} className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-indigo-600" />
                </div>
                <div className="group">
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">D: Distancia Horizontal</label>
                    <span className="text-lg font-black text-indigo-600 bg-indigo-50 px-4 py-1 rounded-full border border-indigo-100">{inputs.horizontalDistance} m</span>
                  </div>
                  <input type="range" name="horizontalDistance" min="0" max="50" step="0.5" value={inputs.horizontalDistance} onChange={handleInputChange} className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-indigo-600" />
                </div>
              </div>
            </section>

            <section className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
               <div className="flex items-center justify-between mb-8">
                 <h2 className="text-xs font-black uppercase text-slate-400 tracking-[0.4em]">Ho: Obstáculo 1</h2>
                 <button onClick={() => setInputs(p => ({...p, hasObstacle: !p.hasObstacle}))} className={`w-12 h-6 rounded-full transition-colors relative ${inputs.hasObstacle ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${inputs.hasObstacle ? 'left-7' : 'left-1'}`}></div>
                 </button>
               </div>
               {inputs.hasObstacle && (
                 <div className="grid grid-cols-2 gap-6 animate-in slide-in-from-top-4">
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Altura</label>
                     <input type="number" name="obstacleHeight" value={inputs.obstacleHeight} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 font-black text-slate-700 outline-none focus:border-indigo-500" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Distancia</label>
                     <input type="number" name="obstacleDistance" value={inputs.obstacleDistance} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 font-black text-slate-700 outline-none focus:border-indigo-500" />
                   </div>
                 </div>
               )}
            </section>

            <section className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
               <div className="flex items-center justify-between mb-8">
                 <h2 className="text-xs font-black uppercase text-slate-400 tracking-[0.4em]">Ho2: Obstáculo 2</h2>
                 <button onClick={() => setInputs(p => ({...p, hasObstacle2: !p.hasObstacle2}))} className={`w-12 h-6 rounded-full transition-colors relative ${inputs.hasObstacle2 ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${inputs.hasObstacle2 ? 'left-7' : 'left-1'}`}></div>
                 </button>
               </div>
               {inputs.hasObstacle2 && (
                 <div className="grid grid-cols-2 gap-6 animate-in slide-in-from-top-4">
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Altura</label>
                     <input type="number" name="obstacleHeight2" value={inputs.obstacleHeight2} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 font-black text-slate-700 outline-none focus:border-indigo-500" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Distancia</label>
                     <input type="number" name="obstacleDistance2" value={inputs.obstacleDistance2} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 font-black text-slate-700 outline-none focus:border-indigo-500" />
                   </div>
                 </div>
               )}
            </section>
          </div>

          {/* Right: Diagram First + Results */}
          <div className="lg:col-span-8 space-y-10">
            {/* Diagram is now visual priority #1 */}
            <div className="shadow-2xl rounded-[3rem] overflow-hidden border border-white">
              <Diagram inputs={inputs} result={result} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Solution Analysis */}
              <section className={`p-10 rounded-[3rem] border-4 ${theme.border} ${theme.bg} shadow-2xl transition-all duration-700`}>
                <h2 className={`text-[11px] font-black uppercase tracking-[0.4em] mb-8 ${theme.text} opacity-70`}>Diagnóstico de Ingeniería</h2>
                
                <div className="space-y-8">
                  <div className={`${theme.accent} text-white p-8 rounded-[2rem] shadow-xl relative group overflow-hidden`}>
                    <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-125 transition-transform duration-500">
                        <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                    </div>
                    <p className="text-[10px] uppercase font-black text-white/60 mb-2 tracking-widest">Configuración Óptima</p>
                    <p className="text-3xl font-black leading-none tracking-tighter uppercase">{result.recommendedMachine}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/80 p-5 rounded-2xl border border-white shadow-sm">
                      <p className="text-[9px] uppercase font-black text-slate-400 mb-1 tracking-widest">Hreq Requerida</p>
                      <p className="text-2xl font-black text-slate-900">{result.requiredHeight.toFixed(1)}m</p>
                    </div>
                    <div className="bg-white/80 p-5 rounded-2xl border border-white shadow-sm">
                      <p className="text-[9px] uppercase font-black text-slate-400 mb-1 tracking-widest">L: Alcance Est.</p>
                      <p className="text-2xl font-black text-slate-900">{result.estimatedReach.toFixed(1)}m</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 space-y-4">
                  {result.messages.map((msg, i) => (
                    <div key={i} className={`flex gap-4 items-start p-4 bg-white/40 rounded-xl border border-white text-xs font-bold ${theme.text}`}>
                      <span className="shrink-0 mt-0.5 text-lg">⚙️</span>
                      <span className="leading-relaxed">{msg}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Compatible Fleet Section */}
              <section className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 flex flex-col">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-[11px] font-black uppercase text-slate-400 tracking-[0.4em]">Flota Mainsa Compatible</h2>
                    <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase">{result.compatibleModels.length} Equipos</span>
                </div>
                
                <div className="space-y-4 flex-1 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
                  {result.compatibleModels.length > 0 ? (
                    result.compatibleModels.map((model, idx) => (
                      <div key={model.id} className={`p-5 rounded-2xl border-2 transition-all cursor-default ${idx === 0 ? 'border-indigo-500 bg-indigo-50/30' : 'border-slate-50 bg-slate-50/50 hover:border-slate-200'}`}>
                        <div className="flex justify-between items-start mb-3">
                          <div>
                             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{model.brand}</p>
                             <h4 className="text-lg font-black text-slate-900 tracking-tight">{model.model}</h4>
                          </div>
                          {idx === 0 && <span className="bg-indigo-600 text-white text-[8px] px-2 py-0.5 rounded-full font-black uppercase">Ideal</span>}
                        </div>
                        <div className="flex justify-between items-end">
                            <div className="flex gap-4">
                                <div className="text-center">
                                    <p className="text-[8px] font-bold text-slate-400 uppercase">H Máx</p>
                                    <p className="text-sm font-black text-slate-800">{model.maxWorkHeight}m</p>
                                </div>
                                {model.maxReach && (
                                    <div className="text-center border-l border-slate-200 pl-4">
                                        <p className="text-[8px] font-bold text-slate-400 uppercase">D Máx</p>
                                        <p className="text-sm font-black text-slate-800">{model.maxReach}m</p>
                                    </div>
                                )}
                            </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center p-10 text-center bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                      <div className="text-4xl mb-4 opacity-40">⚠️</div>
                      <p className="text-sm font-black text-slate-400 uppercase tracking-widest leading-snug">No se encontraron modelos exactos en portfolio para esta configuración</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-8 pt-6 border-t border-slate-50">
                    <button className="w-full bg-slate-900 text-white font-black uppercase tracking-widest py-4 rounded-2xl shadow-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-3">
                        Solicitar Cotización
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <footer className="max-w-7xl mx-auto mt-20 pt-10 border-t border-slate-200 text-center opacity-50">
         <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.6em]">Mainsa Data Engine &copy; 2025 | Fleet Optimization System</p>
      </footer>
    </div>
  );
};

export default App;
