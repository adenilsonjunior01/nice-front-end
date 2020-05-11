import { Component, OnInit, TemplateRef } from '@angular/core';
import { SweetAlertComponent } from '../../../../../theme/shared/components/sweet-alert/sweet-alert.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { ListarEmpresaService } from '../../services/listar-empresa.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PaginationConfig } from '../../../../config/pagination-config';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  private toast = new SweetAlertComponent();
  formList: FormGroup;
  filtro = new PaginationConfig;
  empresas: Array<any>;
  currentPage: any;
  totalElements: any;
  dadosEmpresa: any;
  modalRef: BsModalRef

  constructor(
    private fb: FormBuilder,
    private service: ListarEmpresaService,
    private modalService: BsModalService
    ) { }

  ngOnInit() {
    this.formList = this.fb.group({
      status: [null]
    });
    this.verificaSePossuiStatus();
  }

  public getEmpresas(pagina = 0) {
    const params = this.createSearchParams(this.formList.value);
    this.filtro.page = pagina;
    this.setCurrentPage(pagina);
    this.service.getAllEmpresas(params).subscribe(
      response => {
      this.empresas = response.empresas;
      this.totalElements = response.totalElements;
      }, err => {
        if (err.status === 400) {
          return this.toast.toastCustom('warning', 'Nenhum registro encontrado.');
        }
        this.toast.toastCustom('error', 'Erro ao buscar Empresas');
      }
    );

  }

  public getEmpresasPorStatus() {
    const status = this.formList.value;
    this.service.getAllEmpresasPorStatus(status).subscribe(
      response => {
      this.empresas = response;
      }, err => {
        if (err.status === 400) {
          return this.toast.toastCustom('warning', 'Nenhum registro encontrado.');
        }
        this.toast.toastCustom('error', 'Erro ao buscar Empresas');
      }
    )
  }

  public verificaSePossuiStatus() {
    if (this.formList.value.status !== null && this.formList.value.status !== '' && this.formList.value.status !== undefined)
      this.getEmpresasPorStatus();
    this.getEmpresas();
  }

  private createSearchParams(param?: any): HttpParams {
    let searchParams = new HttpParams();
    searchParams = searchParams.set('size', this.filtro.size.toString());
    // searchParams = searchParams.set('page', this.filtro.page.toString());
    return searchParams;
  }

  public alterarStatusEmpresa(idUser: any) {
    this.service.alterarStatusEmpresa(idUser).subscribe(
      response => {
        Swal.fire(
          'Inativado!',
          'Usuário inativado com sucesso.',
          'success'
        );
        this.verificaSePossuiStatus();
      }, err => {
        this.toast.toastCustom('error', 'Erro ao desativar usuário');
      }
    )
  }

  public  sweetConfirm(id: any) {
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
        return this.inativarEmpresa(id);
      }
    })
  }

  public inativarEmpresa(id) {
    this.service.ativarInativarEmpresa(id).subscribe(
      response => {
        Swal.fire(
          'Inativado!',
          'Empresa inativada com sucesso.',
          'success'
        );
        this.getEmpresas();
      }
    )
  }

  public pageChanged(event: number) {
    this.getEmpresas(event - 1);
  }


  public editarEmpresa(empresa: any, template: TemplateRef<any>) {
    this.dadosEmpresa = empresa;
    this.openModal(template)
  }

  private setCurrentPage(page: number): void {
    this.currentPage = page + 1;
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { keyboard: false, class: 'modal-lg', });
  }

  public recebeEvento(event) {
  }

}
