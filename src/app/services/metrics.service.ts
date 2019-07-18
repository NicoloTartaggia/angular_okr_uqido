import { Injectable } from '@angular/core';
import {Metric} from '../shared/models/metric.model';

@Injectable({
  providedIn: 'root'
})
export class MetricsService {

  metrics: Metric[] = [];

  constructor() {}

  setMetrics(metrics: Metric[]) {
    this.metrics = metrics;
  }
}
