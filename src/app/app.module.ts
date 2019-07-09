import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { LoginService } from './services/login.service';
import { SharedModule } from './shared/shared.module';
import { LoginGuard } from './services/login-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    LoginService,    // Using the same instance of this service
    LoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
