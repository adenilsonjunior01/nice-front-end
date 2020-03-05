import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'colaborador',
        loadChildren: () => import('./registro/colaborador/registro-colaborador.module').then(module => module.RegistroColaboradorModule)
      },
      {
        path: 'empresa',
        loadChildren: () => import('./registro/empresa/empresa.module').then(module => module.EmpresaModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRegistroColaboradorRoutingModule { }
