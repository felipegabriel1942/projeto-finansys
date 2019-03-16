import { Component, OnInit } from '@angular/core';

import { Categoria } from '../compartilhada/categoria.model';
import { CategoriaService } from '../compartilhada/categoria.service';

@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.css']
})
export class ListaCategoriasComponent implements OnInit {

  categorias: Categoria[] = [];
  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.categoriaService.getAll().subscribe(
      (categorias) => {this.categorias = categorias; },
      (error) => {alert('Erro ao carregar a lista'); }
    );
  }

  deletarCategoria(categoria: Categoria) {
    const mustDelete = confirm('Deseja realmente excluir este item?');
    if (mustDelete) {
      this.categoriaService.delete(categoria.id).subscribe(
        () => this.categorias = this.categorias.filter(element => element !== categoria),
        () => alert('Erro ao tentar excluir')
      );
    }
  }
}
