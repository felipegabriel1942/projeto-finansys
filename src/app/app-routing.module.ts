import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'categorias', loadChildren: './pages/categorias/categorias.module#CategoriasModule'},
  {path: 'lancamentos', loadChildren: './pages/entradas/entradas.module#EntradasModule'},
  {path: 'relatorios', loadChildren: './pages/reports/reports.module#ReportsModule'},
  {path: '', redirectTo: '/relatorios', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
