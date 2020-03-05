import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RegistroColaboradorService } from '../../services/registro-colaborador/registro-colaborador.service';

@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.scss']
})
export class DadosPessoaisComponent implements OnInit {
  formDadosPessoais: FormGroup;
  placement = 'top';
  escolaridades: any[] = [];

  constructor(
    private fb: FormBuilder,
    private service: RegistroColaboradorService
  ) { }

  ngOnInit() {
    this.escolaridades = this.service.grauDeEscolaridade();

    this.formDadosPessoais = this.fb.group({
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
    });
  }

}
