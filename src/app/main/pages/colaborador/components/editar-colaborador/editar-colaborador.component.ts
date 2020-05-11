import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistroEmpresaService } from '../../../empresa/services/registro-empresa.service';
import * as moment from 'moment';
import { EditarColaboradorService } from '../../services/editar-colaborador/editar-colaborador.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { SweetAlertComponent } from '../../../../../theme/shared/components/sweet-alert/sweet-alert.component';
import { AutheticationService } from '../../../authentication/services/authetication/authetication.service';
import { HandleErrorsService } from '../../../../../theme/shared/services/handle-errors.service';

@Component({
  selector: 'app-editar-colaborador',
  templateUrl: './editar-colaborador.component.html',
  styleUrls: ['./editar-colaborador.component.scss']
})
export class EditarColaboradorComponent implements OnInit {
  @Input() datas: any;
  dadosColaborador: any;
  visualizarCpf = false;

  modalRef: BsModalRef;
  formColaborador: FormGroup;
  formDadosPessoais: FormGroup;
  formAdress: FormGroup;
  formDocumentosPessoais: FormGroup;
  formDependentes: FormGroup;
  empresas: any[] = [];
  idUploadDocEscolaridade: any;
  idUploadDocCpf = 0;
  toast = new SweetAlertComponent;
  perfil: any;
  anexoEscolaridade = false;
  anexoCpf = false;

