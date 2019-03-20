import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EntradasRoutingModule } from './entradas-routing.module';
import { ListaEntradasComponent } from './lista-entradas/lista-entradas.component';
import { FormularioEntradasComponent } from './formulario-entradas/formulario-entradas.component';

import { CalendarModule } from 'primeng/calendar';
import { IMaskModule } from 'angular-imask';

@NgModule({
  declarations: [
    ListaEntradasComponent,
    FormularioEntradasComponent,
  ],
  imports: [
    CommonModule,
    EntradasRoutingModule,
    ReactiveFormsModule,
    CalendarModule,
    IMaskModule
  ]
})
export class EntradasModule { }
