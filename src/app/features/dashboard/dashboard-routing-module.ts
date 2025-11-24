import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './pages/products-component/products-component';
import { CategoriasComponent } from './pages/categorias-component/categorias-component';
import { PosComponent } from './pages/pos-component/pos-component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'productos', component: ProductsComponent },
      { path: 'categorias', component: CategoriasComponent },
      { path: 'pos', component: PosComponent },
      // Puedes agregar más rutas aquí (ej: 'reportes')
      { path: '', redirectTo: 'productos', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
