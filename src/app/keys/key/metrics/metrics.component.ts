import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MetricsService } from '../../../services/metrics.service';

@Component({
  selector: 'app-check-metrics-dialog',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent implements OnInit {

  displayedColumns: string[] = ['author', 'description', 'data'];
  metrics = [];

  constructor(public metricsService: MetricsService) {}

  ngOnInit() {}
}
