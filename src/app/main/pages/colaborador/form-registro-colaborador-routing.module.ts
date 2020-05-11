import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'registro',
        loadChildren: () => import('./pages/registro-colaborador/registro-colaborador.module').then(module => module.RegistroColaboradorModule)
      },
      {
        path: 'listar',
        loadChildren: () => import('./pages/listar-colaboradores/listar-colaboradores.module').then(module => module.ListarColaboradoresModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRegistroColaboradorRoutingModule { }
