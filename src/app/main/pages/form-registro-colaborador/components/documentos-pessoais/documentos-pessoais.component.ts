import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-documentos-pessoais',
  templateUrl: './documentos-pessoais.component.html',
  styleUrls: ['./documentos-pessoais.component.scss']
})
export class DocumentosPessoaisComponent implements OnInit {
  formDocumentosPessoais: FormGroup;
  bsConfig = { adaptivePosition: true, isAnimated: true, containerClass: 'theme-blue' };
  placement = 'bottom';
  constructor(
    private fb: FormBuilder,
    private bsLocaleService: BsLocaleService
  ) {
    this.bsLocaleService.use('pt-br');
  }

  ngOnInit() {
    this.formDocumentosPessoais = this.fb.group({
      carteira_trabalho: this.fb.group({
        numero: [],
        serie: [],
        estado_emissor: [],
        data_emissao: []
      }),
      identidade: this.fb.group({
        numero: [],
        serie: [],
        estado_emissor: [],
        data_emissao: []
      }),
      titulo_eleitor: this.fb.group({
        numero: [],
        zona: [],
        secao: [],
        estado_emissor: [],
        data_emissao: []
      }),
      cpf: this.fb.group({
        numero: [],
        certidao_regularidade: []
      }),
      certidao_reservista: this.fb.group({
        numero: [],
        serie: [],
        categoria: [],
        data_emissao: []
      }),
      pis: this.fb.group({
        numero: [],
        nm_banco: [],
        nu_agencia: [],
        nu_conta: []
      }),
      info_complementar: this.fb.group({
        seguro_desemprego: [null],
        vinculos_trabalhistas: [null],
        alteracao_nome: [null],
        portador_deficiencia: [null]
      })
    });
  }

}
