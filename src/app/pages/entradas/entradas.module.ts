import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntradasRoutingModule } from './entradas-routing.module';
import { ListaEntradasComponent } from './lista-entradas/lista-entradas.component';

@NgModule({
  declarations: [
    ListaEntradasComponent
  ],
  imports: [
    CommonModule,
    EntradasRoutingModule
  ]
})
export class EntradasModule { }
