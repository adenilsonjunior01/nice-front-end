import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ultimos-usuarios',
  templateUrl: './ultimos-usuarios.component.html',
  styleUrls: ['./ultimos-usuarios.component.scss']
})
export class UltimosUsuariosComponent implements OnInit {
  @Input() datas: any;
  constructor() { }

  ngOnInit() {
  }

  public verificaPerfil(perfil: any): string {
    switch(perfil) {
      case 1: return 'ADMINISTRADOR';
      case 2: return 'COLABORADOR'
    }
  }
}
