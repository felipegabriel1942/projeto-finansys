import { Component } from '@angular/core';

import { BaseResourceListComponent } from '../../../shared/componentes/base-resource-list/base-resource-list.component';

import { Entrada } from '../compartilhada/entrada.model';
import { EntradaService } from '../compartilhada/entrada.service';

@Component({
  selector: 'app-lista-entradas',
  templateUrl: './lista-entradas.component.html',
  styleUrls: ['./lista-entradas.component.css']
})
export class ListaEntradasComponent extends BaseResourceListComponent<Entrada> {

  constructor(protected entradaService: EntradaService) {
    super(entradaService);
   }
}
