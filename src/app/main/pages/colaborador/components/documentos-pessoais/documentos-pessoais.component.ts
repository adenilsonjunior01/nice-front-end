import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-documentos-pessoais',
  templateUrl: './documentos-pessoais.component.html',
  styleUrls: ['./documentos-pessoais.component.scss']
})
export class DocumentosPessoaisComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() visibleCpf: boolean;
  formDocumentosPessoais: FormGroup;
  bsConfig = { adaptivePosition: true, isAnimated: true, containerClass: 'theme-blue', dateInputFormat: "YYYY-MM-DD" };
  placement = 'bottom';
  valorTrue =  true;
  valorFalse =  false;

  constructor(
    private fb: FormBuilder,
    private bsLocaleService: BsLocaleService
  ) {
    this.bsLocaleService.use('pt-br');
  }

  ngOnInit() {
  }

}
