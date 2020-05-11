import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CustomService } from '../../pages/users/services/custom.service';
import { SweetAlertComponent } from '../../../theme/shared/components/sweet-alert/sweet-alert.component';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss']
})
export class EnderecoComponent implements OnInit {
  @Output() endereco = new EventEmitter<any>();
  @Input() form: FormGroup;
  loading = false;
  toast = new SweetAlertComponent;
  constructor(
    private fb: FormBuilder,
    private customService: CustomService
  ) { }

  ngOnInit() {
  }

  public getDataAddress(value: any) {
    const cep = value.replace(/\D/g, '');
    if (cep !== '') {
      const validCep = /^[0-9]{8}$/;
      if (validCep.test(cep)) {
        this.loading = true;
        this.customService.getDatas(cep).subscribe(
          response => {
            this.loading = false;
            this.form.get('rua').setValue(response.logradouro);
            this.form.get('estado').setValue(response.uf);
            this.form.get('cidade').setValue(response.localidade);
            this.form.get('bairro').setValue(response.bairro);
          }, err => {
            this.loading = false;
            this.toast.toastCustom('warning', 'Não foi possível encontrar seu endereço.');
          }
        )
      }
    }
  }

}
