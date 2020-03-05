import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresaRoutingModule } from './empresa-routing.module';
import { EmpresaComponent } from './empresa.component';
import { SharedModule } from '../../../../../theme/shared/shared.module';
import { EnderecoModule } from '../../components/endereco/endereco.module';


@NgModule({
  declarations: [EmpresaComponent],
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    SharedModule,
    EnderecoModule
  ]
})
export class EmpresaModule { }
