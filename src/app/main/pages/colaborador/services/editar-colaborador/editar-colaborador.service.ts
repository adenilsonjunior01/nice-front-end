import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpErrorResponse, HttpClient, HttpResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EditarColaboradorService {
  private readonly API_URL = `${environment.apiAuthentication}`;
  private readonly headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  });

  constructor(
    private _http: HttpClient
  ) { }

  public getColaboradorId(id: any): Observable<any> {
    return this._http.get<any>(`${this.API_URL}/colaborador/${id}`, { headers: this.headers}).pipe(
      catchError(err => this.handleError(err)),
      take(1));
  }

  public atualizarColaborador(obj: any, idColaborador: any): Observable<any> {
    return this._http.put<any>(`${this.API_URL}/colaborador/${idColaborador}`, obj, { headers: this.headers }).pipe(
      catchError(err => this.handleError(err)),
      take(1));
  }

  public excluirAnexo(idAnexo: any): Observable<any> {
    return this._http.delete<any>(`${this.API_URL}/anexo/${idAnexo}`, { headers: this.headers }).pipe(
      catchError(err => this.handleError(err)),
      take(1));
  }

  public downloadAnexo(idAnexo: any): Observable<HttpResponse<Blob>> {
    return this._http.get<any>(`${this.API_URL}/anexo/download/${idAnexo}`, { headers: this.headers, responseType: 'blob' as 'json' }).pipe(
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

  // DOWNLOAD
  public handleFile(resp: any, fileName: string) {
    const file = new Blob([resp], {
      type: resp.type
    });

    // IE
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(file);
      return;
    }

    const blob = window.URL.createObjectURL(file);

    const link = document.createElement('a');
    link.href = blob;
    link.download = fileName;

    //link.click();
    link.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    }));

    // firefox
    setTimeout(() => {
      window.URL.revokeObjectURL(blob);
      link.remove();
    }, 200);
  }
}
