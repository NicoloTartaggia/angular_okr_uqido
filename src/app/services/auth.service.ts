import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/models/user.model';

import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import * as firebase from 'firebase';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class AuthService {

  user$: Observable<User>;
  user: User;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          this.user = user;
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }

  public getUserName() {
    return this.user;
  }

  async googleSignin() {
    // Initializing new Google provider
    const provider = new auth.GoogleAuthProvider();

    // Persistence sets to LOCAL, in order to mantain user logged in even if he closes the browser.
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        return firebase.auth().signInWithRedirect(provider)
          .then((results) => {
            console.log(results);
            this.updateUserData(results);
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

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    // Setting merge property to true, we specify that the data should be merged into the existing document.
    // In this way, its contents will not be overwritten.
    return userRef.set(data, { merge: true });
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['../login']);
  }
}
