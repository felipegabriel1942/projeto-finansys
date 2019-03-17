import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Categoria } from '../compartilhada/categoria.model';
import { CategoriaService } from '../compartilhada/categoria.service';

import { switchMap } from 'rxjs/operators';

import toastr from 'toastr';


@Component({
  selector: 'app-formulario-categorias',
  templateUrl: './formulario-categorias.component.html',
  styleUrls: ['./formulario-categorias.component.css']
})
export class FormularioCategoriasComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  categoryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  categoria: Categoria = new Categoria();

  constructor(
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildCategoriaForm();
    this.loadCategoria();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  private setCurrentAction() {
    if (this.route.snapshot.url[0].path === 'criar') {
      this.currentAction = 'criar';
    } else {
      this.currentAction = 'editar';
    }
  }

  private buildCategoriaForm() {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(2)]],
      descricao: [null]
    });
  }

  private loadCategoria() {
    if (this.currentAction === 'editar') {
      this.route.paramMap.pipe(
        switchMap(params => this.categoriaService.getById(+params.get('id')))
      ).subscribe(
        (categoria) => {
          this.categoria = categoria;
          this.categoryForm.patchValue(categoria); // Passa os dados da categoria carregada para o categoria form
        },
        (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
      );
    }
  }

  private setPageTitle() {
    if (this.currentAction === 'criar') {
      this.pageTitle = 'Cadastro de nova categoria';
    } else {
      const categoriaName = this.categoria.nome || '';
      this.pageTitle = 'Editando categoria: ' + categoriaName;
    }
  }
}
