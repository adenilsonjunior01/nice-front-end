import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistroColaboradorService {

  constructor() { }

  public grauDeEscolaridade(): Array<object> {
   return [
      { label: 'Ensino Fundamental', value: 1},
      { label: 'Ensino Médio', value: 2},
      { label: 'Ensino Superior Completo', value: 3},
      { label: 'Ensino Superior Incompleto', value: 4}
    ];
  }
}
