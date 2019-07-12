import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [AuthService]
})
export class AuthModule {}
