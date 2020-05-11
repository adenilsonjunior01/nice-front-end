import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ultimos-colaboradores',
  templateUrl: './ultimos-colaboradores.component.html',
  styleUrls: ['./ultimos-colaboradores.component.scss']
})
export class UltimosColaboradoresComponent implements OnInit {
  @Input() datas: any;
  constructor() { }

  ngOnInit() {
  }

}
