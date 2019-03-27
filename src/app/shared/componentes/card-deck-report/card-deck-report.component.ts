import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-deck-report',
  templateUrl: './card-deck-report.component.html',
  styleUrls: ['./card-deck-report.component.css']
})
export class CardDeckReportComponent implements OnInit {

  @Input('titulo') tituloCard: string;
  @Input('cor-fundo') corFundo: string;
  @Input('valor') valor: string;

  constructor() { }

  ngOnInit() {
  }

}
