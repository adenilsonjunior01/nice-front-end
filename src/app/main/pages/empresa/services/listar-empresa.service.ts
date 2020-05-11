import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { throwError, Observable } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListarEmpresaService {
  private readonly API_URL = `${environment.apiAuthentication}`;
  private readonly headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  });

  constructor(
    private http: HttpClient
  ) { }

  public getAllEmpresas(params: HttpParams): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/empresa`, { headers: this.headers, params })
    .pipe(
      catchError(err => this.handleError(err)),
      map((response) => {
        const totalElements = response.total;
        const empresas = response.data;

        const results = {
          totalElements,
          empresas
        }
        return results;
      }),
      take(1));
  }

  public getAllEmpresasPorStatus(status: any): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/empresa${status}`, { headers: this.headers })
    .pipe(
      catchError(err => this.handleError(err)),
      take(1));
  }

  public alterarStatusEmpresa(idUser: any): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/user/trocaStatus/${idUser}`, { headers: this.headers }).pipe(
      catchError(err => this.handleError(err)),
      take(1));
  }

  public ativarInativarEmpresa(id: any): Observable<any> {
    const body = {};
    return this.http.patch(`${this.API_URL}/empresa/${id}`, body, { headers: this.headers }).pipe(
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
}
