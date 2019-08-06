import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StateService } from '../services/state.service';
import { Okr } from '../shared/models/okr.model';
import {MatDialog} from '@angular/material';
import {LimitDialogComponent} from '../dialogs/limit-dialog/limit-dialog.component';
import {QuarterDialogComponent} from '../dialogs/quarter-dialog/quarter-dialog.component';

@Component({
  selector: 'app-okrs',
  templateUrl: './okrs.component.html',
  styleUrls: ['./okrs.component.scss']
})
export class OkrsComponent implements OnInit {

  constructor(public auth: AuthService,
              public state: StateService,
              public dialog: MatDialog) { }

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

  createQuarter(sidenav) {
    sidenav.toggle();
    this.dialog.open(QuarterDialogComponent);
  }
}
