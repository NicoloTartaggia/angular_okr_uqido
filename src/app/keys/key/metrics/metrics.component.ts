import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { StateService } from '../../../services/state.service';
import { Metric } from '../../../shared/models/metric.model';
import { Subscription } from 'rxjs';
import { UiService } from '../../../services/ui.service';

@Component({
  selector: 'app-check-metrics-dialog',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class MetricsComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['author', 'description', 'data'];
  id: string;
  private metricsDeletetUrl = 'https://us-central1-okr-platform.cloudfunctions.net/metricsDelete';
  private subscriptions: Subscription[] = [];
  public isLoading = false;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              public location: Location,
              public state: StateService,
              private uiService: UiService
              ) {}

  ngOnInit() {
    this.subscriptions.push(this.uiService.laodingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    }));
    this.id = this.route.snapshot.paramMap.get('id');
    this.state.getMetricsWithKeyId(this.id);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  filterByKeyId(metric) {
    if (!metric) { return []; }
    return Object.values(metric).filter((data: Metric) => data.keyId === this.id);
  }

  deleteMetric(metricId: string) {
    this.uiService.laodingStateChanged.next(true);
    this.http.delete(`${this.metricsDeletetUrl}/${metricId}`, {responseType: 'text'})
      .subscribe(results => {
        console.log(results);
        const metrics = Object.values(this.state.metrics.value).filter((data: Metric) => data.id !== metricId);
        this.state.setMetrics(metrics);
        this.uiService.laodingStateChanged.next(false);
      });
  }

}
