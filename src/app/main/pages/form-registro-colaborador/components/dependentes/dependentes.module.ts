import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DependentesComponent } from './dependentes.component';
import { ReactiveFormsModule } from '@angular/forms';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
defineLocale('pt-br', ptBrLocale);

@NgModule({
  declarations: [DependentesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BsDatepickerModule
  ],
  exports: [DependentesComponent]
})
export class DependentesModule { }
