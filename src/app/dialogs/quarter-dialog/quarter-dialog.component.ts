import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DateAdapter, MatDialogRef } from '@angular/material';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Okr, OkrJSON } from '../../shared/models/okr.model';
import { StateService } from '../../services/state.service';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
// @ts-ignore
import { default as _rollupMoment } from 'moment';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-quarter-dialog',
  templateUrl: './quarter-dialog.component.html',
  styleUrls: ['./quarter-dialog.component.scss']
})
export class QuarterDialogComponent implements OnInit, OnDestroy {

  private postUrl = 'https://us-central1-okr-platform.cloudfunctions.net/okrCreate';
  // private postUrl = 'https://localhost:5001/okr-platform/us-central1/okrCreate';
  private subscriptions: Subscription[] = [];
  public isLoading = false;  // Used for loading spinner
  public quarterModal: FormGroup;

  constructor(private http: HttpClient,
              private dateAdapter: DateAdapter<any>,
              private state: StateService,
              private uiService: UiService,
              public dialogRef: MatDialogRef<QuarterDialogComponent>) {
    this.dateAdapter.setLocale('it');
  }

  ngOnInit() {
    this.subscriptions.push(this.uiService.laodingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    }));
    this.quarterModal = new FormGroup({
      createdAt: new FormControl(Validators.required),
      endingAt: new FormControl(Validators.required)
    });
  }

  onSubmit() {
    this.uiService.laodingStateChanged.next(true);
    this.http.post(this.postUrl, {
      createdAt: this.quarterModal.value.createdAt,
      endingAt: this.quarterModal.value.endingAt
    }).subscribe((result: OkrJSON) => {
      console.log(result);
      this.uiService.laodingStateChanged.next(false);
      // this.state.updateCurrentOkr(Okr.fromJSON(result));
      this.dialogRef.close();
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
