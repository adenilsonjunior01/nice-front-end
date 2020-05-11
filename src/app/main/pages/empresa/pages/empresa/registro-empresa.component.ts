import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistroEmpresaService } from '../../services/registro-empresa.service';
import { EnderecoComponent } from '../../../../components/endereco/endereco.component';
import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { SweetAlertComponent } from '../../../../../theme/shared/components/sweet-alert/sweet-alert.component';

@Component({
  selector: 'app-registro-empresa',
  templateUrl: './registro-empresa.component.html',
  styleUrls: ['./registro-empresa.component.scss']
})
export class RegistroEmpresaComponent implements OnInit {
  @ViewChild(EnderecoComponent, {static: false}) endereco;

  public MASKS = MASKS;
  formEmpresa: FormGroup;
  formAdress: FormGroup;
  toast: SweetAlertComponent
  constructor(
    private fb: FormBuilder,
    private service: RegistroEmpresaService
  ) { }

  ngOnInit() {
    this.formAdress = this.fb.group({
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        numero: [null, Validators.required],
        cep: [null, Validators.required],
        complemento: [null]
    });

    this.formEmpresa = this.fb.group({
      ds_empresa: [null, Validators.required],
      nome_fantasia: [null, Validators.required],
      razao_social: [null, Validators.required],
      cnpj: [null, [Validators.required ,NgBrazilValidators.cnpj]],
      endereco: this.formAdress
    });
  }

  public submitFormulario() {
    if (this.formEmpresa.valid) {
      const values = this.valuesSubmit(this.formEmpresa.value);
      this.formEmpresa.get('endereco').get('numero').setValue(values.numero);
      this.service.submitEmpresa(this.formEmpresa.value).subscribe(
        response => {
          this.toast.toastCustom('success', 'Empresa registrada com sucesso!');
        }, err => {
          if (err.status === 400) {
            return this.toast.toastCustom('warning', 'Formulário inválido');
          }
          return this.toast.toastCustom('error', 'Erro ao cadastrar empresa, contate o suporte.');
        }
      )
    } else {
      Object.keys(this.formEmpresa.controls).forEach(campo => {
        const controle = this.formEmpresa.get(campo);
        controle.markAsTouched();
      });
    }
  }

  private valuesSubmit(values: any) {
    let valuesSubmit = Object.assign({}, values.endereco);
    valuesSubmit = Object.assign(valuesSubmit, {
      numero: parseInt(valuesSubmit.numero)
    })
    return valuesSubmit;
  }

  public clearForm() {
    this.formEmpresa.reset();
    this.formAdress.reset();
  }

  public formsValid(): boolean {
    if (this.formEmpresa.valid && this.formAdress.valid)
      return true;
    return false
  }
}
