import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnderecoComponent } from './endereco/endereco.component';
import { SharedModule } from '../../theme/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { DadosPessoaisComponent } from './dados-pessoais/dados-pessoais.component';
import { BsDatepickerModule } from 'ngx-bootstrap';



@NgModule({
  declarations: [
    EnderecoComponent,
    DadosPessoaisComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgbModule,
    NgSelectModule,
    FileUploadModule,
    BsDatepickerModule
  ],
  exports: [
    EnderecoComponent,
    DadosPessoaisComponent
  ]
})
export class ComponentsModule { }
