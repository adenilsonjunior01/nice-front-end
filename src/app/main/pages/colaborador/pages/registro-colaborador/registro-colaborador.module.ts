import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroColaboradorRoutingModule } from './registro-colaborador-routing.module';
import { RegistroColaboradorComponent } from './registro-colaborador.component';
import { SharedModule } from '../../../../../theme/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ArchwizardModule } from 'ng2-archwizard';

import { ComponentsModule } from '../../../../components/components.module';
import { TextMaskModule } from 'angular2-text-mask';
import { NgBrazil } from 'ng-brazil';
import { ColaboradorModule } from '../../components/colaborador.module';

@NgModule({
  declarations: [RegistroColaboradorComponent],
  imports: [
    CommonModule,
    RegistroColaboradorRoutingModule,
    SharedModule,
    NgbModule,
    NgSelectModule,
    ArchwizardModule,

    ComponentsModule,
    ColaboradorModule,
    NgBrazil,
    TextMaskModule
  ]
})
export class RegistroColaboradorModule { }
