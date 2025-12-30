
import React, { useRef, useEffect } from 'react';
import { CalculationInputs, CalculationResult, MachineType } from '../types';
import { CONSTANTS } from '../constants';

interface DiagramProps {
  inputs: CalculationInputs;
  result: CalculationResult;
}

const Diagram: React.FC<DiagramProps> = ({ inputs, result }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear and Resize
    const parent = canvas.parentElement;
    if (parent) {
      canvas.width = parent.clientWidth;
      canvas.height = 400;
    }

    const { width, height } = canvas;
    const padding = CONSTANTS.CANVAS_PADDING;

    // Calculate Scale (meters to pixels)
    // Find max boundaries including all obstacles
    const maxMetersX = Math.max(
        inputs.horizontalDistance, 
        inputs.hasObstacle ? inputs.obstacleDistance : 0, 
        inputs.hasObstacle2 ? inputs.obstacleDistance2 : 0,
        5
    ) + 4;
    
    const maxMetersY = Math.max(
        inputs.workHeight, 
        inputs.hasObstacle ? inputs.obstacleHeight : 0, 
        inputs.hasObstacle2 ? inputs.obstacleHeight2 : 0,
        5
    ) + 4;
    
    const scaleX = (width - padding * 2) / maxMetersX;
    const scaleY = (height - padding * 2) / maxMetersY;
    const scale = Math.min(scaleX, scaleY);

    // Transformation Helpers
    const toPxX = (m: number) => padding + m * scale;
    const toPxY = (m: number) => height - padding - m * scale;

    // --- Drawing ---
    ctx.clearRect(0, 0, width, height);

    // Grid
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;
    for (let i = 0; i <= maxMetersX; i += 2) {
        ctx.beginPath();
        ctx.moveTo(toPxX(i), toPxY(0));
        ctx.lineTo(toPxX(i), toPxY(maxMetersY));
        ctx.stroke();
    }
    for (let i = 0; i <= maxMetersY; i += 2) {
        ctx.beginPath();
        ctx.moveTo(toPxX(0), toPxY(i));
        ctx.lineTo(toPxX(maxMetersX), toPxY(i));
        ctx.stroke();
    }

    // Ground
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, toPxY(0));
    ctx.lineTo(width, toPxY(0));
    ctx.stroke();

    // Machine Base
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(toPxX(0) - 12, toPxY(0) - 12, 24, 12);

    // Obstacles Drawing Function
    const drawObstacle = (dist: number, h: number, label: string) => {
        ctx.fillStyle = '#ef4444';
        const obsWidth = 12;
        ctx.fillRect(toPxX(dist) - obsWidth/2, toPxY(h), obsWidth, h * scale);
        
        // Safety margin visual
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.3)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(
          toPxX(dist) - 18, 
          toPxY(h + CONSTANTS.SAFETY_MARGIN_OBSTACLE), 
          36, 
          (h + CONSTANTS.SAFETY_MARGIN_OBSTACLE) * scale
        );
        ctx.setLineDash([]);
        
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 10px sans-serif';
        ctx.fillText(label, toPxX(dist) - 15, toPxY(h) - 5);
    };

    if (inputs.hasObstacle) drawObstacle(inputs.obstacleDistance, inputs.obstacleHeight, 'OBS 1');
    if (inputs.hasObstacle2) drawObstacle(inputs.obstacleDistance2, inputs.obstacleHeight2, 'OBS 2');

    // Target Point
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(toPxX(inputs.horizontalDistance), toPxY(inputs.workHeight), 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.fillStyle = '#059669';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText(`OBJETIVO (${inputs.workHeight}m)`, toPxX(inputs.horizontalDistance) + 12, toPxY(inputs.workHeight) + 4);

    // Path Visualization
    const hReq = inputs.workHeight + CONSTANTS.SAFETY_MARGIN_GENERAL;
    ctx.lineWidth = 3;
    
    if (result.recommendedMachine === MachineType.SCISSOR) {
        ctx.strokeStyle = '#f59e0b';
        ctx.beginPath();
        ctx.moveTo(toPxX(0), toPxY(0));
        ctx.lineTo(toPxX(0), toPxY(hReq));
        ctx.stroke();
    } else if (result.recommendedMachine === MachineType.TELESCOPIC) {
        ctx.strokeStyle = '#3b82f6';
        ctx.beginPath();
        ctx.moveTo(toPxX(0), toPxY(0));
        ctx.lineTo(toPxX(inputs.horizontalDistance), toPxY(hReq));
        ctx.stroke();
    } else if (result.recommendedMachine === MachineType.ARTICULATED) {
        ctx.strokeStyle = '#8b5cf6';
        ctx.beginPath();
        ctx.moveTo(toPxX(0), toPxY(0));
        // Use obstacles as control points for a smooth curve
        const midX = inputs.hasObstacle2 ? (inputs.obstacleDistance + inputs.obstacleDistance2) / 2 : inputs.obstacleDistance;
        const midY = hReq + 3;
        ctx.quadraticCurveTo(toPxX(midX), toPxY(midY), toPxX(inputs.horizontalDistance), toPxY(hReq));
        ctx.stroke();
    }

  }, [inputs, result]);

  return (
    <div className="w-full bg-white rounded-xl shadow-inner overflow-hidden border border-slate-200">
      <div className="p-3 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
        <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Simulación de Trayectoria 2D</span>
        <div className="flex gap-4">
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-red-500 rounded-sm"></div><span className="text-[10px] font-bold text-slate-600 uppercase">Obstáculo</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div><span className="text-[10px] font-bold text-slate-600 uppercase">Objetivo</span></div>
        </div>
      </div>
      <canvas ref={canvasRef} className="w-full h-[400px] block" />
    </div>
  );
};

export default Diagram;
