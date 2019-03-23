import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

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
    EntradasRoutingModule,
    CalendarModule,
    IMaskModule,
    SharedModule
  ]
})
export class EntradasModule { }
