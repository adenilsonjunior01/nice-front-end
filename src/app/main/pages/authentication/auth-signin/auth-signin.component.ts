import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutheticationService } from '../services/authetication/authetication.service';
import { SweetAlertComponent } from '../../../../theme/shared/components/sweet-alert/sweet-alert.component';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {
  private toast = new SweetAlertComponent();
  formAuth: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: AutheticationService
  ) { }

  ngOnInit() {
    const login = localStorage.getItem('login');
    const loginExist = this.verificaLoginLocalStorage(login);

    this.formAuth = this.fb.group({
      email: [loginExist, Validators.required],
      password: [null, Validators.required],
      saveLogin: [true]
    });
  }

  public authentication() {
    if (this.formAuth.valid) {
      this.salvarLoginLocalStorage(this.formAuth.value.saveLogin, this.formAuth.value.email);
      this.service.authentication(this.formAuth.value).subscribe(
        () => {
          this.toastSuccessfully();
          this.router.navigate(['/dashboard/analytics']);
        },
        err => {
          this.service.handleErrorStatus(err);
          if (err.status === 404) {
            return this.formAuth.get('password').reset();
          } else if (err.status === 500) {
            return this.toast.toastCustom('error', 'Erro na comunicação com o servidor.');
          } else if (err.status === 401) {
            return this.toast.toastCustom('error', 'Usuário ou senha inválido.');
          }
        });
    } else {
      Object.keys(this.formAuth.controls).forEach(campo => {
        const controle = this.formAuth.get(campo);
        controle.markAsTouched();
      });
      this.toast.toastCustom('warning', 'Preencha os campos de login corretamente.');
    }
  }

  private salvarLoginLocalStorage(value: any, login: any): any {
    if (value === true) {
      return localStorage.setItem('login', login);
    }
  }

  private verificaLoginLocalStorage(login: any): any {
    if (login) {
      return login;
    } else {
      return null;
    }
  }

  // PRIVATE
  public toastError() {
    this.toast.toastCustom('error', 'Usuário ou senha inválidos');
  }

  public toastSuccessfully() {
    this.toast.toastCustom('success', 'Usuário autenticado com sucesso!');
  }
}
