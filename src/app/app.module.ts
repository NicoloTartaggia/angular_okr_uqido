import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AuthGuard} from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './services/auth.service';
import { SharedModule } from './shared/shared.module';
import { UiService } from './services/ui.service';
import { StateService } from './services/state.service';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent
  ],
  imports: [
    AppRoutingModule,
    AuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    StateService,
    UiService
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  exports: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
