import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.auth.user$) {
      this.router.navigate(['../okrs']);
    }
  }

}
