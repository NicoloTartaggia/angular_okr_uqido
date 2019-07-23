import {ChangeDetectionStrategy, Component, Input, NgZone, OnInit} from '@angular/core';
import { Key } from '../../shared/models/key.model';
import { MatDialog } from '@angular/material';
import { LimitDialogComponent } from '../../dialogs/limit-dialog/limit-dialog.component';
import { CheckDialogComponent } from '../../dialogs/check-dialog/check-dialog.component';
import { Router } from '@angular/router';
import {MetricsService} from '../../services/metrics.service';
import {StateService} from '../../services/state.service';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeyComponent implements OnInit {
  @Input()
  key: Key;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {}

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
