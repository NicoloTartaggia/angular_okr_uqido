import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-okrs',
  templateUrl: './okrs.component.html',
  styleUrls: ['./okrs.component.scss']
})
export class OkrsComponent implements OnInit {
  constructor(public auth: AuthService, public state: StateService) { }

  ngOnInit() {
    this.state.getOkrs();
  }
}
