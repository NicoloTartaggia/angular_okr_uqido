import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AuthComponent } from './auth/auth.component';
import { AuthGuard} from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './services/auth.service';
import { SharedModule } from './shared/shared.module';
import { LimitDialogComponent } from './dialogs/limit-dialog/limit-dialog.component';
import { CheckDialogComponent } from './dialogs/check-dialog/check-dialog.component';
import { MetricsDialogComponent } from './dialogs/metrics-dialog/metrics-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LimitDialogComponent,
    CheckDialogComponent,
    MetricsDialogComponent
  ],
  imports: [
    AppRoutingModule,
    AuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule
  ],
  entryComponents: [
    CheckDialogComponent,
    LimitDialogComponent,
    MetricsDialogComponent
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
