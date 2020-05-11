import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EnderecoComponent } from '../../../../components/endereco/endereco.component';
import { DadosPessoaisComponent } from '../../../../components/dados-pessoais/dados-pessoais.component';
import { DocumentosPessoaisComponent } from '../../components/documentos-pessoais/documentos-pessoais.component';
import { RegistroEmpresaService } from '../../../empresa/services/registro-empresa.service';
import { DadosPessoais } from '../../../../interfaces/dadosPessoais';
import { MASKS, NgBrazilValidators } from 'ng-brazil';
import * as moment from 'moment';
import { RegistroColaboradorService } from '../../services/registro-colaborador/registro-colaborador.service';
import { AutheticationService } from '../../../authentication/services/authetication/authetication.service';
import { SweetAlertComponent } from '../../../../../theme/shared/components/sweet-alert/sweet-alert.component';
import { HandleErrorsService } from '../../../../../theme/shared/services/handle-errors.service';

@Component({
  selector: 'app-registro-colaborador',
  templateUrl: './registro-colaborador.component.html',
  styleUrls: ['./registro-colaborador.component.scss']
})
export class RegistroColaboradorComponent implements OnInit {
  @ViewChild(EnderecoComponent, {static: false}) endereco;
  @ViewChild(DadosPessoaisComponent, {static: false}) dadosPessoais;
  @ViewChild(DocumentosPessoaisComponent, {static: false}) documentoPessoais;
  public MASKS = MASKS;
  visualizarCpf = true;
  perfil = null;

  formColaborador: FormGroup;
  formDadosPessoais: FormGroup;
  escolaridades: any[] = [];
  formAdress: FormGroup;
  formDocumentosPessoais: FormGroup;
  dataPessoais: DadosPessoais;
  formDependentes: FormGroup;
  idUploadDocEscolaridade: any;
  idUploadDocCpf: any;
  empresas: any[] = [];

  toast = new SweetAlertComponent;
  constructor(
    private fb: FormBuilder,
    private service: RegistroEmpresaService,
    private _serviceColab: RegistroColaboradorService,
    private _auth: AutheticationService,
    private _handleErrors: HandleErrorsService
  ) {
    this.perfil = this._auth.decodeToken().perfil;
    this.getEmpresasAtivas();
    this.formularioDadosPessoais();
    this.formularioEndereco();
    this.formularioDocumentos();
    this.formularioDependentes();
    this.formularioColaborador();
  }

  ngOnInit() {

  }

  private formularioColaborador() {
    // FALTA POR O COMPO DE TELEFONES
    this.formColaborador = this.fb.group({
      cdEmpresa: [null, [Validators.required]],
      userId: [this.perfil.id],
      endereco: this.formAdress.value, // parser
      dadosPessoais: this.formDadosPessoais.value, // parser
      documentosPessoais: this.formDocumentosPessoais.value,
      dependentes: this.formDependentes.value
    });
  }

  public formularioEndereco() {
    this.formAdress = this.fb.group({
      cidade: [null, Validators.required],
      estado: [null, Validators.required],
      rua: [null, Validators.required],
      bairro: [null, Validators.required],
      numero: [null, Validators.required],
      cep: [null, Validators.required],
      complemento: [null]
    });
  }

  public formularioDadosPessoais() {
    this.formDadosPessoais = this.fb.group({
      nmColaborador: [null, Validators.required],
      naturalidade: [null, Validators.required],
      naturalidadeEstrangeiro: false,
      dataNascimento: [null, Validators.required],
      estadoCivil: '1',
      sexo: '1',
      nmConjuge: [null],
      nmPai: [null, Validators.required],
      nmMae: [null, Validators.required],
      email: [null, Validators.required],
      escolaridade: [null, Validators.required],
      telefone: [null, Validators.required],
      residenciaPropria: [false, Validators.required],
      recursoFgts: [false, Validators.required],
      anexo_escolaridade: [null],
      file_escolaridade: [null, Validators.required]
    });
  }

