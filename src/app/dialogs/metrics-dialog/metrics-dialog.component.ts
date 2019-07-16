import {Component, Inject, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-metrics-dialog',
  templateUrl: './metrics-dialog.component.html',
  styleUrls: ['./metrics-dialog.component.scss']
})
export class MetricsDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public authService: AuthService) { }

  ngOnInit() {
  }

}
