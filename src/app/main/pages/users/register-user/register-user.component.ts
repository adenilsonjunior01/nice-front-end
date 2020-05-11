import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RegisterUserService } from '../services/register-user/register-user.service';
import { CustomValidators } from 'ng2-validation';
import { SweetAlertComponent } from '../../../../theme/shared/components/sweet-alert/sweet-alert.component';
import { User } from '../interfaces/user';
import { CustomService } from '../services/custom.service';
import { RegistroEmpresaService } from '../../empresa/services/registro-empresa.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  public formUser: FormGroup;

  loading = false;
  empresas: Array<any>;
  perfil: Array<any>;
  user: User;

  public textPhoneMask = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskCep = [ ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  private toast = new SweetAlertComponent();
  constructor(
    private fb: FormBuilder,
    private service: RegisterUserService,
    private customService: CustomService,
    private _registroService: RegistroEmpresaService
  ) { }

  ngOnInit() {
    this.getEmpresasAtivas();
    this.perfil = this.service.getPerfils();
    this.formularioCadastroUsuario();
  }

  private formularioCadastroUsuario() {
    const senha = new FormControl('', Validators.required);
    const confirmPassword = new FormControl('', [Validators.required, CustomValidators.equalTo(senha)]);

    this.formUser = this.fb.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      senha,
      sexo: ['2', Validators.required],
      login: [null, Validators.required],
      idEmpresa: [null, Validators.required],
      idPerfil: [null, Validators.required],
      endereco: [null, Validators.required],
      estado: [null, Validators.required],
      cidade: [null, Validators.required],
      telefone: [null, Validators.required],
      cep: [null, Validators.required],

      confirmPassword
    });
  }

  /**
   * Recebe o formulario preenchido pelo usuário e verifica se o mesmo é válido,
   * se não for, o usuário é notificado dos campos obrigatórios.
   * Faz o replace da mascara do telefone.
  */
  public submitNovoUsuario(): void {
    if (this.formUser.valid) {
      let valuesSubmit = Object.assign({}, this.formUser.value);
      valuesSubmit = Object.assign(valuesSubmit, {
        telefone: valuesSubmit.telefone.replace(/\D+/g, ''),
        sexo: parseInt(valuesSubmit.sexo),
        cep: valuesSubmit.cep.replace(/\D+/g, ''),
      });

      delete valuesSubmit.confirmPassword;
      this.service.submitNovoUsuario(valuesSubmit).subscribe(
        response => {
          this.toast.toastCustom('success', 'Usuário cadastrado com sucesso!');
          setTimeout(() => location.reload(), 2100);
        },
        err => {
          this.service.handleErrorStatus(err.status);
        }
      );
    } else {
      Object.keys(this.formUser.controls).forEach(campo => {
        const controle = this.formUser.get(campo);
        controle.markAsTouched();
      });
      this.toast.toastCustom('warning', 'Preencha os campos corretamente.');
    }
  }

  public getDataAddress(value: any) {
    const cep = value.replace(/\D/g, '');
    if (cep !== '') {
      const validCep = /^[0-9]{8}$/;
      if (validCep.test(cep)) {
        this.loading = true;
        this.customService.getDatas(cep).subscribe(
          response => {
            this.loading = false;
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
      });
  }

  public clearForm(): void {
    this.formUser.reset();
    this.formUser.get('sexo').setValue('2');
  }
}
