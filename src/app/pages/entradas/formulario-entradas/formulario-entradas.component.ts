import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { Entrada } from '../compartilhada/entrada.model';
import { EntradaService } from '../compartilhada/entrada.service';

import { Categoria } from '../../categorias/compartilhada/categoria.model';
import { CategoriaService } from '../../categorias/compartilhada/categoria.service';
import { BaseResourceFormComponent } from '../../../shared/componentes/base-resource-form/base-resource-form.component';



@Component({
  selector: 'app-formulario-entradas',
  templateUrl: './formulario-entradas.component.html',
  styleUrls: ['./formulario-entradas.component.css']
})
export class FormularioEntradasComponent extends BaseResourceFormComponent<Entrada> implements OnInit {

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
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Ter', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qa', 'Qi', 'Se', 'Sa'],
    monthNames: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun','Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ],
    today: 'Hoje',
    clear: 'Limpar',
    dateFormat: 'mm/dd/yy'
  };

  constructor(
    protected entradaService: EntradaService,
    protected categoriaService: CategoriaService,
    protected injector: Injector
    ) {
      super(injector, new Entrada(), entradaService, Entrada.fromJson);
    }

   /*Caso necessite da classe filha ter um ngOnInit
    chamar o ngOnInit da classe pai com o super*/
  ngOnInit() {
    this.loadCategorias();
    super.ngOnInit();
  }

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

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
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

  protected loadCategorias() {
    this.categoriaService.getAll().subscribe(
      categorias => this.categorias = categorias
    );
  }

  protected creationPageTitle(): string {
    return 'Cadastro de Novo Lançamento';
  }

  protected editionPageTitle(): string {
    const nomeEntrada = this.resource.nome || '';
    return 'Editando lançamento: ' + nomeEntrada;
  }
}
