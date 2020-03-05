import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/user';
import { ListarUserService } from '../services/listar-user/listar-user.service';

@Injectable({
  providedIn: 'root'
})
export class ResolveEditUserGuard implements Resolve<User> {

  constructor(private service: ListarUserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User | Observable<User> | Promise<User> {
    if (route.params && route.params.id) {
      return this.service.getUserById(route.params.id);
    }
    return of({
      nome: null,
      cep: null,
      cd_cidade: null,
      cd_estado: null,
      sexo: null,
      idEmpresa: null,
      idPerfil: null,
      email: null,
      senha: null,
      telefone: null,
      login: null,
      endereco: null,
    });
  }
}
