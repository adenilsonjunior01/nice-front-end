import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistroEmpresaService {

  constructor() { }

  public getEmpresas(): Array<object> {
    return [
       { label: 'Empresa 1', value: 1},
       { label: 'Empresa 2', value: 2},
       { label: 'Empresa 3', value: 3},
       { label: 'Empresa 5', value: 4}
     ];
   }
}
