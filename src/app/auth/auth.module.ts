import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';

const config = {
  apiKey: 'AIzaSyC-4wigg58el_UqZ3kJ_YGZmLHHsxcD0JI',
  authDomain: 'okr-platform.firebaseapp.com',
  databaseURL: 'https://okr-platform.firebaseio.com',
  projectId: 'okr-platform',
  storageBucket: 'okr-platform.appspot.com',
  messagingSenderId: '331935303484',
  appId: '1:331935303484:web:7e38cd831da5d3cd'
};

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    CommonModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [AuthService]
})
export class AuthModule {}
