import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaEntradasComponent } from './lista-entradas/lista-entradas.component';

const routes: Routes = [
  { path: '', component: ListaEntradasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntradasRoutingModule { }
