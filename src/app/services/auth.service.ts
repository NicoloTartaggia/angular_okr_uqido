import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/models/user.model';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import * as firebase from 'firebase';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class AuthService {

  user$: Observable<User>;

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
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        // const provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider)
          .then((results) => {
            // console.log(results);
            this.updateUserData(results.user);
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
    // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    // const credential = await this.afAuth.auth.signInWithPopup(provider);
    //   // .then((results) => {
    //   //   this.ngZone.run(() => {
    //   //     this.router.navigate(['../okrs']);
    //   //   });
    //   // }).catch(error => {
    //   //   const errorCode = error.code;
    //   //   const errorMessage = error.message;
    //   //   const email = error.email;
    //   //   const credential = error.credential;
    //   // });
    // return this.updateUserData(credential.user);
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

    return userRef.set(data, { merge: true });
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }
}
