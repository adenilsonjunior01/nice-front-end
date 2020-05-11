import { Component, OnInit } from '@angular/core';
import { ListarColaboradoresService } from '../../services/listar-colaboradores/listar-colaboradores.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SweetAlertComponent } from '../../../../../theme/shared/components/sweet-alert/sweet-alert.component';
import { PaginationConfig } from '../../../../config/pagination-config';

@Component({
  selector: 'app-listar-colaboradores',
  templateUrl: './listar-colaboradores.component.html',
  styleUrls: ['./listar-colaboradores.component.scss']
})
export class ListarColaboradoresComponent implements OnInit {
  colaboradores: any[] = [];
  formColaborador: FormGroup;
  toast = new SweetAlertComponent;

  filtro = new PaginationConfig;
  currentPage: any;
  totalItems: any;
  edituser: any;
  modalRef: BsModalRef;
  status: any[] = [];

  constructor(
    private service: ListarColaboradoresService,
    private modalService: BsModalService,
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    this.status = this.service.statusColaborador();
    this.formColaborador = this._fb.group({
      status_cadastro: [0]
    });
    this.getColaboradores();
  }

  public pageChanged(event: number) {
    // this.getUsuarios(event - 1);
  }

  private setCurrentPage(page: number): void {
    this.currentPage = page + 1;
  }

  public getColaboradores() {
    this.service.getColaboradores(this.formColaborador.value.status_cadastro).subscribe(
      response => {
        this.colaboradores = response.data;
      },
      err => {
        this.toast.toastCustom('error', 'Nenhum registro encontrado');
      }
    )
  }

  public sweetConfirm(idStatus: any, idUser: any) {
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
      if (result.value === true) {
        if (idStatus === 0) {
           return this.ativarColaborador(idUser);
        } else if (idStatus === 1) {
          return this.inativarColaborador(idUser);
        } else if (idStatus === 2) {
          return this.ativarColaborador(idUser);
        } else {
          return this.recusarCadastroColaborador(idUser);
        }
      }
    })
  }

  private ativarColaborador(id: any): void {
    this.service.ativarColaborador(id).subscribe(
      response => {
        Swal.fire(
          'Ativado!',
          'Colaborador ativado com sucesso.',
          'success'
        );
        this.getColaboradores();
      },
      err => {
        this.toast.toastCustom('error', 'Erro ao desativar usuário');
      }
    );
  }

  private inativarColaborador(id: any): void {
    this.service.inativarColaboradorrador(id).subscribe(
      response => {
        Swal.fire(
          'Inativado!',
          'Colaborador inativado com sucesso.',
          'success'
        );
        this.getColaboradores();
      },
      err => {
        this.toast.toastCustom('error', 'Erro ao desativar colaborador');
      }
    );
  }


  private recusarCadastroColaborador(id: any): void {
    this.service.recusarCadastroColaborador(id).subscribe(
      response => {
        Swal.fire(
          'Recusado!',
          'Cadastro do colaborador recusado com sucesso.',
          'success'
        );
        this.getColaboradores();
      },
      err => {
        this.toast.toastCustom('error', 'Erro ao recursar cadastro colaborador');
      }
    );
  }
}
