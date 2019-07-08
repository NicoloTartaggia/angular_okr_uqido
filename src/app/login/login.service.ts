import * as firebase from 'firebase/app';
import 'firebase/auth';

import { User } from '../shared/models/user.model';

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

export class LoginService {
  private user: User;

  constructor() {}

  public loginWithGoogle() {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        // In memory persistence will be applied to the signed in Google user
        // even though the persistence was set to 'none' and a page redirect
        // occurred.
        return firebase.auth().signInWithRedirect(provider);
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
      });

  }

  public setUser() {
    firebase.auth().getRedirectResult().then(result => {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const token = result.credential.accessToken;
        // ...
      }
      // The signed-in user info.
      this.user = new User(result.user.email, result.user.displayName);
    }).catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
    });
  }

  public getUser(): User {
    return this.user;
  }
}