  public formularioDocumentos() {
    this.formDocumentosPessoais = this.fb.group({
      carteira_trabalho: this.fb.group({
        numero: [null, Validators.required],
        serie: [null, Validators.required],
        estado_emissor: [null, [Validators.required]],
        data_emissao: [null, Validators.required]
      }),
      identidade: this.fb.group({
        numero: [null, Validators.required],
        estado_emissor: [null, [Validators.required]],
        data_emissao: [null, Validators.required],
        orgao_emissor: [null, [Validators.required]]
      }),
      titulo_eleitor: this.fb.group({
        numero: [null, Validators.required],
        zona: [null, Validators.required],
        secao: [null, Validators.required],
        estado_emissor: [null, [Validators.required]],
        data_emissao: [null, Validators.required],
        orgao_emissor: [null, [Validators.required]]
      }),
      cpf: this.fb.group({
        numero: [null, Validators.required],
        certidao_regularidade: [null],
        file_certidao: [null, Validators.required]
      }),
      certidao_reservista: this.fb.group({
        numero: [null, Validators.required],
        serie: [null, Validators.required],
        categoria: [null, Validators.required],
        data_emissao: [null, Validators.required]
      }),
      pis: this.fb.group({
        numero: [null, Validators.required],
        banco: [null, Validators.required],
        agencia: [null, Validators.required],
        conta: [null, Validators.required]
      }),
      info_complementar: this.fb.group({
        seguro_desemprego: false,
        vinculos_trabalhistas: false,
        alteracao_nome: false,
        portador_deficiencia: false
      })
    });
  }

  public formularioDependentes() {
    this.formDependentes = this.fb.group({
      nm_dependente: [null],
      parentesco: [null],
      data_nascimento: [null],
      nu_cpf: [null]
    });
  }

  onClick() {

  }

  public submitFormulario() {
    this.setValores();

    if (this.perfil.ds_perfil !== 'admin') {
      this.formColaborador.get('cdEmpresa').setValue(null);
    }
    let valuesSubmit = Object.assign({}, this.formColaborador.value);
    valuesSubmit = Object.assign(valuesSubmit);
    delete(valuesSubmit.dadosPessoais.file_escolaridade);
    delete(valuesSubmit.documentosPessoais.cpf.file_certidao);
    this._serviceColab.cadastroColaborador(valuesSubmit).subscribe(
      response => {
        this.toast.toastCustom('success', 'Colaborador registrado com sucesso!');
      },
      err => {
        this._handleErrors.requestErrors(err.status);
      }
    )
  }

  public getEmpresasAtivas() {
    this.service.getEmpresasAtivas().subscribe(
      response => {
        this.empresas = response;
      });
  }

  get controlCdEmpresaValid() {
    return this.formColaborador.controls['cdEmpresa']
  }

  private parserFormDadosPessoais() {
    let valuesParser = Object.assign({}, this.formDadosPessoais.value);
    valuesParser = Object.assign(valuesParser, {
      dataNascimento: moment(valuesParser.dataNascimento).format('YYYY-MM-DD'),
      estadoCivil: parseInt(valuesParser.estadoCivil),
      sexo: parseInt(valuesParser.sexo),
      anexo_escolaridade: this.idUploadDocEscolaridade
    });
    return valuesParser;
  }

  private parserFormAdress() {
    let valuesParser = Object.assign({}, this.formAdress.value);
    valuesParser = Object.assign(valuesParser, {
      numero: parseInt(valuesParser.numero)
    });
    return valuesParser
  }

