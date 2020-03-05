import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EnderecoComponent } from '../../components/endereco/endereco.component';
import { DadosPessoaisComponent } from '../../components/dados-pessoais/dados-pessoais.component';
import { RegistroEmpresaService } from '../../services/registro-colaborador/registro-empresa.service';
import { DocumentosPessoaisComponent } from '../../components/documentos-pessoais/documentos-pessoais.component';

@Component({
  selector: 'app-registro-colaborador',
  templateUrl: './registro-colaborador.component.html',
  styleUrls: ['./registro-colaborador.component.scss']
})
export class RegistroColaboradorComponent implements OnInit {
  @ViewChild(EnderecoComponent, {static: false}) endereco;
  @ViewChild(DadosPessoaisComponent, {static: false}) dadosPessoais;
  @ViewChild(DocumentosPessoaisComponent, {static: false}) documentoPessoais;

  formColaborador: FormGroup;
  empresas: any;
  constructor(
    private fb: FormBuilder,
    private service: RegistroEmpresaService
  ) { }

  ngOnInit() {
    this.empresas = this.service.getEmpresas();
    this.formularioColaborador();
  }

  private formularioColaborador() {
    // FALTA POR O COMPO DE TELEFONES
    this.formColaborador = this.fb.group({
      dsEmpresa: [],
      cnpj: [],
      razao_social: [],
      nome_fantasia: [],
      endereco: this.fb.group({
        cidade: [],
        estado: [],
        rua: [],
        bairro: [],
        numero: [],
        cep: [],
        complemento: []
      }),
      dadosPessoais: this.fb.group({
        nmColaborador: [],
        sobrenomeColaborador: [],
        naturalidade: [],
        naturalidadeEstrangeiro: [],
        dtNascimento: [],
        estadoCivil: [],
        sexo: [],
        nmConjuge: [],
        nmPai: [],
        nmMae: [],
        email: [],
        escolaridade: [],
        telefone: [],
        residenciaPropria: [],
        recursoFgts: [],
        anexo_escolaridade: []
      }),
      documentosPessoais: []
    });
  }

  onClick() {
    console.log(this.dadosPessoais.formDadosPessoais.value);
    console.log(JSON.stringify(this.documentoPessoais.value));
  }

  public submitFormulario() {
    this.spreadAdress(this.endereco.formAdress.value.endereco);
    this.spreadDadosPessoais(this.dadosPessoais.formDadosPessoais.value);
    this.formColaborador.get('documentosPessoais').setValue(this.documentoPessoais.formDocumentosPessoais.value);
    console.log(JSON.stringify(this.formColaborador.value));
  }

  /**
   * Recebe os valores do endereco do componete EnderecoCompoent e popula o formColaborador
   * com os valores preenchidos pelo usuario
  */
  private spreadAdress(endereco: any) {
    let valuesSpreedAdress = Object.assign({}, this.formColaborador.get('endereco').value);
    valuesSpreedAdress = Object.assign(valuesSpreedAdress, {
      cidade: endereco.cidade,
      estado: endereco.estado,
      rua: endereco.rua,
      bairro: endereco.bairro,
      numero: endereco.numero,
      cep: endereco.cep,
      complemento: endereco.complemento
    });
    this.formColaborador.get('endereco').setValue(valuesSpreedAdress);
  }

  private spreadDadosPessoais(dadosPessoais) {
    let valuesSpreadDadosPessoais = Object.assign({}, this.formColaborador.get('dadosPessoais').value);
    valuesSpreadDadosPessoais = Object.assign(valuesSpreadDadosPessoais, {
      nmColaborador: dadosPessoais.nmColaborador,
      sobrenomeColaborador: dadosPessoais.sobrenomeColaborador,
      naturalidade: dadosPessoais.naturalidade,
      naturalidadeEstrangeiro: dadosPessoais.naturalidadeEstrangeiro,
      dtNascimento: dadosPessoais.dtNascimento,
      estadoCivil: dadosPessoais.estadoCivil,
      sexo: dadosPessoais.sexo,
      nmConjuge: dadosPessoais.nmConjuge,
      nmPai: dadosPessoais.nmPai,
      nmMae: dadosPessoais.nmMae,
      email: dadosPessoais.email,
      escolaridade: dadosPessoais.escolaridade,
      telefone: dadosPessoais.telefone,
      residenciaPropria: dadosPessoais.residenciaPropria,
      recursoFgts: dadosPessoais.recursoFgts,
      anexo_escolaridade: dadosPessoais.anexo_escolaridade
    });
    this.formColaborador.get('dadosPessoais').setValue(valuesSpreadDadosPessoais);
  }

}
