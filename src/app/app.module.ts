import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';

import { CurrentOkrComponent } from './okrs/current-okr/current-okr.component';
import { KeyComponent } from './keys/key/key.component';
import { KeysComponent } from './keys/keys.component';
import { ObjectivesComponent } from './objectives/objectives.component';
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
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
