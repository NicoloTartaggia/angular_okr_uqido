import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { StateService } from '../../../services/state.service';
import { Metric } from '../../../shared/models/metric.model';
import { Subscription } from 'rxjs';
import { UiService } from '../../../services/ui.service';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class MetricsComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['author', 'description', 'data'];
  id: string;
  private metricsDeletetUrl = 'https://us-central1-okr-platform.cloudfunctions.net/metricsDelete';
  private metricsPutUrl = 'https://us-central1-okr-platform.cloudfunctions.net/metricsUpdate';
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

  deleteMetric(metric: Metric) {
    this.uiService.laodingStateChanged.next(true);
    this.state.downdateMetricCount(metric.keyId);
    this.state.downdateMetric(metric.id);
    const evaluationType = this.state.getKeyEvaluationType(metric.keyId);
    if (evaluationType === 'limit') {
      this.http.delete(`${this.metricsDeletetUrl}/${metric.id}`, {responseType: 'text'})
        .subscribe(results => {
          console.log(results);
          this.uiService.laodingStateChanged.next(false);
        });
    } else if (evaluationType === 'check') {
      this.http.put(`${this.metricsPutUrl}/${metric.id}`, {
        checked: false
      }).subscribe(results => {
        console.log(results);
        this.uiService.laodingStateChanged.next(false);
      });
    }
  }

}
