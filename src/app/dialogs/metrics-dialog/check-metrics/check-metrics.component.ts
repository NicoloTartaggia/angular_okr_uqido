import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-check-metrics-dialog',
  templateUrl: './check-metrics.component.html',
  styleUrls: ['../metrics-dialog.component.scss']
})
export class CheckMetricsComponent implements OnInit {

  displayedColumns: string[] = ['author', 'description', 'data'];
  datasource: MatTableDataSource<any[]>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.datasource = this.data.metrics
    // @ts-ignore
      .filter(metric => metric.checked === true);
  }

}
