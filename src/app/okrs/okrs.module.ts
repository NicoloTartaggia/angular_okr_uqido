import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OkrsRoutingModule } from './okrs-routing.module';
import { OkrsComponent } from './okrs.component';
import { CurrentOkrComponent } from './current-okr/current-okr.component';
import { ObjectivesComponent } from '../objectives/objectives.component';
import { KeysComponent } from '../keys/keys.component';
import { KeyComponent } from '../keys/key/key.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    OkrsRoutingModule,
    SharedModule
  ],
  declarations: [
    OkrsComponent,
    CurrentOkrComponent,
    ObjectivesComponent,
    KeysComponent,
    KeyComponent
  ]
})
export class OkrsModule { }
