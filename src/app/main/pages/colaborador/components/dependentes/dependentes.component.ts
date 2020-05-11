import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { MASKS } from 'ng-brazil';
import { ValidateBrService } from 'angular-validate-br';

@Component({
  selector: 'app-dependentes',
  templateUrl: './dependentes.component.html',
  styleUrls: ['./dependentes.component.scss']
})
export class DependentesComponent implements OnInit {
  @Input() form: FormGroup;

  placement = 'top';
  bsConfig = { adaptivePosition: true, isAnimated: true, containerClass: 'theme-blue', dateInputFormat: "YYYY-MM-DD" };
  public MASKS = MASKS;
  public maskCpf = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/,];

  constructor(private bsLocaleService: BsLocaleService, private validateBrService: ValidateBrService) {
    this.bsLocaleService.use('pt-br');
  }

  ngOnInit() {
   }

}
