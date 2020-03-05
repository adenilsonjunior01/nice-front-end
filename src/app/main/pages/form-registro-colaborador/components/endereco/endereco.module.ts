import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnderecoComponent } from './endereco.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../theme/shared/shared.module';



@NgModule({
  declarations: [EnderecoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [EnderecoComponent]
})
export class EnderecoModule { }
