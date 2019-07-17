import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, OnDestroy} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { UiService } from '../../services/ui.service';
import { AuthService } from '../../services/auth.service';

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
  selector: 'app-limit-dialog',
  templateUrl: './limit-dialog.component.html',
  styleUrls: ['./limit-dialog.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class LimitDialogComponent implements OnInit, OnDestroy {
  private postUrl = 'https://us-central1-okr-platform.cloudfunctions.net/metricsCreate';
  private loadingSubs: Subscription;
  public isLoading = false;  // Used for loading spinner
  public modalWithLimit: FormGroup;

  constructor(private dateAdapter: DateAdapter<any>,
              public dialogRef: MatDialogRef<LimitDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private http: HttpClient,
              private authService: AuthService,
              private uiService: UiService) {
    this.dateAdapter.setLocale('it');
  }

  ngOnInit() {
    this.loadingSubs = this.uiService.laodingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    this.modalWithLimit = new FormGroup({
      description: new FormControl('', Validators.required),
      author: new FormControl(''),
      createdAt: new FormControl(moment())
    });
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

  onSubmit() {
    this.uiService.laodingStateChanged.next(true);
    this.http.post(this.postUrl, {
      author: this.getAuthor(),
      createdAt: this.modalWithLimit.value.createdAt._d,
      description: this.modalWithLimit.value.description,
      keyId: this.data.id
    }).subscribe(result => {
      this.uiService.laodingStateChanged.next(false);
      console.log(result);
      this.dialogRef.close();
    });
  }

  public getAuthor(): string {
    if (!this.modalWithLimit.value.author) {
      return this.authService.getUserName().displayName;
    }
    return this.modalWithLimit.value.author;
  }
}
