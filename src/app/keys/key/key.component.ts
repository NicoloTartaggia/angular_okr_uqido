import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Key } from '../../shared/models/key.model';
import { MatDialog } from '@angular/material';
import { LimitDialogComponent } from '../../dialogs/limit-dialog/limit-dialog.component';
import { CheckDialogComponent } from '../../dialogs/check-dialog/check-dialog.component';
import { StateService } from '../../services/state.service';
import { Subscription } from 'rxjs';
import { UiService } from '../../services/ui.service';
import { HttpClient } from '@angular/common/http';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeyComponent implements OnInit, OnDestroy {
  @Input()
  key: Key;

  private keysDeletetUrl = 'https://us-central1-okr-platform.cloudfunctions.net/keysDelete';
  private subscriptions: Subscription[] = [];
  public isLoading = false;
  public users;

  constructor(private http: HttpClient,
              private state: StateService,
              private uiService: UiService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.subscriptions.push(this.uiService.laodingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  get getState() {
    return this.state;
  }

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

  deleteKey(key: Key) {
    const dialofRef = this.dialog.open(ConfirmDialogComponent);
    dialofRef.afterClosed().subscribe(confirmResult => {
      if (confirmResult) {
        this.uiService.laodingStateChanged.next(true);
        this.http.delete(`${this.keysDeletetUrl}/${key.id}`, {responseType: 'text'})
          .subscribe(result => {
            console.log(result);
            this.uiService.laodingStateChanged.next(false);
            this.state.downdateKey(key.id);
          });
      }
    });
  }
}
