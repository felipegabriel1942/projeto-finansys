import { Component, OnInit } from '@angular/core';

import { Entrada } from '../compartilhada/entrada.model';
import { EntradaService } from '../compartilhada/entrada.service';

@Component({
  selector: 'app-lista-entradas',
  templateUrl: './lista-entradas.component.html',
  styleUrls: ['./lista-entradas.component.css']
})
export class ListaEntradasComponent implements OnInit {

  entradas: Entrada[] = [];
  constructor(private entradaService: EntradaService) { }

  ngOnInit() {
    this.entradaService.getAll().subscribe(
      (entradas) => {this.entradas = entradas.sort((a, b) => b.id - a.id); },
      (error) => {alert('Erro ao carregar a lista'); }
    );
  }

  deletarEntrada(entrada: Entrada) {
    const mustDelete = confirm('Deseja realmente excluir este item?');
    if (mustDelete) {
      this.entradaService.delete(entrada.id).subscribe(
        () => this.entradas = this.entradas.filter(element => element !== entrada),
        () => alert('Erro ao tentar excluir')
      );
    }
  }
}
