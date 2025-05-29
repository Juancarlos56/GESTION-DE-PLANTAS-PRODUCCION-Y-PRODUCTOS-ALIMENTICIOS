export interface Planta {
  id: number;
  nombre: string;
  ubicacion?: string;
}

export class Planta {
  id: number = 0;
  nombre!: string;
  ubicacion?: string;
}