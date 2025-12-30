
export enum MachineType {
  SCISSOR = 'Tijera',
  TELESCOPIC = 'Brazo Telescópico',
  ARTICULATED = 'Brazo Articulado',
  NONE = 'No se encontró solución viable'
}

export interface MachineModel {
  id: string;
  model: string;
  brand: string;
  type: MachineType;
  maxWorkHeight: number;
  maxReach?: number;
  image?: string;
}

export interface CalculationInputs {
  workHeight: number;
  horizontalDistance: number;
  hasObstacle: boolean;
  obstacleHeight: number;
  obstacleDistance: number;
  hasObstacle2: boolean;
  obstacleHeight2: number;
  obstacleDistance2: number;
}

export interface CalculationResult {
  recommendedMachine: MachineType;
  requiredHeight: number;
  estimatedReach: number;
  messages: string[];
  compatibleModels: MachineModel[];
}
