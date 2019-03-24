import { Injectable, Injector } from '@angular/core';


import { Entrada } from './entrada.model';
import { CategoriaService } from '../../categorias/compartilhada/categoria.service';
import { BaseResourceService } from '../../../shared/servicos/base-resource.service';

import { flatMap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EntradaService extends BaseResourceService<Entrada> {

  constructor(protected injector: Injector,
              private categoriaService: CategoriaService) {
    super('api/entradas', injector, Entrada.fromJson);
  }

  create(entrada: Entrada): Observable<Entrada> {
    return this.setCategoriaAndSendToService(entrada, super.create.bind(this));
  }

  update(entrada: Entrada): Observable<Entrada> {
    return this.setCategoriaAndSendToService(entrada, super.update.bind(this));
  }

  private setCategoriaAndSendToService(entrada: Entrada, sendFn: any): Observable<Entrada> {
    // FlatMap utilizado para agregar observables
    // Provavelmente só utilizado porcausa do in-memory-database-api
    return this.categoriaService.getById(entrada.categoriaId).pipe(
      flatMap(categoria => {
       entrada.categoria = categoria;
       return sendFn(entrada);
      }),
      catchError(this.handleError)
     );
  }
}
