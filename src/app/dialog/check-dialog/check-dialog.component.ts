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
  selector: 'app-check-dialog',
  templateUrl: './check-dialog.component.html',
  styleUrls: ['./check-dialog.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class CheckDialogComponent implements OnInit {
  public modalWithCheck: FormGroup;
  private putUrl = 'https://us-central1-okr-platform.cloudfunctions.net/metricsUpdate';

  constructor(private dateAdapter: DateAdapter<any>,
              public dialogRef: MatDialogRef<CheckDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private http: HttpClient,
              private authService: AuthService) {
    this.dateAdapter.setLocale('it');
  }

  ngOnInit() {
    this.modalWithCheck = new FormGroup({
      createdAt: new FormControl(moment()),
      id: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.http.put(`${this.putUrl}/${this.modalWithCheck.value.id}`, {
      author: this.authService.getUserName().displayName,
      checked: true,
      createdAt: this.modalWithCheck.value.createdAt._d
    }).subscribe(results => {
      console.log(results);
    });
    this.dialogRef.close();
  }
}
