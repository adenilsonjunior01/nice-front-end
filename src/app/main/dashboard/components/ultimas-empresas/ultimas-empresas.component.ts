import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ultimas-empresas',
  templateUrl: './ultimas-empresas.component.html',
  styleUrls: ['./ultimas-empresas.component.scss']
})
export class UltimasEmpresasComponent implements OnInit {
  @Input() datas: any;
  constructor() { }

  ngOnInit() {
  }

}
