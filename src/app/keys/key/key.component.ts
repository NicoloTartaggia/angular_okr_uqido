import { Component, Input, OnInit } from '@angular/core';
import { Key } from '../../shared/models/key.model';
import { DialogComponent } from '../../dialog/dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent implements OnInit {
  @Input()
  key: Key;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {}

  public keyPercentage() {
    if (!this.key) {
      return '0';
    }
    if (this.key.evaluationType !== 'check') {
      return Math.floor((this.key.metricsCount / this.key.limit) * 100);
    }
  }

  public openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: this.key.description,
        evaluationType: this.key.evaluationType,
        id: this.key.id,
        metrics: this.key.metrics
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
