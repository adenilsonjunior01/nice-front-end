import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistroColaboradorService {
  private readonly API_URL = `${environment.apiAuthentication}`;
  private readonly headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  });

  constructor(private _http: HttpClient) { }

  public cadastroColaborador(obj: any): Observable<any> {
    return this._http.post<any>(`${this.API_URL}/colaborador`, obj, { headers: this.headers }).pipe(
      catchError(err => this.handleError(err)),
      take(1));
  }

  public grauDeEscolaridade(): Array<object> {
   return [
      { label: 'Ensino Fundamental', value: 1},
      { label: 'Ensino Médio', value: 2},
      { label: 'Ensino Superior Completo', value: 3},
      { label: 'Ensino Superior Incompleto', value: 4}
    ];
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
