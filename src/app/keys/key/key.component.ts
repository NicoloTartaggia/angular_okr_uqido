import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Key } from '../../shared/models/key.model';
import { MatDialog } from '@angular/material';
import { LimitDialogComponent } from '../../dialogs/limit-dialog/limit-dialog.component';
import { CheckDialogComponent } from '../../dialogs/check-dialog/check-dialog.component';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeyComponent implements OnInit {
  @Input()
  key: Key;

  public users;

  constructor(public dialog: MatDialog, public state: StateService) { }

  ngOnInit() {}

  public openDialog() {
    const data = {
      title: this.key.description,
      evaluationType: this.key.evaluationType,
      id: this.key.id,
      metrics: this.key.metrics
    };
    if (this.key.evaluationType === 'limit') {
      this.dialog.open(LimitDialogComponent, {
        data
      });
    } else if (this.key.evaluationType === 'check') {
      this.dialog.open(CheckDialogComponent, {
        data
      });
    }
  }
}
