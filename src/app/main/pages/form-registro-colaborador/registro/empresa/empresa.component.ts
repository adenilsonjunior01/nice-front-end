import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RegistroEmpresaService } from '../../services/registro-colaborador/registro-empresa.service';
import { EnderecoComponent } from '../../components/endereco/endereco.component';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {
  @ViewChild(EnderecoComponent, {static: false}) endereco;
  formEmpresa: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: RegistroEmpresaService
  ) { }

  ngOnInit() {

    this.formEmpresa = this.fb.group({
      ds_empresa: [],
      razao_social: [],
      nome_fantasia: [],
      cnpj: [],
      endereco: this.fb.group({
        cidade: [],
        estado: [],
        rua: [],
        bairro: [],
        numero: [],
        cep: [],
        complemento: []
      })
    });
  }

  private spreadAdress(endereco: any) {
    let valuesSpreedAdress = Object.assign({}, this.formEmpresa.get('endereco').value);
    valuesSpreedAdress = Object.assign(valuesSpreedAdress, {
      cidade: endereco.cidade,
      estado: endereco.estado,
      rua: endereco.rua,
      bairro: endereco.bairro,
      numero: endereco.numero,
      cep: endereco.cep,
      complemento: endereco.complemento
    });
    this.formEmpresa.get('endereco').setValue(valuesSpreedAdress);
  }

  public submitFormulario() {
    this.spreadAdress(this.endereco.formAdress.value.endereco);
    console.log(JSON.stringify(this.formEmpresa.value));
  }
}
