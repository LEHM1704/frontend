import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../core/services/category.service';
import { Category } from '../../../../core/models/category.model';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-categorias-component',
  standalone: false,
  templateUrl: './categorias-component.html',
  styleUrl: './categorias-component.scss',
})
export class CategoriasComponent implements OnInit {
  categories: Category[] = [];
  categoryDialog: boolean = false;
  category: any = { nombre: '' }; // Objeto temporal
  submitted: boolean = false;
  loading: boolean = true;

  constructor(
    private categoryService: CategoryService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.loading = true;
    this.categoryService.getAll().subscribe({
      next: (resp) => {
        this.loading = false;
        if (resp.tipo === 1) {
          this.categories = resp.data || [];
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: resp.message });
        }
      },
      error: () => (this.loading = false),
    });
  }

  openNew() {
    this.category = { nombre: '' };
    this.submitted = false;
    this.categoryDialog = true;
  }

  editCategory(cat: Category) {
    this.category = { ...cat }; // Clonar para no editar la tabla directo
    this.categoryDialog = true;
  }

  deleteCategory(cat: Category) {
    this.confirmationService.confirm({
      message: `¿Borrar la categoría "${cat.nombre}"?`,
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoryService.delete(cat.id).subscribe({
          next: (resp) => {
            if (resp.tipo === 1) {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Categoría eliminada',
              });
              this.loadCategories();
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

  saveCategory() {
    this.submitted = true;

    if (!this.category.nombre.trim()) {
      return;
    }

    if (this.category.id) {
      // UPDATE
      this.categoryService
        .update(this.category.id, this.category)
        .subscribe((resp) => this.handleResponse(resp));
    } else {
      // CREATE
      this.categoryService.create(this.category).subscribe((resp) => this.handleResponse(resp));
    }
  }

  handleResponse(resp: any) {
    if (resp.tipo === 1) {
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: resp.message });
      this.categoryDialog = false;
      this.loadCategories();
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: resp.message });
    }
  }
}
