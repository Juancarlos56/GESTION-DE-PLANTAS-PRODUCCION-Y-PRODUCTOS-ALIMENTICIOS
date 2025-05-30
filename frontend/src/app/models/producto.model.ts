export interface Producto {
  id: number;
  nombre: string;
  tipo?: string;
  fechaRegistro?: string;
  plantaId: number;
}

export class Producto {
  id: number = 0;
  nombre!: string;
  tipo?: string;
  fechaRegistro?: string;
  plantaId!: number;
  plantaNombre!: string;
}