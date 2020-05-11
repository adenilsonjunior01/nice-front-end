import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListarUserRoutingModule } from './listar-user-routing.module';
import { ListarUserComponent } from './listar-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../theme/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import {NgxPaginationModule} from 'ngx-pagination';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { TextMaskModule } from 'angular2-text-mask';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [ListarUserComponent, EditUserComponent],
  imports: [
    CommonModule,
    ListarUserRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgSelectModule,
    NgxPaginationModule,
    TextMaskModule,
    SweetAlert2Module
  ]
})
export class ListarUserModule { }
