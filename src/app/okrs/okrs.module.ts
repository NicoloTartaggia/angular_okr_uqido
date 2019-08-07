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
import { QuarterDialogComponent } from '../dialogs/quarter-dialog/quarter-dialog.component';
import { ObjectiveDialogComponent } from '../dialogs/objective-dialog/objective-dialog.component';
import { KeyDialogComponent } from '../dialogs/key-dialog/key-dialog.component';

@NgModule({
  imports: [
    ChartsModule,
    CommonModule,
    OkrsRoutingModule,
    SharedModule
  ],
  declarations: [
    CheckDialogComponent,
    CurrentOkrComponent,
    KeyComponent,
    KeysComponent,
    KeyDialogComponent,
    LimitDialogComponent,
    ObjectivesComponent,
    OkrsComponent,
    PieChartComponent,
    QuarterDialogComponent,
    ObjectiveDialogComponent
  ],
  exports: [],
  entryComponents: [
    CheckDialogComponent,
    LimitDialogComponent,
    KeyDialogComponent,
    ObjectiveDialogComponent,
    QuarterDialogComponent
  ]
})
export class OkrsModule { }
