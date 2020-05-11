import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListarRoutingModule } from './listar-routing.module';
import { ListarComponent } from './listar.component';
import { SharedModule } from '../../../../../theme/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalDetalhesEmpresaComponent } from '../../components/modal-detalhes-empresa/modal-detalhes-empresa.component';
import { NgBrazil } from 'ng-brazil';
import { EditarEmpresaComponent } from '../editar-empresa/editar-empresa.component';
import { ComponentsModule } from '../../../../components/components.module';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [
    ListarComponent,
    ModalDetalhesEmpresaComponent,
    EditarEmpresaComponent
  ],
  imports: [
    CommonModule,
    ListarRoutingModule,
    SharedModule,
    NgxPaginationModule,
    NgBrazil,
    ComponentsModule,
    TextMaskModule
  ]
})
export class ListarModule { }
