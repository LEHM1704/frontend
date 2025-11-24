export interface ApiResponse<T> {
  tipo: number; // <--- CAMBIO CLAVE: 1: Éxito, 3: Error
  message: string;
  data?: T; // Puede ser null en errores o deletes
  error_detail?: string; // Para depuración
}
