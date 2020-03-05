import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentosPessoaisComponent } from './documentos-pessoais.component';
import { SharedModule } from '../../../../../theme/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
defineLocale('pt-br', ptBrLocale);


@NgModule({
  declarations: [DocumentosPessoaisComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FileUploadModule,
    NgbModule,
    BsDatepickerModule
  ],
  exports: [DocumentosPessoaisComponent]
})
export class DocumentosPessoaisModule { }
