import { Component } from '@angular/core';

import { BaseResourceListComponent } from '../../../shared/componentes/base-resource-list/base-resource-list.component';

import { Categoria } from '../compartilhada/categoria.model';
import { CategoriaService } from '../compartilhada/categoria.service';

@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.css']
})
export class ListaCategoriasComponent extends BaseResourceListComponent<Categoria> {

  constructor(protected categoriaService: CategoriaService) {
    super(categoriaService);
   }
}
