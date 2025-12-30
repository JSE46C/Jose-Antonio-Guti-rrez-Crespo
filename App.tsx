
import React, { useState, useMemo } from 'react';
import { CalculationInputs, CalculationResult, MachineType, MachineModel } from './types';
import { calculateRequiredPlatform } from './logic/calculator';
import Diagram from './components/Diagram';
import { CONSTANTS } from './constants';

// Main application component for the EWP Calculator
const App: React.FC = () => {
  const [inputs, setInputs] = useState<CalculationInputs>({
    workHeight: 8,
    horizontalDistance: 0,
    hasObstacle: false,
    obstacleHeight: 2,
    obstacleDistance: 2,
    hasObstacle2: false,
    obstacleHeight2: 4,
    obstacleDistance2: 5,
  });

  // Calculate results whenever inputs change
  const result = useMemo(() => calculateRequiredPlatform(inputs), [inputs]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : parseFloat(value) || 0
    }));
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="bg-slate-900 text-white p-4 rounded-lg shadow-lg">
             <h1 className="text-2xl font-black uppercase tracking-tighter">Mainsa <span className="text-emerald-400">Calculator</span></h1>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Selector de Plataformas Elevadoras</p>
          </div>
          <div className="text-right">
             <p className="text-xs font-bold text-slate-500 uppercase">Parámetros de Seguridad:</p>
             <p className="text-[10px] text-slate-400">Margen General: {CONSTANTS.SAFETY_MARGIN_GENERAL}m | Margen Obstáculo: {CONSTANTS.SAFETY_MARGIN_OBSTACLE}m</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Inputs Section */}
          <div className="lg:col-span-4 space-y-6">
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-sm font-black uppercase mb-4 text-slate-400 tracking-widest">Objetivo de Trabajo</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Altura de Trabajo (m)</label>
                  <input 
                    type="number" 
                    name="workHeight"
                    value={inputs.workHeight} 
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 font-bold focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Distancia Horizontal (m)</label>
                  <input 
                    type="number" 
                    name="horizontalDistance"
                    value={inputs.horizontalDistance} 
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 font-bold focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>
            </section>

            <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-black uppercase text-slate-400 tracking-widest">Obstáculo 1</h2>
                <input 
                  type="checkbox" 
                  name="hasObstacle"
                  checked={inputs.hasObstacle} 
                  onChange={handleInputChange}
                  className="w-4 h-4 cursor-pointer"
                />
              </div>
              {inputs.hasObstacle && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Altura (m)</label>
                    <input 
                      type="number" 
                      name="obstacleHeight"
                      value={inputs.obstacleHeight} 
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Distancia (m)</label>
                    <input 
                      type="number" 
                      name="obstacleDistance"
                      value={inputs.obstacleDistance} 
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 font-bold"
                    />
                  </div>
                </div>
              )}
            </section>

            <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-black uppercase text-slate-400 tracking-widest">Obstáculo 2</h2>
                <input 
                  type="checkbox" 
                  name="hasObstacle2"
                  checked={inputs.hasObstacle2} 
                  onChange={handleInputChange}
                  className="w-4 h-4 cursor-pointer"
                />
              </div>
              {inputs.hasObstacle2 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Altura (m)</label>
                    <input 
                      type="number" 
                      name="obstacleHeight2"
                      value={inputs.obstacleHeight2} 
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Distancia (m)</label>
                    <input 
                      type="number" 
                      name="obstacleDistance2"
                      value={inputs.obstacleDistance2} 
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 font-bold"
                    />
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Result Section */}
          <div className="lg:col-span-8 space-y-8">
            <Diagram inputs={inputs} result={result} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h2 className="text-xs font-black uppercase mb-4 text-slate-400 tracking-widest">Análisis de Solución</h2>
                <div className="space-y-3">
                  <div className="p-4 bg-slate-900 text-white rounded-xl">
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Tipo Recomendado</p>
                    <p className="text-xl font-black">{result.recommendedMachine}</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1 p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Alt. Requerida</p>
                      <p className="text-lg font-black">{result.requiredHeight.toFixed(1)}m</p>
                    </div>
                    <div className="flex-1 p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Alcance Est.</p>
                      <p className="text-lg font-black">{result.estimatedReach.toFixed(1)}m</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  {result.messages.map((msg, i) => (
                    <div key={i} className="flex gap-2 text-xs font-bold text-slate-600">
                      <span className="text-emerald-500">→</span>
                      <span>{msg}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h2 className="text-xs font-black uppercase mb-4 text-slate-400 tracking-widest">Modelos Compatibles ({result.compatibleModels.length})</h2>
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {result.compatibleModels.length > 0 ? (
                    result.compatibleModels.map(model => (
                      <div key={model.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex justify-between items-center hover:border-slate-900 transition-colors cursor-default">
                        <div>
                          <p className="text-xs font-black uppercase tracking-tight">{model.brand} {model.model}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">{model.type}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-black text-slate-900">{model.maxWorkHeight}m</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Max Alt.</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center bg-red-50 rounded-xl border border-red-100">
                      <p className="text-xs font-black text-red-600 uppercase">No hay modelos disponibles</p>
                      <p className="text-[10px] font-bold text-red-400 uppercase mt-1">Contacte con soporte técnico</p>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
