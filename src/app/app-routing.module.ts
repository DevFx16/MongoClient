import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'Inicio', loadChildren: './Pages/inicio/inicio.module#InicioPageModule' },
  { path: 'Agregar', loadChildren: './Pages/agregar/agregar.module#AgregarPageModule' },
  { path: 'Datos', loadChildren: './Pages/datos/datos.module#DatosPageModule' },
  { path: 'Editor', loadChildren: './Pages/editor/editor.module#EditorPageModule' },
  { path: '**', redirectTo: 'Inicio'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
