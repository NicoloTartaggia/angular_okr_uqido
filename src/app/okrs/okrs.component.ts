import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StateService } from '../services/state.service';
import { Okr } from '../shared/models/okr.model';

@Component({
  selector: 'app-okrs',
  templateUrl: './okrs.component.html',
  styleUrls: ['./okrs.component.scss']
})
export class OkrsComponent implements OnInit {

  constructor(public auth: AuthService,
              public state: StateService) { }

  ngOnInit() {
    this.state.getOkrs();
  }

  okrsToArray(okrs): Okr[] {
    return Object.values(okrs);
  }

  updateQuarter(okr: Okr, sidenav) {
    sidenav.toggle();
    this.state.updateCurrentOkr(okr);
  }
}
