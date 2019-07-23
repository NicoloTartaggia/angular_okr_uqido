import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { StateService } from '../../../services/state.service';
import { Metric } from '../../../shared/models/metric.model';

@Component({
  selector: 'app-check-metrics-dialog',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class MetricsComponent implements OnInit {

  displayedColumns: string[] = ['author', 'description', 'data'];
  id: string;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              public location: Location,
              public state: StateService
              ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.state.getMetricsWithKeyId(this.id);
  }

  filterByKeyId(metric) {
    if (!metric) { return []; }
    return Object.values(metric).filter((data: Metric) => data.keyId === this.id);
  }
}