  dismissible = true;
  defaultAlerts: any[] = [
    {
      type: 'warning',
      msg: `Anexo de Escolaridade é obrigatório. (Dados Pessoais > Anexo de Escolaridade *)`
    },
    {
      type: 'warning',
      msg: `Anexo de Regularidade do CPF é obrigatório. (Documentos Pessoais > Dados do CPF > Certidão de Regularidade do CPF *)`
    }
  ];
  alerts = this.defaultAlerts;

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private _registroService: RegistroEmpresaService,
    private _service: EditarColaboradorService,
    private _auth: AutheticationService,
    private _handle: HandleErrorsService) { }

  ngOnInit() {

  }

  public getColaboradorId(modal: TemplateRef<any>) {
    this._service.getColaboradorId(this.datas.id).subscribe(
      response => {
        this.dadosColaborador = response;
        this.getEmpresasAtivas();
        this.formularioDocumentos();
        this.formularioDadosPessoais();
        this.formularioEndereco();
        this.formularioDependentes();
        this.formularioColaborador();
        this.anexoEscolaridade = false;
        this.anexoCpf = false;
        this.openModal(modal);
      }
    )
  }

  private formularioColaborador() {
    this.perfil = this._auth.decodeToken().perfil;
    this.formColaborador = this.fb.group({
      cdEmpresa: [this.dadosColaborador.empresa_id, [Validators.required]],
      userId: [this.perfil.id],
      endereco: this.formAdress.value, // parser
      dadosPessoais: this.formDadosPessoais.value, // parser
      documentosPessoais: this.formDocumentosPessoais.value,
      dependentes: this.formDependentes.value
    });
  }

  public formularioEndereco() {
    this.formAdress = this.fb.group({
      cidade: [this.dadosColaborador.cidade, Validators.required],
      estado: [this.dadosColaborador.estado, Validators.required],
      rua: [this.dadosColaborador.rua, Validators.required],
      bairro: [this.dadosColaborador.bairro, Validators.required],
      numero: [this.dadosColaborador.numero, Validators.required],
      cep: [this.dadosColaborador.cep, Validators.required],
      complemento: [this.dadosColaborador.complemento]
    });
  }

  public formularioDadosPessoais() {
     const idAnexo = this.dadosColaborador.anexo_escolaridade !== null ? this.dadosColaborador.anexo_escolaridade.id : null;
    const sexo = this.dadosColaborador.sexo === 'M' ? '1' : '2';
    this.formDadosPessoais = this.fb.group({
      nmColaborador: [this.dadosColaborador.nome, Validators.required],
      naturalidade: [this.dadosColaborador.naturalidade, Validators.required],
      naturalidadeEstrangeiro: [this.dadosColaborador.estrangeiro],
      dataNascimento: [this.dadosColaborador.dt_nascimento, Validators.required],
      estadoCivil: [this.dadosColaborador.status_civil], // <<<<<<<<<<<<<<<<<<<<<<<<<
      sexo: sexo,
      nmConjuge: [this.dadosColaborador.nome_conjuge, Validators.required],
      nmPai: [this.dadosColaborador.nome_pai, Validators.required],
      nmMae: [this.dadosColaborador.nome_mae, Validators.required],
      email: [this.dadosColaborador.email, Validators.required],
      escolaridade: [this.dadosColaborador.escolaridade, Validators.required],
      telefone: [this.dadosColaborador.telefone, Validators.required],
      residenciaPropria: [this.dadosColaborador.residencia, Validators.required],
      recursoFgts: [this.dadosColaborador.fgts_residencia, Validators.required],
      anexo_escolaridade: [idAnexo],
      file_escolaridade: [null]
    });
  }

  public formularioDependentes() {
    if (this.dadosColaborador.dependentes.length > 0) {
      this.formDependentes = this.fb.group({
        id: [this.dadosColaborador.dependentes[0].id],
        nm_dependente: [this.dadosColaborador.dependentes[0].nm_dependente],
        parentesco: [this.dadosColaborador.dependentes[0].parentesco],
        data_nascimento: [this.dadosColaborador.dependentes[0].data_nascimento],
        nu_cpf: [this.dadosColaborador.dependentes[0].nu_cpf]
      });
    } else {
      this.formDependentes = this.fb.group({
        nm_dependente: [null],
        parentesco: [null],
        data_nascimento: [null],
        nu_cpf: [null]
      });
    }

  }

  public formularioDocumentos() {
    this.formDocumentosPessoais = this.fb.group({
      carteira_trabalho: this.fb.group({
        id: [this.dadosColaborador.doc_carteira_trabalho.id],
        numero: [this.dadosColaborador.doc_carteira_trabalho.numero, Validators.required],
        serie: [this.dadosColaborador.doc_carteira_trabalho.serie, Validators.required],
        estado_emissor: [this.dadosColaborador.doc_carteira_trabalho.estado_emissor, [Validators.required]],
        data_emissao: [this.dadosColaborador.doc_carteira_trabalho.dt_emissao, Validators.required],
        colaborador_id: [this.dadosColaborador.doc_carteira_trabalho.colaborador_id]
      }),
      identidade: this.fb.group({
        id: [this.dadosColaborador.doc_identidade.id],
        numero: [this.dadosColaborador.doc_identidade.numero_identidade, Validators.required],
        estado_emissor: [this.dadosColaborador.doc_identidade.estado_emissor, [Validators.required]],
        data_emissao: [this.dadosColaborador.doc_identidade.dt_emissao, Validators.required],
        orgao_emissor: [this.dadosColaborador.doc_identidade.orgao_emissor, [Validators.required]],
        colaborador_id: [this.dadosColaborador.doc_identidade.colaborador_id]
      }),
      titulo_eleitor: this.fb.group({
        id: [this.dadosColaborador.doc_titulo_eleitor.id],
        numero: [this.dadosColaborador.doc_titulo_eleitor.numero, Validators.required],
        zona: [this.dadosColaborador.doc_titulo_eleitor.zona, Validators.required],
        secao: [this.dadosColaborador.doc_titulo_eleitor.secao, Validators.required],
        estado_emissor: [this.dadosColaborador.doc_titulo_eleitor.estado_emissor, [Validators.required]],
        data_emissao: [this.dadosColaborador.doc_titulo_eleitor.dt_emissao, Validators.required],
        orgao_emissor: [this.dadosColaborador.doc_titulo_eleitor.estado_emissor, [Validators.required]],
        colaborador_id: [this.dadosColaborador.doc_titulo_eleitor.colaborador_id]
      }),
      cpf: this.fb.group({
        numero: [this.dadosColaborador.cpf, Validators.required],
        certidao_regularidade: [this.dadosColaborador.anexo_cpf.id],
        file_certidao: [null],
      }),
      certidao_reservista: this.fb.group({
        id: [this.dadosColaborador.doc_reservista.id],
        numero: [this.dadosColaborador.doc_reservista.numero, Validators.required],
        serie: [this.dadosColaborador.doc_reservista.serie, Validators.required],
        categoria: [this.dadosColaborador.doc_reservista.categoria, Validators.required],
        data_emissao: [this.dadosColaborador.doc_reservista.dt_emissao, Validators.required],
        colaborador_id: [this.dadosColaborador.doc_reservista.colaborador_id]
      }),
      pis: this.fb.group({
        id: [this.dadosColaborador.doc_pis.id],
        numero: [this.dadosColaborador.doc_pis.numero, Validators.required],
        banco: [this.dadosColaborador.doc_pis.banco, Validators.required],
        agencia: [this.dadosColaborador.doc_pis.agencia, Validators.required],
        conta: [this.dadosColaborador.doc_pis.conta, Validators.required],
        colaborador_id: [this.dadosColaborador.doc_pis.colaborador_id]
      }),
      info_complementar: this.fb.group({
        id: [this.dadosColaborador.id],
        seguro_desemprego: this.dadosColaborador.seguro_desemprego,
        vinculos_trabalhistas: this.dadosColaborador.vinculos_trabalhistas,
        alteracao_nome: this.dadosColaborador.alteracao_nome,
        portador_deficiencia: this.dadosColaborador.possui_deficiencia,
        colaborador_id: this.dadosColaborador.id
      })
    });
  }

  get controlCdEmpresaValid() {
    return this.formColaborador.controls['cdEmpresa']
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { keyboard: false, class: 'modal-lg', backdrop: 'static'});
  }

  public getEmpresasAtivas() {
    this._registroService.getEmpresasAtivas().subscribe(
      response => {
        this.empresas = response;
      });
  }

  private verificaFormDadosPessoaisValido() {
    if (this.formDadosPessoais.valid) {
      if (this.idUploadDocEscolaridade !== 0 && this.idUploadDocEscolaridade !== null && this.idUploadDocEscolaridade !== undefined) {
        this.formDadosPessoais.get('anexo_escolaridade').setValue(this.idUploadDocEscolaridade);
      }
      if (this,this.formDadosPessoais.value.anexo_escolaridade === null) {
        this.anexoEscolaridade = true;
        return false;
      }
      return true;
    } else {
      Object.keys(this.formDocumentosPessoais.contains).forEach(campo => {
        const controle = this.formDadosPessoais.get(campo);
        controle.markAsTouched();
      });
      this.toast.toastCustom('warning', 'Preencha os campos obrigatórios');
      return false;
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
      this.toast.toastCustom('warning', 'Preencha os campos obrigatórios');
      return false;
    }
  }

  private verificaFormDocumentosPessoaiscoValido() {
    if (this.formDocumentosPessoais.valid) {
      if (this,this.formDocumentosPessoais.value.cpf.certidao_regularidade === null) {
        this.anexoCpf = true;
        this.toast.toastCustom('warning', 'Anexo de regularidade é obrigatório');
        return false;
      }
      return true;
    } else {
      Object.keys(this.formDocumentosPessoais.contains).forEach(campo => {
        const controle = this.formDocumentosPessoais.get(campo);
        controle.markAsTouched();
      });
      this.toast.toastCustom('warning', 'Preencha os campos obrigatórios');
      return false;
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
      this.toast.toastCustom('warning', 'Preencha os campos obrigatórios');
      return false;
    }
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
    });
    this.formDocumentosPessoais.get('cpf').setValue(cpfValue);
  }


  public parserDependetes(): void {
    let valuesParser = Object.assign({}, this.formDependentes.value);
    if (valuesParser.nu_cpf !== null && valuesParser.nu_cpf !== undefined) {
      valuesParser = Object.assign(valuesParser, {
        nu_cpf: valuesParser.nu_cpf.replace(/\D+/g, ''),
        data_nascimento: moment(valuesParser.data_nascimento).format('YYYY-MM-DD'),
      });
    } else if (valuesParser.data_nascimento !== null){
      valuesParser = Object.assign(valuesParser, {
        data_nascimento: moment(valuesParser.data_nascimento).format('YYYY-MM-DD'),
      });
    }
    return valuesParser;
  }

  private parserFormAdress() {
    let valuesParser = Object.assign({}, this.formAdress.value);
    valuesParser = Object.assign(valuesParser, {
      numero: parseInt(valuesParser.numero)
    });
    return valuesParser
  }

  private parserFormDadosPessoais() {
    let valuesParser = Object.assign({}, this.formDadosPessoais.value);
    valuesParser = Object.assign(valuesParser, {
      dataNascimento: moment(valuesParser.dataNascimento).format('YYYY-MM-DD'),
      estadoCivil: parseInt(valuesParser.estadoCivil),
      sexo: parseInt(valuesParser.sexo),
    });

    return valuesParser;
  }

  public setValores() {
    if (this.verificaFormDadosPessoaisValido() === true) {
      if (this.verificaFormEnderecoValido() === true) {
        if (this.verificaFormDocumentosPessoaiscoValido() === true) {
          if (this.verificaFormDependentes() === true) {
            this.parserDocumentosPessoais();
            this.formColaborador.get('dadosPessoais').setValue(this.parserFormDadosPessoais());
            this.formColaborador.get('endereco').setValue(this.parserFormAdress());
            this.formColaborador.get('documentosPessoais').setValue(this.formDocumentosPessoais.value);
            this.formColaborador.get('dependentes').setValue(this.parserDependetes());
            return true;
          }
        }
      }
    }
    return false;
  }

  public resetFormsModal() {
    this.formDadosPessoais.reset();
    this.formAdress.reset();
    this.formDocumentosPessoais.reset()
    this.formDependentes.reset();
    this.formColaborador.reset();
    this.modalRef.hide();
  }

  public uploadAnexoEscolaridade(): void {
    if (this.formDadosPessoais.value.file_escolaridade !== null) {
      const formData = this._registroService.toFormData(this.formDadosPessoais.value.file_escolaridade);
      // POR LOADING INFORMANDO QUE O ANEXO ESTÁ SENDO ENVIADO
      this._registroService.uploadAnexo(formData).subscribe(
        response => {
          this.idUploadDocEscolaridade = response.Arquivo.id;
          this.uploadAnexoCpf()
        }
      );
    } else {
      this.uploadAnexoCpf();
    }
  }

  public uploadAnexoCpf(): void {
    const value = this.formDocumentosPessoais.value.cpf;
    let formData;
    if (value.file_certidao !== null && value.file_certidao !== undefined) {
      formData = this._registroService.toFormData(value.file_certidao);
    } else {
      formData = null;
    }
    if (formData !== null) {
      // POR LOADING INFORMANDO QUE O ANEXO ESTÁ SENDO ENVIADO
      this._registroService.uploadAnexo(formData).subscribe(
        response => {
          this.idUploadDocCpf = response.Arquivo.id;
          setTimeout(() => this.submitFormulario(), 300);
        }
      );
    } else {
      this.submitFormulario();
    }
  }

  public submitFormulario() {
    if (this.setValores() === true) {
      let valuesSubmit = Object.assign({}, this.formColaborador.value);
      valuesSubmit = Object.assign(valuesSubmit);
      delete(valuesSubmit.dadosPessoais.file_escolaridade);
      delete(valuesSubmit.documentosPessoais.cpf.file_certidao);

      this._service.atualizarColaborador(valuesSubmit, this.datas.id).subscribe(
        response => {
          this.formColaborador.reset();
          this.modalRef.hide();
          this.toast.toastCustom('success', 'Colaborador atualizado com sucesso!');
        },
        err => {
          this.modalRef.hide();
          this.toast.toastCustom('error', this._handle.requestErrors(err.status));
          console.error('ERRO AO CADASTRAR COLABORADOR: ', err);
        }
      )
    }
  }

  public excluirAnexo(id: any) {
    this._service.excluirAnexo(id).subscribe(
      response => {
        this.toast.toastCustom('success', 'Anexo excluído com sucesso.');
      },
      err => {
        this.modalRef.hide();
        this.toast.toastCustom('error', 'Erro ao excluir anexo.');
      }
    )
  }

  public downloadAnexo(id: any, nameFile: string) {
    this._service.downloadAnexo(id).subscribe(
      response => {
        this.modalRef.hide();
        this.toast.toastCustom('success', 'Iniciando download...');
        this._service.handleFile(response, nameFile);
      },
      err => {
        this.modalRef.hide();
        this.toast.toastCustom('error', this._handle.requestErrors(err.status));
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
      if (result.value === true) {
        this.modalRef.hide();
        this.excluirAnexo(idUser);
      }
    })
  }

  onClosed(dismissedAlert: any): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

}
