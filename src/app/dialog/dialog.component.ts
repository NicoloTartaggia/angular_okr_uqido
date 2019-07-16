import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class DialogComponent implements OnInit {
  public modalWithLimit: FormGroup;
  public modalWithCheck: FormGroup;
  constructor(private dateAdapter: DateAdapter<any>,
              public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dateAdapter.setLocale('it');
  }

  ngOnInit() {
    // Control variables used to bind with forms, following the reactive forms approach
    this.modalWithLimit = new FormGroup({
      limitMetric: new FormControl('', Validators.required),
      dateMetric: new FormControl(moment()),
    });

    this.modalWithCheck = new FormGroup({
      checkMetric: new FormControl(''),
      dateMetric: new FormControl(moment()),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onLimitSubmit() {
    console.log(this.modalWithLimit);
    // try {
    //   this.dialogRef.beforeClosed().subscribe(result => {
    //
    //   })
    // } catch (err) {
    //   console.log(err);
    // }
  }

  onCheckSubmit() {
    try {

    } catch (err) {
      console.log(err);
    }
  }
}
