
import { MachineModel, MachineType } from '../types';

export const MAINSA_FLEET: MachineModel[] = [
  // Tijeras Eléctricas/Diésel
  { id: 'S6', model: 'Mainsa E-06', brand: 'Mainsa', type: MachineType.SCISSOR, maxWorkHeight: 6 },
  { id: 'S8', model: 'Mainsa E-08', brand: 'Mainsa', type: MachineType.SCISSOR, maxWorkHeight: 8 },
  { id: 'S10', model: 'Mainsa E-10', brand: 'Mainsa', type: MachineType.SCISSOR, maxWorkHeight: 10 },
  { id: 'S12', model: 'Mainsa E-12', brand: 'Mainsa', type: MachineType.SCISSOR, maxWorkHeight: 12 },
  { id: 'S14', model: 'Mainsa D-14', brand: 'Mainsa', type: MachineType.SCISSOR, maxWorkHeight: 14 },
  { id: 'S18', model: 'Mainsa D-18 Heavy', brand: 'Mainsa', type: MachineType.SCISSOR, maxWorkHeight: 18 },

  // Brazos Articulados
  { id: 'A12', model: 'Mainsa Art-12', brand: 'Mainsa', type: MachineType.ARTICULATED, maxWorkHeight: 12, maxReach: 6 },
  { id: 'A16', model: 'Mainsa Art-16', brand: 'Mainsa', type: MachineType.ARTICULATED, maxWorkHeight: 16, maxReach: 9 },
  { id: 'A20', model: 'Mainsa Art-20', brand: 'Mainsa', type: MachineType.ARTICULATED, maxWorkHeight: 20, maxReach: 12 },
  { id: 'A26', model: 'Mainsa Art-26', brand: 'Mainsa', type: MachineType.ARTICULATED, maxWorkHeight: 26, maxReach: 15 },
  { id: 'A32', model: 'Mainsa Art-32', brand: 'Mainsa', type: MachineType.ARTICULATED, maxWorkHeight: 32, maxReach: 21 },

  // Brazos Telescópicos
  { id: 'T16', model: 'Mainsa Tel-16', brand: 'Mainsa', type: MachineType.TELESCOPIC, maxWorkHeight: 16, maxReach: 11 },
  { id: 'T22', model: 'Mainsa Tel-22', brand: 'Mainsa', type: MachineType.TELESCOPIC, maxWorkHeight: 22, maxReach: 17 },
  { id: 'T28', model: 'Mainsa Tel-28', brand: 'Mainsa', type: MachineType.TELESCOPIC, maxWorkHeight: 28, maxReach: 20 },
  { id: 'T40', model: 'Mainsa Tel-40 Giant', brand: 'Mainsa', type: MachineType.TELESCOPIC, maxWorkHeight: 40, maxReach: 24 },
  { id: 'T50', model: 'Mainsa Tel-50 Extreme', brand: 'Mainsa', type: MachineType.TELESCOPIC, maxWorkHeight: 50, maxReach: 28 },
];
