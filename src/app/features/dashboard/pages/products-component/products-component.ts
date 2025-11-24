import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../core/services/product.service';
import { Product } from '../../../../core/models/product.model';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../../../core/services/category.service';
import { Category } from '../../../../core/models/category.model';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products-component.html',
  providers: [ConfirmationService, ConfirmationService], // Proveedor local para el diálogo de confirmación
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  productDialog: boolean = false;
  product!: Product;
  submitted: boolean = false;
  loading: boolean = true;

  // Lista quemada de categorías (Para el select del formulario)
  // En un futuro podrías traerlas de una tabla 'categorias' del backend
  categorias: Category[] = [];

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private authService: AuthService,
    private router: Router,
    private categoryService: CategoryService
  ) {}
  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.loading = true;
    this.productService.getAll().subscribe({
      next: (resp) => {
        this.loading = false;
        if (resp.tipo === 1) {
          this.products = resp.data || [];
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: resp.message });
        }
      },
      error: () => (this.loading = false),
    });
  }
  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (resp) => {
        // Validamos tu estándar: tipo 1 = Éxito
        if (resp.tipo === 1) {
          this.categorias = resp.data || [];
        } else {
          console.error('Error cargando categorías:', resp.message);
        }
      },
    });
  }
  // --- ABRIR MODAL (NUEVO) ---
  openNew() {
    this.product = {
      id: 0,
      nombre: '',
      precio: 0,
      stock: 0,
      categoria_id: 1,
      activo: true,
    };
    this.submitted = false;
    this.productDialog = true;
  }

  // --- ABRIR MODAL (EDITAR) ---
  editProduct(product: Product) {
    this.product = { ...product }; // Clonar objeto para no editar la tabla directo
    this.productDialog = true;
  }

  // --- GUARDAR (CREATE / UPDATE) ---
  saveProduct() {
    this.submitted = true;

    // Validación simple frontend
    if (
      !this.product.nombre.trim() ||
      this.product.precio <= 0 ||
      this.product.stock < 0 ||
      !this.product.categoria_id
    ) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Datos inválidos',
        detail:
          'Revisa que el precio sea mayor a 0, el stock no sea negativo y la categoría esté seleccionada.',
      });
      return;
    }

    this.loading = true;

    if (this.product.id) {
      // ACTUALIZAR
      this.productService.update(this.product.id, this.product).subscribe({
        next: (resp) => this.handleResponse(resp, 'Producto Actualizado'),
        error: () => (this.loading = false),
      });
    } else {
      // CREAR
      this.productService.create(this.product).subscribe({
        next: (resp) => this.handleResponse(resp, 'Producto Creado'),
        error: () => (this.loading = false),
      });
    }
  }

  // --- ELIMINAR (DELETE) ---
  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar ' + product.nombre + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.delete(product.id).subscribe({
          next: (resp) => {
            if (resp.tipo === 1) {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Producto Eliminado',
                life: 3000,
              });
              this.loadProducts();
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: resp.message,
              });
            }
          },
        });
      },
    });
  }

  // Helper para procesar respuesta de guardar
  handleResponse(resp: any, successMsg: string) {
    this.loading = false;
    if (resp.tipo === 1) {
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: successMsg,
        life: 3000,
      });
      this.productDialog = false;
      this.loadProducts(); // Recargar tabla
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: resp.message });
    }
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }
}
