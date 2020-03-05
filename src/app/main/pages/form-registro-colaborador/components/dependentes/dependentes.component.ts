import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-dependentes',
  templateUrl: './dependentes.component.html',
  styleUrls: ['./dependentes.component.scss']
})
export class DependentesComponent implements OnInit {
  formDependentes: FormGroup;
  placement = 'top';
  bsConfig = { adaptivePosition: true, isAnimated: true, containerClass: 'theme-blue' };

  constructor(
    private fb: FormBuilder,
    private bsLocaleService: BsLocaleService
  ) {
    this.bsLocaleService.use('pt-br');
  }

  ngOnInit() {
    this.formDependentes = this.fb.group({
      nm_dependentes: [],
      parentesco: [],
      data_nascimento: [],
      nuCpf: []
    });
  }

}
