import { DocumentosPessoaisModule } from './../../components/documentos-pessoais/documentos-pessoais.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroColaboradorRoutingModule } from './registro-colaborador-routing.module';
import { RegistroColaboradorComponent } from './registro-colaborador.component';
import { SharedModule } from '../../../../../theme/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ArchwizardModule } from 'ng2-archwizard';
import { EnderecoModule } from '../../components/endereco/endereco.module';
import { DadosPessoaisModule } from '../../components/dados-pessoais/dados-pessoais.module';
import { DependentesModule } from '../../components/dependentes/dependentes.module';

@NgModule({
  declarations: [RegistroColaboradorComponent],
  imports: [
    CommonModule,
    RegistroColaboradorRoutingModule,
    SharedModule,
    NgbModule,
    NgSelectModule,
    ArchwizardModule,

    EnderecoModule,
    DadosPessoaisModule,
    DependentesModule,
    DocumentosPessoaisModule
  ]
})
export class RegistroColaboradorModule { }
