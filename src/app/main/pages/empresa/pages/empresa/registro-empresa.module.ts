import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresaRoutingModule } from './registro-empresa-routing.module';
import { SharedModule } from '../../../../../theme/shared/shared.module';
import { NgBrazil } from 'ng-brazil'
import { TextMaskModule } from 'angular2-text-mask';
import { ComponentsModule } from '../../../../components/components.module';
import { RegistroEmpresaComponent } from './registro-empresa.component';

@NgModule({
  declarations: [RegistroEmpresaComponent],
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    SharedModule,
    ComponentsModule,
    NgBrazil,
    TextMaskModule
  ],
  exports: [RegistroEmpresaComponent]
})
export class RegistroEmpresaModule { }
