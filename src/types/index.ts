// src/types/index.ts

export interface AutoSpec {
    label: string;
    valor: string;
}

export interface AutoItem {
    id: string;
    nombre: string;
    categoria: string;
    categoriaTipo: 'executive' | 'performance';
    precio: string;
    imagen: string;
    descripcion: string;
    specs: AutoSpec[];
    colores: string;
}

export interface DatosCita {
    nombre: string;
    correo: string;
    telefono: string;
    fecha: string;
    hora: string;
    autoInteres: string;
}

export interface Spec {
  label: string;
  valor: string;
}

export interface Auto {
  id: string;
  nombre: string;
  categoria: string;
  precio: string;
  imagen: string;
  descripcion: string;
  specs: Spec[];
  colores: string;
  categoriaFiltro: 'executive' | 'performance';
}

export interface CitaFormData {
  nombre: string;
  correo: string;
  telefono: string;
  fecha: string;
  hora: string;
  autoInteres?: string;
}

// Tema 3 & 4: Interfaz para las métricas e indicadores del dashboard
export interface Indicator {
  id: number;
  metric: string;
  value: string;
  status: 'Óptimo' | 'Alto' | 'Medio';
}