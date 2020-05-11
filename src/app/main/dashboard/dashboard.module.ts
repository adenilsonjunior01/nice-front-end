import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {SharedModule} from '../../theme/shared/shared.module';
import { UltimasEmpresasComponent } from './components/ultimas-empresas/ultimas-empresas.component';
import { UltimosColaboradoresComponent } from './components/ultimos-colaboradores/ultimos-colaboradores.component';
import { UltimosUsuariosComponent } from './components/ultimos-usuarios/ultimos-usuarios.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ],
  declarations: [
    UltimasEmpresasComponent,
    UltimosColaboradoresComponent,
    UltimosUsuariosComponent
  ],
  exports: [
    UltimasEmpresasComponent,
    UltimosColaboradoresComponent,
    UltimosUsuariosComponent
  ]
})
export class DashboardModule { }
