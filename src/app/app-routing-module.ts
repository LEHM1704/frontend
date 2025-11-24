import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    // Lazy Loading: Carga el módulo hijo solo cuando se necesita
    loadChildren: () => import('./features/auth/auth-module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    canActivate: [AuthGuard], // Protege las rutas con el guardia de autenticación
    loadChildren: () => import('./features/features-module').then((m) => m.FeaturesModule),
  },
  {
    path: '',
    redirectTo: 'auth/login', // Redirige por defecto al login
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'auth/login', // Cualquier ruta desconocida va al login
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
