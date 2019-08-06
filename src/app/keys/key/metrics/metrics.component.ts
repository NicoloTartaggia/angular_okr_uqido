import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Metric } from '../../../shared/models/metric.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-check-metrics-dialog',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent implements OnInit {

  displayedColumns: string[] = ['author', 'description', 'data'];
  metrics: Metric[] = [];

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private location: Location) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get(`https://us-central1-okr-platform.cloudfunctions.net/metrics?keyId=${id}`)
      .subscribe((result: any[]) => {
        this.metrics = result.map(metric => {
          return Metric.fromJSON(metric);
        });
      });
  }
}
