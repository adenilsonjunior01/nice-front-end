import { environment } from '../../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { tap, take, catchError } from 'rxjs/operators';
import { SweetAlertComponent } from '../../../../../theme/shared/components/sweet-alert/sweet-alert.component';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Tokens } from '../../models/tokens';

@Injectable({
  providedIn: 'root'
})
export class AutheticationService {
  private readonly API_REQUEST_AUTHETICATION = `${environment.apiAuthentication}`;
  private readonly JWT_NAME_TOKEN = 'token';
  tokens = new Tokens();

  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  private jwt = new JwtHelperService();

  private toast = new SweetAlertComponent();

  constructor(
    private http: HttpClient,
    private route: Router
  ) { }

  public authentication(dados: any): Observable<any> {
    return this.http.post<{access_token: string}>(`${this.API_REQUEST_AUTHETICATION}/auth/login`, dados, {headers: this.headers})
      .pipe(
        catchError(error => this.handleError(error)),
        tap((resp: any) => {
          localStorage.setItem('token', resp.access_token);
        }),
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

  public logout(): void {
    localStorage.removeItem('token');
    this.route.navigateByUrl('/auth/login');
  }

  public decodeToken(): any {
    return this.jwt.decodeToken(localStorage.getItem('token'));
  }

  public tokenIsExperid(): any {
    const token = localStorage.getItem('token') && !this.jwt.isTokenExpired(localStorage.getItem('token'));
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  public refreshTokenIsPresent(): any {
    return localStorage.getItem('refresh_token');
  }

  public getJwtToken() {
    return localStorage.getItem('token');
  }

  public getUserNameInToken(): string {
    const tokenDecode = this.decodeToken();
    if (tokenDecode.nome !== null)
      return tokenDecode.nome;
    return
  }
  private getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  public refreshToken() {
    return this.http.post<any>(`${environment.apiAuthentication}/refresh`, {
      refreshToken: this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens.token);
    }));
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem('token', jwt);
  }

  public handleErrorStatus(errorResponse: HttpErrorResponse, message?: string) {
    switch (errorResponse.status) {
      case 400: return this.toast.toastCustom('warning', 'Formulário inválido. Tente novamente.');
      case 404: return this.toast.toastCustom('warning', 'Nenhum registro encontrado');
      case 401: return this.toast.toastCustom('error', 'Usuário ou senha inválidos');
      case 500: return this.toast.toastCustom('error', 'Erro na comunicação com o servidor, contate a equipe de Desenvolvimento.');
      default: return this.toast.toastCustom('error', 'Erro na comunicação com o servidor, contate a equipe de Desenvolvimento.');
    }
  }
}
