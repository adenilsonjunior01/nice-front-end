import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarUserComponent } from './listar-user.component';


const routes: Routes = [
  {
    path: '',
    component: ListarUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListarUserRoutingModule { }
