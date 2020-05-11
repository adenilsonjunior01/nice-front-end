import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UpldateUserService {
  private readonly API_SUBMIT = `${environment.apiAuthentication}`;
  private readonly headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  });

  constructor(private _http: HttpClient) { }

  public uploadUser(obj: any, id: any): Observable<any> {
    return this._http.put<any>(`${this.API_SUBMIT}/user/${id}`, obj, { headers: this.headers }).pipe(
      catchError(err => this.handleError(err)),
      take(1));
  }

  public getUserId(id: any):Observable<any> {
    return this._http.get<any>(`${this.API_SUBMIT}/user/${id}`, { headers: this.headers }).pipe(
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
