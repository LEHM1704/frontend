export interface Product {
  id: number;
  categoria_id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  imagen_url?: string;
  activo: boolean;
  categoria_nombre?: string;
}
