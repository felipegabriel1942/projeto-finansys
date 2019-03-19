import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';

import { Entrada } from './entrada.model';


@Injectable({
  providedIn: 'root'
})
export class EntradaService {

  private apiPath: string = 'api/entradas';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Entrada[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntradas)
    );
  }

  getById(id: number): Observable<Entrada> {
    const url = `${this.apiPath}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntrada)
    );
  }

  create(entrada: Entrada): Observable<Entrada> {
    return this.http.post(this.apiPath, entrada).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntrada)
    );
  }

  update(entrada: Entrada): Observable<Entrada> {
    const url = `${this.apiPath}/${entrada.id}`;
    return this.http.put(url, entrada).pipe(
      catchError(this.handleError),
      map(() => entrada)
    );
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  // metodos privados
  private jsonDataToEntradas(jsonData: any[]): Entrada[] {
    const entradas: Entrada[] = [];
    jsonData.forEach(element => {
      const entrada = Object.assign(new Entrada(), element);
      entradas.push(entrada);
    });

    return entradas;
  }

  private jsonDataToEntrada(jsonData: any): Entrada {
    return Object.assign(new Entrada(), jsonData);
  }

  private handleError(error: any): Observable<any> {
    console.log('ERRO NA REQUISIÇÃO =>', error);
    return throwError(error);
  }
}
