import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListarColaboradoresRoutingModule } from './listar-colaboradores-routing.module';
import { ListarColaboradoresComponent } from './listar-colaboradores.component';
import { SharedModule } from '../../../../../theme/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ColaboradorModule } from '../../components/colaborador.module';


@NgModule({
  declarations: [ListarColaboradoresComponent],
  imports: [
    CommonModule,
    ListarColaboradoresRoutingModule,
    SharedModule,
    NgxPaginationModule,
    SweetAlert2Module,
    ColaboradorModule
  ]
})
export class ListarColaboradoresModule { }
