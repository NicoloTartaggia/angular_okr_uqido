import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService} from '../services/auth.service';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return this.auth.user$.pipe(
      take(1),  // Emits only the first count values emitted by the source Observable
      // Perform a side effect for every emission on the source Observable, but return an Observable that is identical to the source.
      map(user => {
        if (!user) {
          this.router.navigate(['./login']);
        }
        const email = user.email;
        const notUqido = email.slice(email.indexOf('@') + 1, email.length) !== 'uqido.com';
        if (notUqido) {
          if (notUqido) {
            alert('Il servizio è accessibile solo agli utenti del dominio Uqido');
          }
          console.log('access denied');
          this.router.navigate(['./login']);
          return false;
        }
        console.log('logged in!');
        return true;
      })
    );
  }
}
