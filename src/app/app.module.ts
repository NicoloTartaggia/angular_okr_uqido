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
import { MetricsComponent } from './keys/key/metrics/metrics.component';
import { StateService } from './services/state.service';

@NgModule({
  declarations: [
    AppComponent,
    MetricsComponent,
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
  exports: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
