import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrentOkrComponent } from './okrs/current-okr/current-okr.component';
import { HttpClientModule } from '@angular/common/http';
import { ObjectivesComponent } from './objectives/objectives.component';
import { KeysComponent } from './keys/keys.component';
import {FormsModule} from "@angular/forms";
import { KeyComponent } from './keys/key/key.component';
import { OkrsComponent } from './okrs/okrs.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentOkrComponent,
    ObjectivesComponent,
    KeysComponent,
    KeyComponent,
    OkrsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
