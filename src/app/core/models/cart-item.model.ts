export interface CartItem {
  producto_id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen_url?: string;
  maxStock: number; // Para validar que no agreguen más de lo que hay
}
