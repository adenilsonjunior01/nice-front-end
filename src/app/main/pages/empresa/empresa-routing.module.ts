import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'registro',
        loadChildren: () => import('./pages/empresa/registro-empresa.module').then(module => module.RegistroEmpresaModule)
      },
      {
        path: 'listar',
        loadChildren: () => import('./pages/listar/listar.module').then(module => module.ListarModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaRoutingModule { }
