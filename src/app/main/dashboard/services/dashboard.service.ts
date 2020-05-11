import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly API_URL = `${environment.apiAuthentication}`;
  private readonly headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  });

  constructor(private _http: HttpClient) { }

  public getDatasDashboard(): Observable<any> {
    return this._http.get<any>(`${this.API_URL}/dash/max`, { headers: this.headers}).pipe(
      catchError(err => this.handleError(err)),
      take(1));
  }

  public getTotalUsuarios(): Observable<any> {
    return this._http.get<any>(`${this.API_URL}/dash`, { headers: this.headers}).pipe(
      catchError(err => this.handleError(err)),
      take(1));
  }

  public getUltimosUsuarios(): Observable<any> {
    return this._http.get<any>(`${this.API_URL}/dash/last`, { headers: this.headers}).pipe(
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
