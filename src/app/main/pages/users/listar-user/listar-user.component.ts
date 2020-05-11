import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ListarUserService, ListagemUsuarios } from '../services/listar-user/listar-user.service';
import { HttpParams } from '@angular/common/http';
import { SweetAlertComponent } from '../../../../theme/shared/components/sweet-alert/sweet-alert.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-listar-user',
  templateUrl: './listar-user.component.html',
  styleUrls: ['./listar-user.component.scss']
})
export class ListarUserComponent implements OnInit {
  private toast = new SweetAlertComponent();
  usuarios: Array<any>;
  filtro = new ListagemUsuarios;
  currentPage: any;
  totalElements: any;
  edituser: any;

  modalRef: BsModalRef;
  constructor(
    private fb: FormBuilder,
    private service: ListarUserService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.getUsuarios();
  }

  public getUsuarios(pagina = 0): void {
    const searchParams = this.createSearchParams();
    this.resetUsers();
    this.filtro.page = pagina;
    this.setCurrentPage(pagina);
    this.service.getAllUsers(searchParams).subscribe(
      (response: any) => {
        this.usuarios = response.users;
        this.totalElements = response.totalElements;
      }
    )
  }

  private resetUsers() {
    this.usuarios = [];
  }

  public pageChanged(event: number) {
    this.getUsuarios(event - 1);
  }

  private setCurrentPage(page: number): void {
    this.currentPage = page + 1;
  }

  public nomePerfil(id: any): string {
    switch(id) {
      case 1: return 'ADMINISTRADOR';
      case 2: return 'COLABORADOR NICE';
      case 3: return 'CLIENTE';
      default: return 'CLIENTE';
    }
  }

  private createSearchParams(param?: any): HttpParams {
    let searchParams = new HttpParams();
    searchParams = searchParams.set('size', this.filtro.size.toString());
    // searchParams = searchParams.set('page', this.filtro.page.toString());
    return searchParams;
  }

  public getValueStatus(value): string {
    switch(value){
      case 1: return 'Ativo';
      case 2: return 'Inativo';
      case 3: return'Cadastro Recusado';
      default: return 'Em análise';
    }
  }

  public editarUsuario(user: any, template: TemplateRef<any>) {
    this.edituser = user;
    this.openModal(template)
  }

  public inativarUser(idUser: any) {
    this.service.inativarUser(idUser).subscribe(
      response => {
        Swal.fire(
          'Inativado!',
          'Usuário inativado com sucesso.',
          'success'
        );
        this.getUsuarios();
      }, err => {
        this.toast.toastCustom('error', 'Erro ao desativar usuário');
      }
    )
  }

  public sweetConfirm(idUser: any) {
    Swal.fire({
      title: 'Tem certeza?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        return this.inativarUser(idUser);
      }
    })
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { keyboard: false, backdrop: 'static', class: 'modal-lg', });
  }
}
