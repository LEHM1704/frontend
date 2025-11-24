import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing-module';

import { ProductsComponent } from './pages/products-component/products-component';
import { Toolbar } from 'primeng/toolbar';
import { SharedModule } from '../../shared/shared-module';
import { CategoriasComponent } from './pages/categorias-component/categorias-component';

@NgModule({
  declarations: [ProductsComponent, CategoriasComponent],
  imports: [CommonModule, DashboardRoutingModule, Toolbar, SharedModule],
})
export class DashboardModule {}
