import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ListarUserService } from '../services/listar-user/listar-user.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-listar-user',
  templateUrl: './listar-user.component.html',
  styleUrls: ['./listar-user.component.scss']
})
export class ListarUserComponent implements OnInit {
  formLista: FormGroup;

  empresas: Array<any>;
  perfil: Array<any>;
  usuarios: Array<any>;

  constructor(
    private fb: FormBuilder,
    private service: ListarUserService
  ) { }

  ngOnInit() {
    this.formularioLista();
  }

  private formularioLista(): void {
    this.formLista = this.fb.group({
      nmUser: [null],
      idPerfil: [null],
      idEmpresa: [null],
      dsLogin: [null],
      status: [null]
    });
  }

  public getUsuarios(): void {
    const searchParams = this.createSearchParams(this.formLista.value);

  }

  private createSearchParams(param: any): HttpParams {
    let searchParams = new HttpParams();

    if (param.idPerfil !== null && param.idPerfil !== '' && param.idPerfil !== undefined) {
      searchParams = searchParams.set('idPerfil', param.idPerfil);
    }

    if (param.idEmpresa !== null && param.idEmpresa !== '' && param.idEmpresa !== undefined) {
      searchParams = searchParams.set('idEmpresa', param.idEmpresa);
    }

    if (param.dsLogin !== null && param.dsLogin !== '' && param.dsLogin !== undefined) {
      searchParams = searchParams.set('dsLogin', param.dsLogin);
    }

    if (param.nmUser !== null && param.nmUser !== '' && param.nmUser !== undefined) {
      searchParams = searchParams.set('nmUser', param.nmUser);
    }

    if (param.status !== null && param.status !== '' && param.status !== undefined) {
      searchParams = searchParams.set('status', param.status);
    }

    return searchParams;
  }

  public clearForm(): void {
    this.formLista.reset();
  }

}
