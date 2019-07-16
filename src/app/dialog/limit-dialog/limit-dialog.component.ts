import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
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
  selector: 'app-limit-dialog',
  templateUrl: './limit-dialog.component.html',
  styleUrls: ['./limit-dialog.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class LimitDialogComponent implements OnInit {
  public modalWithLimit: FormGroup;
  private postUrl = 'https://us-central1-okr-platform.cloudfunctions.net/metricsCreate';

  constructor(private dateAdapter: DateAdapter<any>,
              public dialogRef: MatDialogRef<LimitDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private http: HttpClient,
              private authService: AuthService) {
    this.dateAdapter.setLocale('it');
  }

  ngOnInit() {
    this.modalWithLimit = new FormGroup({
      description: new FormControl('', Validators.required),
      createdAt: new FormControl(moment()),
    });
  }

  onSubmit() {
    this.http.post(this.postUrl, {
      description: this.modalWithLimit.value.description,
      createdAt: this.modalWithLimit.value.createdAt._d,
      author: this.authService.getUserName().displayName,
      keyId: this.data.id
    });
  }
}