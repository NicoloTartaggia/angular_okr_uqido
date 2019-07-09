import * as firebase from 'firebase/app';
import 'firebase/auth';

import { User } from '../shared/models/user.model';
import { Router } from '@angular/router';
import { Injectable, NgZone} from '@angular/core';

firebase.initializeApp({
  apiKey: 'AIzaSyC-4wigg58el_UqZ3kJ_YGZmLHHsxcD0JI',
  authDomain: 'okr-platform.firebaseapp.com',
  databaseURL: 'https://okr-platform.firebaseio.com',
  projectId: 'okr-platform',
  storageBucket: 'okr-platform.appspot.com',
  messagingSenderId: '331935303484',
  appId: '1:331935303484:web:7e38cd831da5d3cd'
});

// const provider = new firebase.auth.GoogleAuthProvider();

@Injectable()
export class LoginService {
  private user: any;

  constructor(private router: Router, private ngZone: NgZone) {

  }

  public loginWithGoogle() {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        // const provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
          .then((results) => {
            // console.log(results);
            this.user = results.user;
            this.ngZone.run(() => {
              this.router.navigate(['../okrs']);
            });
          }).catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = error.credential;
          });
      });
  }

  public getUser() {
    return this.user;
  }
}


