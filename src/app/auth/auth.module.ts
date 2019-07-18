import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    CommonModule,
    SharedModule
  ],
  providers: [AuthService]
})
export class AuthModule {}
