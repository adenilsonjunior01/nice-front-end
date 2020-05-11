import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashAnalyticsRoutingModule } from './dash-analytics-routing.module';
import { DashAnalyticsComponent } from './dash-analytics.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbPopoverModule, NgbProgressbarModule} from '@ng-bootstrap/ng-bootstrap';
import { DashboardModule } from '../dashboard.module';

@NgModule({
  imports: [
    CommonModule,
    DashAnalyticsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbProgressbarModule,
    NgbPopoverModule,
    DashboardModule
  ],
  declarations: [
    DashAnalyticsComponent,
  ]
})
export class DashAnalyticsModule { }
