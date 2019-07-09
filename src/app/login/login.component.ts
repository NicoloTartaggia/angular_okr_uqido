import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    if (this.loginService.getUser()) {
      this.router.navigate(['../okrs']);
    }
  }

  public login() {
    this.loginService.loginWithGoogle();
  }
}
