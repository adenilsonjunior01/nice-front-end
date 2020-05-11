import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { EditPasswordService } from '../services/edit-password/edit-password.service';
import { SweetAlertComponent } from '../../../../theme/shared/components/sweet-alert/sweet-alert.component';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss']
})
export class EditPasswordComponent implements OnInit {
  formPassword: FormGroup;
  private toast = new SweetAlertComponent();

  constructor(private fb: FormBuilder, public service: EditPasswordService) { }

  ngOnInit() {
    this.formulario();
  }
 // /auth/trocaSenha {put} -> JSON {"password":"senhaNova"}
  private formulario(): void {
    const password = new FormControl('', Validators.required);
    const confirmPassword = new FormControl('', [Validators.required, CustomValidators.equalTo(password)]);
    this.formPassword = this.fb.group({
      oldPassword: [null, Validators.required],
      password,
      confirmPassword
    });
  }

  public submitNewPassword() {
    if (this.formPassword.valid) {
      let valuesSubmit = Object.assign({}, this.formPassword.value);
      delete(valuesSubmit.oldPassword);
      delete(valuesSubmit.confirmPassword);
      this.service.submitNewPassword(valuesSubmit).subscribe(
        response => {
          this.toast.toastCustom('success', 'Senha alterada com sucesso');
          this.formPassword.reset();
        },
        err => {
          this.toast.toastCustom('error', 'Não foi possível alterar a senha');
        }
      )
    } else {
      Object.keys(this.formPassword.controls).forEach(campo => {
        const controle = this.formPassword.get(campo);
        controle.markAsTouched();
      });
      this.toast.toastCustom('warning', 'Preencha os campos corretamente.');
    }
  }
}
