import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OkrsComponent } from './okrs.component';
import {MetricsComponent} from '../keys/key/metrics/metrics.component';

const routes: Routes = [
  {
    path: '',
    component: OkrsComponent
  },
  {
    path: 'keys/:id/metrics', component: MetricsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OkrsRoutingModule { }
