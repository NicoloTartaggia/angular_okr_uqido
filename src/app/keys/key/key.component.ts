import { Component, Input, OnInit } from '@angular/core';
import { Key } from '../../shared/models/key.model';
import { MatDialog } from '@angular/material';
import { LimitDialogComponent } from '../../dialog/limit-dialog/limit-dialog.component';
import { CheckDialogComponent } from '../../dialog/check-dialog/check-dialog.component';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent implements OnInit {
  @Input()
  key: Key;

  private metricUrl = `https://us-central1-okr-platform.cloudfunctions.net/metricsCreate`;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {}

  public keyPercentage() {
    if (!this.key) {
      return '0';
    }
    if (this.key.evaluationType !== 'check') {
      return Math.floor((this.key.metricsCount / this.key.limit) * 100);
    } else {

     }
  }

  public openDialog() {
    const data = {
      title: this.key.description,
        evaluationType: this.key.evaluationType,
        id: this.key.id,
        metrics: this.key.metrics
    };
    if (this.key.evaluationType === 'limit') {
      this.dialog.open(LimitDialogComponent, {
        data
      });
    } else {
      this.dialog.open(CheckDialogComponent, {
        data
      });
    }
  }
}
