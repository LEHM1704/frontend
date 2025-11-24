import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cart: CartItem[] = [];

  // Obtener items (para mostrar en la lista)
  getCart(): CartItem[] {
    return this.cart;
  }

  // Calcular total (Regla de negocio)
  getTotal(): number {
    return this.cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  }

  // Agregar producto
  addProduct(product: Product): { success: boolean; message?: string } {
    if (product.stock <= 0) {
      return { success: false, message: 'Producto agotado' };
    }

    const item = this.cart.find((i) => i.producto_id === product.id);

    if (item) {
      // Si ya existe, validamos no pasar el stock máximo
      if (item.cantidad < product.stock) {
        item.cantidad++;
        return { success: true };
      } else {
        return { success: false, message: 'No hay más stock disponible de este producto' };
      }
    } else {
      // Si es nuevo, lo agregamos
      this.cart.push({
        producto_id: product.id,
        nombre: product.nombre,
        precio: product.precio,
        cantidad: 1,
        imagen_url: product.imagen_url,
        maxStock: product.stock,
      });
      return { success: true };
    }
  }

  // Limpiar carrito
  clear() {
    this.cart = [];
  }

  // Eliminar un item específico
  removeItem(productoId: number) {
    this.cart = this.cart.filter((i) => i.producto_id !== productoId);
  }
}
