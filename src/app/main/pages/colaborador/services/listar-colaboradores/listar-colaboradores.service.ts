import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListarColaboradoresService {
  private readonly API_URL = `${environment.apiAuthentication}`;
  private readonly headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  });

  constructor(private _http: HttpClient) { }

  public getColaboradores(status: any): Observable<any> {
    return this._http.get<any>(`${this.API_URL}/colaborador/porStatus/${status}`, { headers: this.headers }).pipe(
      catchError(err => this.handleError(err)),
      take(1));
  }

  public ativarColaborador(id: any): Observable<any> {
    return this._http.patch<any>(`${this.API_URL}/colaborador/ativar/${id}`, {}, { headers: this.headers }).pipe(
      catchError(err => this.handleError(err)),
      take(1));
  }

  public inativarColaboradorrador(id: any): Observable<any> {
    return this._http.patch<any>(`${this.API_URL}/colaborador/inativar/${id}`, {}, { headers: this.headers }).pipe(
      catchError(err => this.handleError(err)),
      take(1));
  }

  public recusarCadastroColaborador(id: any): Observable<any> {
    return this._http.patch<any>(`${this.API_URL}/recusar/inativar/${id}`, {}, { headers: this.headers }).pipe(
      catchError(err => this.handleError(err)),
      take(1));
  }

  public statusColaborador(): Array<object> {
    return [
      { value: 0, label: 'Aguardando Validação' },
      { value: 1, label: 'Ativo' },
      { value: 2, label: 'Inativo' },
      { value: 3, label: 'Cadastro Recusado' },
    ]
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Error do client: ', errorResponse.error.message);
      return throwError(errorResponse.error.message);
    } else {
      console.error('Erro na comunicação com o servidor: ', errorResponse);
      return throwError(errorResponse);
    }
  }

}
