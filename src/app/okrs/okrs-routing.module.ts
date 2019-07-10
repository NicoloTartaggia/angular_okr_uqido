import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OkrsComponent } from './okrs.component';

const routes: Routes = [
  {
    path: '',
    component: OkrsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OkrsRoutingModule { }
