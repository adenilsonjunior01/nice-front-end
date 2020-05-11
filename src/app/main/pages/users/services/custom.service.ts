import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomService {
  private readonly API_VIACEP = `https://viacep.com.br/ws/`

  constructor(private http: HttpClient) { }

  public getDatas(cep: any): Observable<any> {
    return this.http.get<any>(`${this.API_VIACEP}${cep}/json`)
      .pipe(
        take(1));
  }
}
