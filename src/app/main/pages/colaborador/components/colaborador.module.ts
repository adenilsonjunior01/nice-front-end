import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../theme/shared/shared.module';
import { DocumentosPessoaisComponent } from './documentos-pessoais/documentos-pessoais.component';

import { BsDatepickerModule, AccordionModule } from 'ngx-bootstrap';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { DependentesComponent } from './dependentes/dependentes.component';
import { EditarColaboradorComponent } from './editar-colaborador/editar-colaborador.component';
import { DetalhesColaboradorComponent } from './detalhes-colaborador/detalhes-colaborador.component';
import { ArchwizardModule } from 'ng2-archwizard';
import { ComponentsModule } from '../../../components/components.module';
defineLocale('pt-br', ptBrLocale);


@NgModule({
  declarations: [
    DocumentosPessoaisComponent,
    DependentesComponent,
    EditarColaboradorComponent,
    DetalhesColaboradorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FileUploadModule,
    NgbModule,
    BsDatepickerModule,
    AccordionModule.forRoot(),
    ArchwizardModule,
    ComponentsModule
  ],
  exports: [
    DocumentosPessoaisComponent,
    DependentesComponent,
    EditarColaboradorComponent,
    DetalhesColaboradorComponent,
    ArchwizardModule
  ]
})
export class ColaboradorModule { }
