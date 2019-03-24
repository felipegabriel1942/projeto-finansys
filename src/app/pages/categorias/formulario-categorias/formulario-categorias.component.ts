import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';

import { BaseResourceFormComponent } from '../../../shared/componentes/base-resource-form/base-resource-form.component';

import { Categoria } from '../compartilhada/categoria.model';
import { CategoriaService } from '../compartilhada/categoria.service';

@Component({
  selector: 'app-formulario-categorias',
  templateUrl: './formulario-categorias.component.html',
  styleUrls: ['./formulario-categorias.component.css']
})
export class FormularioCategoriasComponent extends BaseResourceFormComponent<Categoria> {

  constructor(protected categoriaService: CategoriaService,
              protected injector: Injector
    ) {
      super(injector, new Categoria(), categoriaService, Categoria.fromJson);
     }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(2)]],
      descricao: [null]
    });
  }

  protected creationPageTitle(): string {
    return 'Cadastro de Nova Categoria';
  }

  protected editionPageTitle(): string {
    const nomeCategoria = this.resource.nome || '';
    return 'Editando categoria: ' + nomeCategoria;
  }
}
