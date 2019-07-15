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

@NgModule({
  imports: [
    ChartsModule,
    CommonModule,
    OkrsRoutingModule,
    SharedModule
  ],
  declarations: [
    CurrentOkrComponent,
    KeyComponent,
    KeysComponent,
    ObjectivesComponent,
    OkrsComponent,
    PieChartComponent
  ]
})
export class OkrsModule { }
