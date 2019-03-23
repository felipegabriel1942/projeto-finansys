import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { ListaCategoriasComponent } from './lista-categorias/lista-categorias.component';
import { FormularioCategoriasComponent } from './formulario-categorias/formulario-categorias.component';

@NgModule({
  declarations: [ListaCategoriasComponent, FormularioCategoriasComponent],
  imports: [
    CategoriasRoutingModule,
    SharedModule
  ]
})
export class CategoriasModule { }
