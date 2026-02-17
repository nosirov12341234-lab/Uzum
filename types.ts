
export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface CargoCalcData {
  weight: number;
  volume: number; // in CBM
  pricePerKg: number;
  pricePerCbm: number;
}

export interface ChecklistItem {
  id: string;
  task: string;
  completed: boolean;
}
