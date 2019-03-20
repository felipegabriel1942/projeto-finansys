import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaEntradasComponent } from './lista-entradas/lista-entradas.component';
import { FormularioEntradasComponent } from './formulario-entradas/formulario-entradas.component';

const routes: Routes = [
  { path: '', component: ListaEntradasComponent},
  { path: 'criar', component: FormularioEntradasComponent},
  { path: ':id/editar', component: FormularioEntradasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntradasRoutingModule { }
