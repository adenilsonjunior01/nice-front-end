import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditUserRoutingModule } from './edit-user-routing.module';
import { TextMaskModule } from 'angular2-text-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../../../theme/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EditUserRoutingModule,
    TextMaskModule,
    ReactiveFormsModule,
    NgSelectModule,
    SharedModule
  ]
})
export class EditUserModule { }
