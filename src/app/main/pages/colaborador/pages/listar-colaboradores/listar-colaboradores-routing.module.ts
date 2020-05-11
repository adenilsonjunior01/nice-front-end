import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarColaboradoresComponent } from './listar-colaboradores.component';


const routes: Routes = [
  {
    path: '',
    component: ListarColaboradoresComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListarColaboradoresRoutingModule { }
