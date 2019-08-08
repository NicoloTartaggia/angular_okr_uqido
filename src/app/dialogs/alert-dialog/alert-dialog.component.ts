import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<AlertDialogComponent>) {
  }

  ngOnInit() {
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
