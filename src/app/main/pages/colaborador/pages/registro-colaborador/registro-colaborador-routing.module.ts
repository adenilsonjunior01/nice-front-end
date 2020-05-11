import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroColaboradorComponent } from './registro-colaborador.component';


const routes: Routes = [
  {
    path: '',
    component: RegistroColaboradorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroColaboradorRoutingModule { }
