import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RegistroColaboradorService } from '../../pages/colaborador/services/registro-colaborador/registro-colaborador.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { RegistroEmpresaService } from '../../pages/empresa/services/registro-empresa.service';
import { DadosPessoais } from '../../interfaces/dadosPessoais';

@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.scss']
})
export class DadosPessoaisComponent implements OnInit {
  @Input() form: FormGroup;
  placement = 'top';
  bsConfig = { adaptivePosition: true, isAnimated: true, containerClass: 'theme-blue', dateInputFormat: "YYYY-MM-DD" };
  escolaridades: any[] = [];
  valorTrue =  true;
  valorFalse =  false;

  constructor(
    private bsLocaleService: BsLocaleService,
    private  _serviceEmpresa: RegistroEmpresaService) {
    this.bsLocaleService.use('pt-br');
  }

  ngOnInit() {
    this.escolaridades = this._serviceEmpresa.grauDeEscolaridade();
  }

  onChange(event) {

    const fileSelected = <FileList>event.srcElement.files;
    this.form.get('anexo_escolaridade').setValue(fileSelected);
  }
}
