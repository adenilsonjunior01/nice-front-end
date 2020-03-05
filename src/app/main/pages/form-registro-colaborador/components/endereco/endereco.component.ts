import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss']
})
export class EnderecoComponent implements OnInit {
  formAdress: FormGroup;
 @Output() endereco = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.formAdress = this.fb.group({
      endereco: this.fb.group({
        cidade: [],
        estado: [],
        rua: [],
        bairro: [],
        numero: [],
        cep: [],
        complemento: []
      })
    });
  }
  public getEndereco() {
    this.endereco.emit(this.formAdress.value);
  }
}
