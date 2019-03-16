import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { ListaCategoriasComponent } from './lista-categorias/lista-categorias.component';
import { FormularioCategoriasComponent } from './formulario-categorias/formulario-categorias.component';

@NgModule({
  declarations: [ListaCategoriasComponent, FormularioCategoriasComponent],
  imports: [
    CommonModule,
    CategoriasRoutingModule
  ]
})
export class CategoriasModule { }
