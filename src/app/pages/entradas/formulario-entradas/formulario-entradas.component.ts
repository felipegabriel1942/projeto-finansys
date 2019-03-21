import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Entrada } from '../compartilhada/entrada.model';
import { Categoria } from '../../categorias/compartilhada/categoria.model';
import { EntradaService } from '../compartilhada/entrada.service';

import { switchMap } from 'rxjs/operators';
import toastr from 'toastr';
import { CategoriaService } from '../../categorias/compartilhada/categoria.service';



@Component({
  selector: 'app-formulario-entradas',
  templateUrl: './formulario-entradas.component.html',
  styleUrls: ['./formulario-entradas.component.css']
})
export class FormularioEntradasComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  entradaForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  entrada: Entrada = new Entrada();
  categorias: Array<Categoria>;

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '.',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  };

  ptBR = {
    firstDayOfWeek: 0,
    dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
    dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Ter", "Sex", "Sab"],
    dayNamesMin: ["Do","Se","Te","Qa","Qi","Se","Sa"],
    monthNames: [ "Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro" ],
    monthNamesShort: [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun","Jul", "Ago", "Set", "Out", "Nov", "Dez" ],
    today: 'Hoje',
    clear: 'Limpar',
    dateFormat: 'mm/dd/yy'
  };

  get tipoOpcoes(): Array<any> {
    return Object.entries(Entrada.tipos).map(
      ([valor, texto]) => {
        return {
          texto: texto,
          valor: valor
        };
      }
    );
  }

  constructor(
    private entradaService: EntradaService,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildEntradaForm();
    this.loadEntrada();
    this.loadCategorias();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;
    if (this.currentAction === 'criar') {
      this.createEntrada();
    } else {
      this.updateEntrada();
    }
  }

  private setCurrentAction() {
    if (this.route.snapshot.url[0].path === 'criar') {
      this.currentAction = 'criar';
    } else {
      this.currentAction = 'editar';
    }
  }

  private buildEntradaForm() {
    this.entradaForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(2)]],
      descricao: [null],
      tipo: ['despesa', [Validators.required]],
      valor: [null, [Validators.required]],
      data: [null, [Validators.required]],
      pago: [true, [Validators.required]],
      categoriaId: [null, [Validators.required]],
    });
  }

  private loadEntrada() {
    if (this.currentAction === 'editar') {
      this.route.paramMap.pipe(
        switchMap(params => this.entradaService.getById(+params.get('id')))
      ).subscribe(
        (entrada) => {
          this.entrada = entrada;
          this.entradaForm.patchValue(entrada); // Passa os dados da entrada carregada para o entrada form
        },
        (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
      );
    }
  }

  private loadCategorias() {
    this.categoriaService.getAll().subscribe(
      categorias => this.categorias = categorias
    );
  }

  private setPageTitle() {
    if (this.currentAction === 'criar') {
      this.pageTitle = 'Cadastro de nova entrada';
    } else {
      const entradaName = this.entrada.nome || '';
      this.pageTitle = 'Editando entrada: ' + entradaName;
    }
  }

  private createEntrada() {
    const entrada: Entrada = Object.assign(new Entrada(), this.entradaForm.value);

    this.entradaService.create(entrada).subscribe(
      entrada => this.actionsForSuccess(entrada),
      error => this.actionsForError(error)
    );
  }

  private updateEntrada() {
    const entrada: Entrada = Object.assign(new Entrada(), this.entradaForm.value);

    this.entradaService.update(entrada).subscribe(
      entrada => this.actionsForSuccess(entrada),
      error => this.actionsForError(error)
    );

  }

  private actionsForSuccess(entrada: Entrada) {
    toastr.success('Solicitação processada com sucesso!');

    // Direciona a pagina de entrada e o skip não guarda no historico do navegador
    this.router.navigateByUrl('lancamentos', {skipLocationChange: true}).then(
      () => this.router.navigate(['lancamentos', entrada.id, 'editar'])
    );
  }

  private actionsForError(error) {
    toastr.error('Ocorreu um erro ao processar a sua solicitação!');
    this.submittingForm = false;

    // Pega o erro pelo tipo retornado pelo servidor
    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = ['Falha na comunicação o servidor. Por favor, tente mais tarde.'];
    }
  }
}
