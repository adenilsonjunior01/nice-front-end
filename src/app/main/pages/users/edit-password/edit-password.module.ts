import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditPasswordRoutingModule } from './edit-password-routing.module';
import { EditPasswordComponent } from './edit-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../theme/shared/shared.module';


@NgModule({
  declarations: [EditPasswordComponent],
  imports: [
    CommonModule,
    EditPasswordRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class EditPasswordModule { }
