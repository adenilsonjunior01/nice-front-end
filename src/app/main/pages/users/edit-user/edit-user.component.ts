import { Component, OnInit, Input, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ListarUserService } from '../services/listar-user/listar-user.service';
import { ActivatedRoute } from '@angular/router';
import { CustomService } from '../services/custom.service';
import { SweetAlertComponent } from '../../../../theme/shared/components/sweet-alert/sweet-alert.component';
import { RegistroEmpresaService } from '../../empresa/services/registro-empresa.service';
import { UpldateUserService } from '../services/upldate-user/upldate-user.service';
import { HandleErrorsService } from '../../../../theme/shared/services/handle-errors.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  @ViewChild('modal', {static: false}) modal: TemplateRef<any>;
  @Output() updateMsg = new EventEmitter;
  @Input() dados;
  @Input() id;
  public formUser: FormGroup;
  public textPhoneMask = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  perfil: any;
  resultViaCep: any;
  estado = null;
  cidade = null;
  endereco = null;
  toast = new SweetAlertComponent;
  empresas: any[] = [];
  modalRef: BsModalRef;
  usuario: any;
  constructor(
    private fb: FormBuilder,
    private service: ListarUserService,
    private route: ActivatedRoute,
    private customService: CustomService,
    private _registroService: RegistroEmpresaService,
    private uploadService: UpldateUserService,
    private _handleErros: HandleErrorsService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.perfil = this.service.getPerfils();
    this.getEmpresasAtivas();
  }

  public abrirEdicao() {
    this.getUserId();
    this.openModal(this.modal);
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { keyboard: false, class: 'modal-lg', });
  }

  public getDatasCep(cep: any) {
    this.customService.getDatas(cep).subscribe(response => {
      this.formUser.get('endereco').setValue(response.logradouro);
      this.formUser.get('estado').setValue(response.uf);
      this.formUser.get('cidade').setValue(response.localidade);
      this.formularioEdit();
    },err => this.toast.toastCustom("error", "Erro ao buscar endereço pelo CEP."))
  }


  public getDataAddress(value: any) {
    const cep = value.replace(/\D/g, '');
    if (cep !== '') {
      const validCep = /^[0-9]{8}$/;
      if (validCep.test(cep)) {
        this.customService.getDatas(cep).subscribe(
          response => {
            this.formUser.get('endereco').setValue(response.logradouro);
            this.formUser.get('estado').setValue(response.uf);
            this.formUser.get('cidade').setValue(response.localidade);
          }, err => {
            this.toast.toastCustom('warning', 'Não foi possível encontrar seu endereço.');
          }
        )
      }
    }
  }
  public getEmpresasAtivas() {
    this._registroService.getEmpresasAtivas().subscribe(
      response => {
        this.empresas = response;
        //this.formularioEdit();
      });
  }

  private formularioEdit() {
    const sexo = this.usuario.sexo === 1 ? '1' : '2'
    this.formUser = this.fb.group({
      nome: [this.usuario.name, Validators.required],
      cep: [this.usuario.cep, Validators.required],
      sexo: [sexo, Validators.required],
      login: [this.usuario.login],
      idEmpresa: [this.usuario.empresa.id, Validators.required],
      idPerfil: [this.usuario.perfil_id, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
      telefone: [this.usuario.telefone],
      endereco: [this.usuario.endereco, Validators.required],
      estado: [this.usuario.estado, Validators.required],
      cidade: [this.usuario.cidade, Validators.required],
    });
  }

  public uploadUser() {
    if (this.formUser.valid) {
      let valuesSubmit = Object.assign({}, this.formUser.value);
      valuesSubmit.telefone = JSON.stringify(valuesSubmit.telefone);
      valuesSubmit = Object.assign(valuesSubmit, {
        sexo: parseInt(valuesSubmit.sexo),
        cep: valuesSubmit.cep.replace(/\D+/g, ''),
        telefone: valuesSubmit.telefone.replace(/\D+/g, ''),
      });
      this.uploadService.uploadUser(valuesSubmit, this.usuario.id).subscribe(
        response => {
          this.modalRef.hide();
          this.toast.toastCustom('success', 'Usuário atualizado com sucesso!');
          this.updateMsg.emit(true);
        },
        err => {
          this._handleErros.requestErrors(err.status);
        }
      )
    } else {
      Object.keys(this.formUser.controls).forEach(campo => {
        const controle = this.formUser.get(campo);
        controle.markAsTouched();
      });
      this.toast.toastCustom('warning', 'Preencha os campos corretamente.');
    }
  }

  public clearForm() {
    this.formUser.reset();
  }

  public getUserId() {
    this.uploadService.getUserId(this.id).subscribe(
      response => {
        this.usuario = response;
        this.formularioEdit();
      },
      err => {
        this._handleErros.requestErrors(err.status);
      }
    )
  }
}
