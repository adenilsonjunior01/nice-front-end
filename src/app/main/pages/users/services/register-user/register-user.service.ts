import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { tap, take, catchError } from 'rxjs/operators';
import { SweetAlertComponent } from '../../../../../theme/shared/components/sweet-alert/sweet-alert.component';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {
  private readonly API_SUBMIT = `${environment.apiAuthentication}`;
  private readonly headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  });

  private toast = new SweetAlertComponent();
  constructor(
     private http: HttpClient
  ) { }

  public submitNovoUsuario(usuario: any): Observable<any> {

    return this.http.post<any>(`${this.API_SUBMIT}/user/save`, usuario, {headers: this.headers})
      .pipe(
        catchError(err => this.handleError(err)),
        take(1));
  }

  /**
   * Retorn todas as empresas cadastrada no sistema
    * public getEmpresas(): Observable<any> {
  }*/
  public getEmpresas(): Array<object> {
    // TEMP
    return [
      { value: 1, name: 'Empresa 1'},
      { value: 2, name: 'Empresa 2'},
      { value: 3, name: 'Empresa 3'},
    ];
  }

   /**
   * Retorna todos os perfils de acesso ao sistema.
   */
  public getPerfils(): Array<object> {
    return [
      { value: 1, name: 'ADMINISTRADOR'},
      { value: 2, name: 'COLABORADOR NICE'},
      { value: 3, name: 'CLIENTE'}
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