  private parserDocumentosPessoais(): void {
    let carteiraParser = Object.assign({}, this.formDocumentosPessoais.value.carteira_trabalho);
    carteiraParser = Object.assign(carteiraParser, {
      numero: parseInt(carteiraParser.numero),
      serie: parseInt(carteiraParser.serie),
      data_emissao: moment(carteiraParser.data_emissao).format('YYYY-MM-DD'),
    });
    this.formDocumentosPessoais.get('carteira_trabalho').setValue(carteiraParser);

    let identidade = Object.assign({}, this.formDocumentosPessoais.value.identidade);
    identidade = Object.assign(identidade, {
      numero: parseInt(identidade.numero),
      serie: parseInt(identidade.serie),
      data_emissao: moment(identidade.data_emissao).format('YYYY-MM-DD'),
    });
    this.formDocumentosPessoais.get('identidade').setValue(identidade);


    let tituloEleitor = Object.assign({}, this.formDocumentosPessoais.value.titulo_eleitor);
    tituloEleitor = Object.assign(tituloEleitor, {
      numero: parseInt(tituloEleitor.numero),
      // zona: parseInt(tituloEleitor.zona),
      data_emissao: moment(tituloEleitor.data_emissao).format('YYYY-MM-DD'),
    });
    this.formDocumentosPessoais.get('titulo_eleitor').setValue(tituloEleitor);

    let certidaoReservista = Object.assign({}, this.formDocumentosPessoais.value.certidao_reservista);
    certidaoReservista = Object.assign(certidaoReservista, {
      numero: parseInt(certidaoReservista.numero),
      serie: parseInt(certidaoReservista.serie),
      data_emissao: moment(certidaoReservista.data_emissao).format('YYYY-MM-DD'),
    });
    this.formDocumentosPessoais.get('certidao_reservista').setValue(certidaoReservista);

    let cpfValue = Object.assign({}, this.formDocumentosPessoais.value.cpf);
      cpfValue = Object.assign(cpfValue, {
      numero: cpfValue.numero.replace(/\D+/g, ''),
      certidao_regularidade: this.idUploadDocCpf
    });
    this.formDocumentosPessoais.get('cpf').setValue(cpfValue);
  }

  public parserDependetes(): void {
    let valuesParser = Object.assign({}, this.formDependentes.value);
    valuesParser = Object.assign(valuesParser, {
      nuCpf: valuesParser.nuCpf.replace(/\D+/g, ''),
      data_nascimento: moment(valuesParser.data_nascimento).format('YYYY-MM-DD'),
    });
    return valuesParser;
  }

  public uploadAnexoEscolaridade(): void {
    const formData = this.service.toFormData(this.formDadosPessoais.value.file_escolaridade);
    // POR LOADING INFORMANDO QUE O ANEXO ESTÁ SENDO ENVIADO
    this.service.uploadAnexo(formData).subscribe(
      response => {
        this.idUploadDocEscolaridade = response.Arquivo.id;
        this.uploadAnexoCpf()
      }
    )
  }

  public uploadAnexoCpf(): void {
    const value = this.formDocumentosPessoais.value.cpf;
    const formData = this.service.toFormData(value.file_certidao);
    // POR LOADING INFORMANDO QUE O ANEXO ESTÁ SENDO ENVIADO
    this.service.uploadAnexo(formData).subscribe(
      response => {
        this.idUploadDocCpf = response.Arquivo.id;
        setTimeout(() => this.submitFormulario(), 300);
      }
    )
  }



  private verificaFormDadosPessoaisValido() {
    if (this.formDocumentosPessoais.valid) {
      return true;
    } else {
      Object.keys(this.formDocumentosPessoais.contains).forEach(campo => {
        const controle = this.formDadosPessoais.get(campo);
        controle.markAsTouched();
      });
    }
  }

  private verificaFormEnderecoValido() {
    if (this.formAdress.valid) {
      return true;
    } else {
      Object.keys(this.formAdress.contains).forEach(campo => {
        const controle = this.formAdress.get(campo);
        controle.markAsTouched();
      });
    }
  }

  private verificaFormDocumentosPessoaiscoValido() {
    if (this.formDocumentosPessoais.valid) {
      return true;
    } else {
      Object.keys(this.formDocumentosPessoais.contains).forEach(campo => {
        const controle = this.formDocumentosPessoais.get(campo);
        controle.markAsTouched();
      });
    }
  }
  private verificaFormDependentes() {
    if (this.formDependentes.valid) {
      return true;
    } else {
      Object.keys(this.formDependentes.contains).forEach(campo => {
        const controle = this.formDependentes.get(campo);
        controle.markAsTouched();
      });
    }
  }

  public setValores() {
    this.verificaFormDadosPessoaisValido();
    this.verificaFormEnderecoValido()
    this.verificaFormDocumentosPessoaiscoValido();
    this.verificaFormDependentes();
    this.parserDocumentosPessoais();
    this.formColaborador.get('dadosPessoais').setValue(this.parserFormDadosPessoais());
    this.formColaborador.get('endereco').setValue(this.parserFormAdress());
    this.formColaborador.get('documentosPessoais').setValue(this.formDocumentosPessoais.value);
    this.formColaborador.get('dependentes').setValue(this.parserDependetes());
  }
}
