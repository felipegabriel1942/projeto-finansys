import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaCategoriasComponent } from './lista-categorias/lista-categorias.component';
import { FormularioCategoriasComponent } from './formulario-categorias/formulario-categorias.component';

const routes: Routes = [
  { path: '', component: ListaCategoriasComponent},
  { path: 'criar', component: FormularioCategoriasComponent},
  { path: ':id/editar', component: FormularioCategoriasComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
