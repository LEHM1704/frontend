import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Product } from '../../../../core/models/product.model';
import { SaleService } from '../../../../core/services/sale.service';
import { CartService } from '../../../../core/services/cart.service';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-pos-component',
  standalone: false,
  templateUrl: './pos-component.html',
  styleUrl: './pos-component.scss',
})
export class PosComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = false;

  constructor(
    private productService: ProductService,
    private saleService: SaleService,
    public cartService: CartService, // <--- Inyectamos Público para usarlo en HTML
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAll().subscribe((resp) => {
      if (resp.tipo === 1) this.products = resp.data || [];
    });
  }

  // Lógica delegada al servicio (SRP)
  addToCart(product: Product) {
    const result = this.cartService.addProduct(product);

    if (!result.success) {
      // El componente solo se encarga de mostrar la alerta (UI), no de calcular
      this.messageService.add({
        severity: result.message === 'No hay stock disponible' ? 'error' : 'warn',
        summary: 'Atención',
        detail: result.message,
      });
    }
  }
  removeItem(productId: number) {
    this.cartService.removeItem(productId);
  }

  processSale() {
    const items = this.cartService.getCart();
    if (items.length === 0) return;

    this.loading = true;

    const venta = {
      total: this.cartService.getTotal(), // Pedimos el total al servicio
      items: items.map((i) => ({ producto_id: i.producto_id, cantidad: i.cantidad })),
    };

    this.saleService.registrarVenta(venta).subscribe({
      next: (resp) => {
        this.loading = false;

        if (resp.tipo === 1) {
          this.messageService.add({
            severity: 'success',
            summary: 'Venta Exitosa',
            detail: resp.message,
          });

          this.cartService.clear(); // Limpiamos el servicio
          this.loadProducts();
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: resp.message });
        }
      },
      error: () => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Fallo de conexión',
        });
      },
    });
  }
}
