import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ListarUserService } from '../services/listar-user/listar-user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  public formUser: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: ListarUserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const user = this.route.snapshot.data.user;
    // VERIFICAR SE PODE ALTERAR SENHA POR AQUI
    this.formUser = this.fb.group({
      /*nome: [user.nome],
      cep: [user.cep],
      cd_cidade: [user.cd_cidade],
      cd_estado: [user.cd_estado],
      sexo: [user.sexo],
      idEmpresa: [user.idEmpresa],
      idPerfil: [user.idPerfil],
      email: [user.email, Validators.email],
      telefone: [user.telefone],
      endereco: [user.endereco]*/

      nome: [null, Validators.required],
      cep: [null, Validators.required],
      cd_cidade: [null, Validators.required],
      cd_estado: [null, Validators.required],
      sexo: ['2', Validators.required],
      idEmpresa: [null, Validators.required],
      idPerfil: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      telefone: [],
      endereco: [null, Validators.required],
    });
  }

}
