import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Categoria } from '../../categorias/compartilhada/categoria.model';
import { CategoriaService } from '../../categorias/compartilhada/categoria.service';

import { Entrada } from '../../entradas/compartilhada/entrada.model';
import { EntradaService } from '../../entradas/compartilhada/entrada.service';

import currencyFormatter from 'currency-formatter';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  totalDespesas: any = 0;
  totalReceitas: any = 0;
  saldo: any = 0;

  despesaChartData: any;
  receitaChartData: any;

  chartOptions = {
    scales: {
      yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };

  categorias: Categoria[] = [];
  entradas: Entrada[] = [];

  @ViewChild('mes') mes: ElementRef = null;
  @ViewChild('ano') ano: ElementRef = null;
  

  constructor(private entradaService: EntradaService, private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.categoriaService.getAll().subscribe(
      categorias => this.categorias = categorias);
  }

  gerarRelatorios() {
    const mes = this.mes.nativeElement.value;
    const ano = this.ano.nativeElement.value;

    if (!mes || !ano) {
      alert('Você precisa selecionar o Mês e o Ano para gerar os relatórios')
    } else {
      this.entradaService.getByMesEAno(mes, ano).subscribe(
        this.setValues.bind(this)
      );
    }
  }

  private setValues(entradas: Entrada[]) {
    this.entradas = entradas;
    this.calcularSaldo();
    this.setChartData();
  }

  private calcularSaldo() {
    let totalDespesas = 0;
    let totalReceitas = 0;

    this.entradas.forEach(
      entrada => {
        if(entrada.tipo == 'receita') {
          totalReceitas += currencyFormatter.unformat(entrada.valor, { code: 'BRL'}); 
        } else {
          totalDespesas += currencyFormatter.unformat(entrada.valor, { code: 'BRL'}); 
        }
      }
    );

    this.totalDespesas = currencyFormatter.format(totalDespesas, { code: 'BRL'});
    this.totalReceitas = currencyFormatter.format(totalReceitas, { code: 'BRL'});
    this.saldo = currencyFormatter.format(totalReceitas - totalDespesas, { code: 'BRL'});
  }

  private setChartData() {
    this.receitaChartData = this.getChartData('receita','Gráfico de receitas','#9ccc65')
    this.despesaChartData = this.getChartData('despesa','Gráfico de despesas','#e03131')
  }

  private getChartData(entradaTipo: string, titulo: string, cor: string) {
    const chartData = [];

    this.categorias.forEach(categoria => {
      //filtrando lançamentos pela categoria e tipo
      const entradasFiltradas = this.entradas.filter(
        entrada => (entrada.categoriaId == categoria.id) && (entrada.tipo == entradaTipo)
      );

      //se forem encontradas entradas então some e adicione ao chart data
      if(entradasFiltradas.length > 0) {
        const totalValor = entradasFiltradas.reduce(
          (total, entrada) => total + currencyFormatter.unformat(entrada.valor, { code: 'BRL'}), 0
        )
        chartData.push({
          nomeCategoria: categoria.nome,
          totalValor: totalValor
        })
      }
    });

     return {
      labels: chartData.map(item => item.nomeCategoria),
      datasets: [{
        label: titulo,
        backgroundColor: cor,
        data: chartData.map(item => item.totalValor)
      }]
    }
  }

}
