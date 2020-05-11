import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { catchError, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistroEmpresaService {
  private readonly API_URL = `${environment.apiAuthentication}`;
  private readonly headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  public submitEmpresa(obj: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/empresa`, obj, {headers: this.headers}).pipe(
      catchError(err => this.handleError(err)),
      take(1));
  }

  public getEmpresasAtivas(): Observable<any>{
    return this.http.get<any>(`${this.API_URL}/empresa/porStatus/1`, { headers: this.headers}).pipe(
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

   public toFormData(file: any[]): FormData {
    const formData = new FormData();
    formData.append('anexo', new Blob([file[0]]))
    return formData;
   }

  public uploadAnexo(formData: any): Observable<any> {
    const headers = new HttpHeaders({Authorization: `Bearer ${localStorage.getItem('token')}`});
    return this.http.post<any>(`${this.API_URL}/anexo`, formData, { headers }).pipe(
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
