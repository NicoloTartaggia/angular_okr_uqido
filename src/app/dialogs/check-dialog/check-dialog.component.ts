import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { Metric, MetricJSON } from '../../shared/models/metric.model';
import { AuthService } from '../../services/auth.service';
import { StateService } from '../../services/state.service';
import { UiService } from '../../services/ui.service';

import { Subscription } from 'rxjs';
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
  selector: 'app-check-dialog',
  templateUrl: './check-dialog.component.html',
  styleUrls: ['./check-dialog.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class CheckDialogComponent implements OnInit {
  private putUrl = 'https://us-central1-okr-platform.cloudfunctions.net/metricsUpdate';
  private postUrl = 'https://us-central1-okr-platform.cloudfunctions.net/metricsCreate';
  private loadingSubs: Subscription;
  public isLoading = false;  // Used for loading spinner
  public modalWithCheck: FormGroup;

  constructor(private dateAdapter: DateAdapter<any>,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<CheckDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private http: HttpClient,
              private authService: AuthService,
              private state: StateService,
              private uiService: UiService) {
    this.dateAdapter.setLocale('it');
  }

  ngOnInit() {
    this.loadingSubs = this.uiService.laodingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    this.modalWithCheck = new FormGroup({
      createdAt: new FormControl(moment()),
      id: new FormControl('', Validators.required)
    });
  }

  get currentState() {
    return this.state;
  }

  onSubmit() {
    this.uiService.laodingStateChanged.next(true);
    this.http.put(`${this.putUrl}/${this.modalWithCheck.value.id}`, {
      author: this.authService.getUserName().displayName,
      checked: true,
      createdAt: this.modalWithCheck.value.createdAt._d
    }).subscribe((result: MetricJSON) => {
      this.uiService.laodingStateChanged.next(false);
      this.state.updateCheckMetricCount(Metric.fromJSON(result));
      // this.state.updateCheckMetric(Metric.fromJSON(result));
      console.log(result);
      this.dialogRef.close();
    });
  }
}
