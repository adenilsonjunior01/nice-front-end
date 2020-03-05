import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResolveEditUserGuard } from './guards/resolve-edit-user.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'register',
        loadChildren: () => import('./register-user/register-user.module').then(module => module.RegisterUserModule)
      },
      {
        path: 'listar',
        loadChildren: () => import('./listar-user/listar-user.module').then(module => module.ListarUserModule)
      },
      {
        path: 'editar/senha',
        loadChildren: () => import('../users/edit-password/edit-password.module').then(module => module.EditPasswordModule)
      },
      // ROTA TEMPORÁRIA PARA TESTE
      {
        path: 'editar',
        loadChildren: () => import('./edit-user/edit-user.module').then(module => module.EditUserModule),
      }
      /*{
        path: 'editar/:id',
        loadChildren: () => import('./edit-user/edit-user.module').then(module => module.EditUserModule),
        resolve: {
          user: ResolveEditUserGuard
        }
      }*/
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
