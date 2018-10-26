import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '**', redirectTo: 'Inicio', pathMatch: 'full' },
  { path: 'Inicio', loadChildren: './Pages/inicio/inicio.module#InicioPageModule' },
  { path: 'Agregar', loadChildren: './Pages/agregar/agregar.module#AgregarPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
