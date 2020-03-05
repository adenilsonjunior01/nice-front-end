import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListarUserRoutingModule } from './listar-user-routing.module';
import { ListarUserComponent } from './listar-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../theme/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [ListarUserComponent],
  imports: [
    CommonModule,
    ListarUserRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgSelectModule
  ]
})
export class ListarUserModule { }
