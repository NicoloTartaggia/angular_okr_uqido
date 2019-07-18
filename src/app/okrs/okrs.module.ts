import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObjectivesComponent } from '../objectives/objectives.component';
import { CurrentOkrComponent } from './current-okr/current-okr.component';
import { KeysComponent } from '../keys/keys.component';
import { KeyComponent } from '../keys/key/key.component';
import { OkrsComponent } from './okrs.component';
import { OkrsRoutingModule } from './okrs-routing.module';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { SharedModule } from '../shared/shared.module';
import { ChartsModule } from 'ng2-charts';

import { LimitDialogComponent } from '../dialogs/limit-dialog/limit-dialog.component';
import { CheckDialogComponent } from '../dialogs/check-dialog/check-dialog.component';
import { CheckMetricsComponent } from '../dialogs/metrics-dialog/check-metrics/check-metrics.component';
import { LimitMetricsComponent } from '../dialogs/metrics-dialog/limit-metrics/limit-metrics.component';


@NgModule({
  imports: [
    ChartsModule,
    CommonModule,
    OkrsRoutingModule,
    SharedModule
  ],
  declarations: [
    CheckDialogComponent,
    CheckMetricsComponent,
    CurrentOkrComponent,
    KeyComponent,
    KeysComponent,
    LimitDialogComponent,
    LimitMetricsComponent,
    ObjectivesComponent,
    OkrsComponent,
    PieChartComponent
  ],
  entryComponents: [
    CheckDialogComponent,
    CheckMetricsComponent,
    LimitDialogComponent,
    LimitMetricsComponent
  ]
})
export class OkrsModule { }
