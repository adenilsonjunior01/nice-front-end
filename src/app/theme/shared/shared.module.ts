import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BreadcrumbModule, CardModule } from './components';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ClickOutsideModule } from 'ng-click-outside';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { FormDebugComponent } from './components/form-debug/form-debug.component';
import { CampoControlErroComponent } from './components/campo-control-erro/campo-control-erro.component';
import { ErroMsgComponent } from './components/erro-msg/erro-msg.component';
import { TooltipModule } from 'ngx-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { AlertModule } from 'ngx-bootstrap/alert';
import { TabsModule } from 'ngx-bootstrap';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    BreadcrumbModule,
    ClickOutsideModule,
    TooltipModule,
    NgSelectModule,
    AlertModule,
    TabsModule
  ],
  exports: [
    CommonModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    BreadcrumbModule,
    ClickOutsideModule,
    SpinnerComponent,
    FormDebugComponent,
    CampoControlErroComponent,
    ErroMsgComponent,
    TooltipModule,
    NgSelectModule,
    AlertModule,
    TabsModule
  ],
  declarations: [
    SpinnerComponent,
    FormDebugComponent,
    CampoControlErroComponent,
    ErroMsgComponent
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
  ]
})
export class SharedModule { }
