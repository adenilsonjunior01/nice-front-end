import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SweetAlertComponent } from '../../../../../theme/shared/components/sweet-alert/sweet-alert.component';
import { EditarEmpresaService } from '../../services/editar-empresa.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.scss']
})
export class EditarEmpresaComponent implements OnInit {
  @Input() dados: any;

  modalRef: BsModalRef;
  public MASKS = MASKS;
  formEmpresa: FormGroup;
  formAdress: FormGroup;
  toast = new SweetAlertComponent
  constructor(
    private fb: FormBuilder,
    private service: EditarEmpresaService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.formAdress = this.fb.group({
      cidade: [this.dados.cidade, Validators.required],
      estado: [this.dados.estado, Validators.required],
      rua: [this.dados.rua, Validators.required],
      bairro: [this.dados.bairro, Validators.required],
      numero: [this.dados.numero, Validators.required],
      cep: [this.dados.cep, Validators.required],
      complemento: [this.dados.complemento]
    });

    this.formEmpresa = this.fb.group({
      id: [this.dados.id],
      ds_empresa: [this.dados.ds_empresa, Validators.required],
      nome_fantasia: [this.dados.nome_fantasia, Validators.required],
      razao_social: [this.dados.razao_social, Validators.required],
      cnpj: [this.dados.cnpj, [Validators.required ,NgBrazilValidators.cnpj]],
      status: [this.dados.status, [Validators.required]],
      endereco: this.formAdress
    });

    this.formsValid();
  }

  public formsValid(): boolean {
    if (this.formEmpresa.valid && this.formAdress.valid)
      return true;
    return false
  }

  public clearForm(): void {
    this.formEmpresa.reset();
    this.formAdress.reset();
  }

  public uploadEmpresa() {
    if (this.formEmpresa.valid) {
      const valuesSubmit = this.parseEmpresa(this.formEmpresa.value);
      this.service.uploadEmpresa(valuesSubmit, this.formEmpresa.value.id).subscribe(
        response => {
          this.modalRef.hide();
          this.toast.toastCustom('success', 'Empresa alterada com sucesso!');
        },
        err => {
          this.modalRef.hide();
          if (err.status === 400) {
            return this.toast.toastCustom('warning', 'Formulário inválido')
          }
          this.toast.toastCustom('error', 'Erro ao atualizar empresa');
        }
      )
    }
  }

  private parseEmpresa(empresa: any): any {
    let valuesSubmit = Object.assign({}, empresa);
    const valueReplace = empresa.cnpj.replace(/[^\d]+/g,'');
    valuesSubmit = Object.assign(valuesSubmit, {
      cnpj: valueReplace
    });


    let valuesSubmits = Object.assign({}, valuesSubmit.endereco);
    let complemento = empresa.endereco.complemento;
    if (complemento === null) {
      complemento = '';
    }
    valuesSubmits = Object.assign(valuesSubmits, {
      complemento: complemento
    });

    valuesSubmit.endereco = valuesSubmits;
    return valuesSubmit;
  }


  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { keyboard: false, class: 'modal-lg', });
  }

}
