import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-limit-metrics',
  templateUrl: './limit-metrics.component.html',
  styleUrls: ['../metrics-dialog.component.scss']
})
export class LimitMetricsComponent implements OnInit {

  displayedColumns: string[] = ['author', 'description', 'data'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data.metrics);
  }

}
