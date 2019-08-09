import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Location} from '@angular/common';
import {StateService} from '../../../services/state.service';
import {Metric} from '../../../shared/models/metric.model';
import {Observable, Subscription} from 'rxjs';
import {UiService} from '../../../services/ui.service';
import {ConfirmDialogComponent} from '../../../dialogs/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material';
import {MetricDialogComponent} from '../../../dialogs/metric-dialog/metric-dialog.component';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class MetricsComponent implements OnInit {

  displayedColumns: string[] = ['author', 'description', 'data', 'action'];
  id: string;
  private metricsDeleteUrl = 'https://us-central1-okr-platform.cloudfunctions.net/metricsDelete';
  public isLoading$: Observable<boolean>;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private uiService: UiService,
              public dialog: MatDialog,
              public location: Location,
              public state: StateService
  ) {
  }

  ngOnInit() {
    this.isLoading$ = this.uiService.laodingStateChanged;
    this.id = this.route.snapshot.paramMap.get('id');
    this.state.getMetricsWithKeyId(this.id);
  }

  filterByKeyId(metric) {
    if (!metric) {
      return [];
    }
    return Object.values(metric).filter((data: Metric) => data.keyId === this.id);
  }

  deleteMetric(metric: Metric) {
    const dialofRef = this.dialog.open(ConfirmDialogComponent);
    dialofRef.afterClosed().subscribe(confirmResult => {
      if (confirmResult) {
        this.uiService.laodingStateChanged.next(true);
        this.state.downdateMetricCount(metric.keyId);
        this.http.delete(`${this.metricsDeleteUrl}/${metric.id}`, {responseType: 'text'})
          .subscribe(results => {
            console.log(results);
            this.state.downdateMetric(metric.id);
            this.uiService.laodingStateChanged.next(false);
          });
      }
    });
  }

  openAddMetricDialog() {
    this.dialog.open(MetricDialogComponent, {
      data: {
        keyId: this.id
      }
    });
  }
}
