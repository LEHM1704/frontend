export interface Category {
  id: number; // Aunque PHP mande "1" (string), TS lo maneja flexible
  nombre: string;
  activo: boolean; // O number, depende de cómo lo uses
}
