import { Injectable, Injector } from '@angular/core';

import { Categoria } from './categoria.model';

import { BaseResourceService } from '../../../shared/servicos/base-resource.service';



@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends BaseResourceService<Categoria> {

  constructor(protected injector: Injector) {
    super('api/categorias', injector, Categoria.fromJson);
   }
}
