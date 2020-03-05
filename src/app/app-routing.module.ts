import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import {AuthComponent} from './theme/layout/auth/auth.component';
import { ErrorNotFoundComponent } from './main/pages/page-errors/error-not-found/error-not-found.component';
import { ErrorServidorComponent } from './main/pages/page-errors/error-servidor/error-servidor.component';
import { AuthorizationGuard } from './main/pages/authentication/guards/authorization/authorization.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./main/dashboard/dashboard.module').then(module => module.DashboardModule),
        canActivate: [AuthorizationGuard]
      },
      {
        path: 'forms',
        loadChildren: () => import('./main/pages/form-elements/form-elements.module').then(module => module.FormElementsModule),
        canActivate: [AuthorizationGuard]
      },
      {
        path: 'user',
        loadChildren: () => import('./main/pages/users/users.module').then(module => module.UsersModule),
        canActivate: [AuthorizationGuard]
      },
      {
        path: 'registro',
        // tslint:disable-next-line: max-line-length
        loadChildren: () => import('./main/pages/form-registro-colaborador/form-registro-colaborador.module').then(module => module.FormRegistroColaboradorModule),
        canActivate: [AuthorizationGuard]
      }
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./main/pages/authentication/authentication.module').then(module => module.AuthenticationModule)
      }
    ]
  },
  {
    path: '404',
    component: ErrorNotFoundComponent
  },
  {
    path: '500',
    component: ErrorServidorComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
