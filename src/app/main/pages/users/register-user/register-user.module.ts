import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterUserRoutingModule } from './register-user-routing.module';
import { RegisterUserComponent } from './register-user.component';
import { SharedModule } from '../../../../theme/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [RegisterUserComponent],
  imports: [
    CommonModule,
    RegisterUserRoutingModule,
    SharedModule,
    NgSelectModule,
    NgbModule,
    CustomFormsModule,
    TextMaskModule
  ]
})
export class RegisterUserModule { }
