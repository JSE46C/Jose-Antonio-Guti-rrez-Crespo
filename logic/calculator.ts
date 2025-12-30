
import { CalculationInputs, CalculationResult, MachineType, MachineModel } from '../types';
import { CONSTANTS } from '../constants';
import { MAINSA_FLEET } from '../data/portfolio';

export const calculateRequiredPlatform = (inputs: CalculationInputs): CalculationResult => {
  const { 
    workHeight: H, 
    horizontalDistance: D, 
    obstacleHeight: Ho, 
    obstacleDistance: Do, 
    hasObstacle,
    obstacleHeight2: Ho2,
    obstacleDistance2: Do2,
    hasObstacle2
  } = inputs;
  
  const hReq = H + CONSTANTS.SAFETY_MARGIN_GENERAL;
  const messages: string[] = [];
  let recommendedType: MachineType;
  let estimatedReach = 0;

  // 1. Lógica de Selección de Tipo
  if (D <= CONSTANTS.MAX_SCISSOR_DISTANCE) {
    recommendedType = MachineType.SCISSOR;
    messages.push("Trabajo vertical (D ≤ 0.5m): Se recomienda plataforma de tijera.");
  } else {
    messages.push(`Trabajo no vertical (D > ${CONSTANTS.MAX_SCISSOR_DISTANCE}m): Tijera descartada.`);
    const L = Math.sqrt(Math.pow(hReq, 2) + Math.pow(D, 2));
    estimatedReach = parseFloat(L.toFixed(2));
    
    let telescopicViable = true;
    const checkObstacle = (dist: number, height: number, id: number) => {
      if (dist >= D) return true;
      const yDo = (hReq / D) * dist;
      const clearance = height + CONSTANTS.SAFETY_MARGIN_OBSTACLE;
      if (yDo < clearance) {
        messages.push(`Obstáculo ${id}: Interfiere trayectoria recta. yDo (${yDo.toFixed(1)}m) < Requerido (${clearance.toFixed(1)}m).`);
        return false;
      }
      return true;
    };

    if (hasObstacle && !checkObstacle(Do, Ho, 1)) telescopicViable = false;
    if (hasObstacle2 && telescopicViable && !checkObstacle(Do2, Ho2, 2)) telescopicViable = false;

    if (telescopicViable) {
      recommendedType = MachineType.TELESCOPIC;
      messages.push("Trayectoria libre: Brazo telescópico recomendado.");
    } else {
      recommendedType = MachineType.ARTICULATED;
      estimatedReach = parseFloat((L * CONSTANTS.ARTICULATED_FACTOR_K).toFixed(2));
      messages.push("Obstáculo detectado: Se requiere brazo articulado.");
    }
  }

  // 2. Filtrado de Portfolio
  const compatibleModels = MAINSA_FLEET.filter(m => {
    const typeMatch = m.type === recommendedType;
    const heightMatch = m.maxWorkHeight >= hReq;
    const reachMatch = m.maxReach ? m.maxReach >= D : true; // Verificar que el alcance horizontal también sea suficiente
    return typeMatch && heightMatch && reachMatch;
  }).sort((a, b) => a.maxWorkHeight - b.maxWorkHeight);

  return {
    recommendedMachine: recommendedType,
    requiredHeight: hReq,
    estimatedReach,
    messages,
    compatibleModels
  };
};
