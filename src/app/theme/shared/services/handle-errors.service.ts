import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorsService {

  constructor(public route: Router) { }

  public requestErrors(status): any {
    switch(status) {
      case 400: return 'Formulário inválido, preencha os campos corretamente.';
      case 404: return 'Nenhum registro encontrado.';
      case 401: return this.resetLocalStorage();
      case 403: return 'Permissão negada.'
      case 500: return 'Erro no servidor, contate o suporte.';
    }
  }

  public resetLocalStorage(): void {
    localStorage.clear();
    this.route.navigateByUrl('/auth/login');
  }
}
