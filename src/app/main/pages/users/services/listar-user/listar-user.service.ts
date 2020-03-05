import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../../interfaces/user';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SweetAlertComponent } from '../../../../../theme/shared/components/sweet-alert/sweet-alert.component';
import { catchError, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListarUserService {
  private readonly API_USER = `${environment.apiAuthentication}`;
  private readonly headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    'Content-Type': 'application/json'
  });
  private toast = new SweetAlertComponent();

  constructor(private http: HttpClient) { }

  public getUserById(id: any): Observable<User> {
    return this.http.get<any>(`${this.API_USER}`, { headers: this.headers})
    .pipe(
      catchError(err => this.handleError(err)),
      take(1));
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

  public handleErrorStatus(errorResponse: HttpErrorResponse, message?: string) {
    switch (errorResponse.status) {
      case 400: return this.toast.toastCustom('warning', 'Formulário inválido. Tente novamente.');
      case 404: return this.toast.toastCustom('warning', 'Nenhum registro encontrado');
      case 401: return this.toast.toastCustom('warning', 'Você não possui autorização para continuar.');
      case 500: return this.toast.toastCustom('error', 'Erro na comunicação com o servidor, contate a equipe de Desenvolvimento.');
      default: return this.toast.toastCustom('error', 'Erro na comunicação com o servidor, contate a equipe de Desenvolvimento.');
    }
  }
}
