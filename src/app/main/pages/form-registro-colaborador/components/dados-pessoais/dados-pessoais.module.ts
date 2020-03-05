import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DadosPessoaisComponent } from './dados-pessoais.component';
import { SharedModule } from '../../../../../theme/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from '@iplab/ngx-file-upload';


@NgModule({
  declarations: [DadosPessoaisComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgbModule,
    NgSelectModule,
    FileUploadModule
  ],
  exports: [DadosPessoaisComponent]
})
export class DadosPessoaisModule { }
