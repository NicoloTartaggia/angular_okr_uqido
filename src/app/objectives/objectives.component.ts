import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';
import { Okr } from '../shared/models/okr.model';
import { MatDialog } from '@angular/material';
import { ObjectiveDialogComponent } from '../dialogs/objective-dialog/objective-dialog.component';
import { KeyDialogComponent } from '../dialogs/key-dialog/key-dialog.component';
import { Objective } from '../shared/models/objective.model';
import { UiService } from '../services/ui.service';
import {Observable, Subscription} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {ConfirmDialogComponent} from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-objectives',
  templateUrl: './objectives.component.html',
  styleUrls: ['./objectives.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectivesComponent implements OnInit {

  private objectivesDeletetUrl = 'https://us-central1-okr-platform.cloudfunctions.net/objectivesDelete';
  private start;
  private end;
  isLoading$: Observable<boolean>;

  constructor(private http: HttpClient,
              private uiService: UiService,
              public dialog: MatDialog,
              public state: StateService) {}

  ngOnInit() {
    this.isLoading$ = this.uiService.laodingStateChanged;
    this.state.currentOkr.subscribe((currentOkr: Okr) => {
      this.start = currentOkr.startingAt;
      this.end = currentOkr.endingAt;
      this.state.setObjectives(currentOkr.id);
      this.state.getClockifyTimeEntries(currentOkr.startingAt);
    });
  }

  get startingAt() {
    return this.start;
  }

  get endingAt() {
    return this.end;
  }

  openObjectiveDialog() {
    this.dialog.open(ObjectiveDialogComponent);
  }

  openKeyDialog(objectiveId: string) {
    const data = {
      objId: objectiveId
    };
    this.dialog.open(KeyDialogComponent, {
      data
    });
  }

  deleteObjective(objective: Objective) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(resultConfirm => {
      if (resultConfirm) {
        this.uiService.laodingStateChanged.next(true);
        this.http.delete(`${this.objectivesDeletetUrl}/${objective.id}`, {responseType: 'text'})
          .subscribe(result => {
            console.log(result);
            this.uiService.laodingStateChanged.next(false);
            this.state.downdateObjective(objective.id);
          });
      }
    });
  }
}
