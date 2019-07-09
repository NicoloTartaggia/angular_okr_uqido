import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private router: Router, private loginService: LoginService) { }

  canActivate() {
    if (!this.loginService.getUser()) {
      this.router.navigate(['../login']);
      return false;
    }
    return true;
  }
}
