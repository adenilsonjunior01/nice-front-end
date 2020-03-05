import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RegisterUserService } from '../services/register-user/register-user.service';
import { CustomValidators } from 'ng2-validation';
import { SweetAlertComponent } from '../../../../theme/shared/components/sweet-alert/sweet-alert.component';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  public formUser: FormGroup;

  empresas: Array<any>;
  perfil: Array<any>;

  public textPhoneMask = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskCep = [ ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  private toast = new SweetAlertComponent();
  constructor(
    private fb: FormBuilder,
    private service: RegisterUserService
  ) { }

  ngOnInit() {
    this.empresas = this.service.getEmpresas();
    this.perfil = this.service.getPerfils();
    this.formularioCadastroUsuario();
  }

  private formularioCadastroUsuario() {
    const senha = new FormControl('', Validators.required);
    const confirmPassword = new FormControl('', [Validators.required, CustomValidators.equalTo(senha)]);

    this.formUser = this.fb.group({
      nome: [null, Validators.required],
      cep: [null, Validators.required],
      cd_cidade: [null, Validators.required],
      cd_estado: [null, Validators.required],
      sexo: ['2', Validators.required],
      idEmpresa: [null, Validators.required],
      idPerfil: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      senha,
      telefone: [],
      login: [null, Validators.required],
      endereco: [null, Validators.required],

      confirmPassword
    });
  }

  public getEmpresas(): void {

  }


  public getPerfils(): void {

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
        telefone: parseInt(valuesSubmit.telefone.replace(/\D+/g, '')),
        cep: valuesSubmit.cep.replace(/\D+/g, '')
      });
      delete valuesSubmit.confirmPassword;
      console.log(valuesSubmit);
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

  public clearForm(): void {
    this.formUser.reset();
    this.formUser.get('sexo').setValue('2');
  }
}
