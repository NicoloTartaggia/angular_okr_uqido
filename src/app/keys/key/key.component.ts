import { Component, Input, NgZone, OnInit } from '@angular/core';
import { Key } from '../../shared/models/key.model';
import { MatDialog } from '@angular/material';
import { LimitDialogComponent } from '../../dialogs/limit-dialog/limit-dialog.component';
import { CheckDialogComponent } from '../../dialogs/check-dialog/check-dialog.component';
import { Router } from '@angular/router';
import {MetricsService} from '../../services/metrics.service';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent implements OnInit {
  @Input()
  key: Key;

  constructor(private router: Router,
              private ngZone: NgZone,
              private metricsService: MetricsService,
              public dialog: MatDialog) { }

  ngOnInit() {
  }

  public keyPercentage() {
    if (!this.key || this.key.metricsCount === 0) {
      return '0';
    }
    if (this.key.evaluationType !== 'check') {
      return Math.floor((this.key.metricsCount / this.key.limit) * 100);
    } else {
      return Math.floor((this.key.metricsChecked / this.key.metricsCount) * 100);
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

  public async goToMetrics() {
    if (this.key) {
      await this.metricsService.setMetrics(this.key.metrics);
    }
    this.ngZone.run(() => {
      this.router.navigate(['/metrics']);
    });
  }
}
