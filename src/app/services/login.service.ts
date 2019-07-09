import * as firebase from 'firebase/app';
import 'firebase/auth';

import { User } from '../shared/models/user.model';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

firebase.initializeApp({
  apiKey: 'AIzaSyC-4wigg58el_UqZ3kJ_YGZmLHHsxcD0JI',
  authDomain: 'okr-platform.firebaseapp.com',
  databaseURL: 'https://okr-platform.firebaseio.com',
  projectId: 'okr-platform',
  storageBucket: 'okr-platform.appspot.com',
  messagingSenderId: '331935303484',
  appId: '1:331935303484:web:7e38cd831da5d3cd'
});

const provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

export class LoginService {
  private user: User;

  constructor(private router: Router, private ngZone: NgZone) {}

  public loginWithGoogle() {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        return firebase.auth().signInWithPopup(provider).then(result => {
          // This gives you a Google Access Token. You can use it to acc  ess the Google API.
          // const token = result.credential.accessToken;
          this.user = new User(result.user.displayName, result.user.email);
          console.log(this.user.name, this.user.email);
          this.ngZone.run(() => {
            this.router.navigate(['../okrs']);
          });
          // ...
        }).catch(error => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          const credential = error.credential;
        });
      });
  }

  public setUser() {

  }

  public getUser(): User {
    return this.user;
  }

  public isLoggedIn() {
    console.log(firebase.auth().currentUser);
    return firebase.auth().currentUser;
  }
}


