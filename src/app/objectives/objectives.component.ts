import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';
import { Okr } from '../shared/models/okr.model';
import { MatDialog } from '@angular/material';
import { ObjectiveDialogComponent } from '../dialogs/objective-dialog/objective-dialog.component';
import { KeyDialogComponent } from '../dialogs/key-dialog/key-dialog.component';
import { Objective } from '../shared/models/objective.model';
import { UiService } from '../services/ui.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-objectives',
  templateUrl: './objectives.component.html',
  styleUrls: ['./objectives.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectivesComponent implements OnInit, OnDestroy {

  private objectivesDeletetUrl = 'https://us-central1-okr-platform.cloudfunctions.net/objectivesDelete';
  private start;
  private end;
  private subscriptions: Subscription[] = [];
  public isLoading = false;

  constructor(private http: HttpClient,
              private uiService: UiService,
              public dialog: MatDialog,
              public state: StateService) {}

  ngOnInit() {
    this.subscriptions.push(this.uiService.laodingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    }));
    this.state.currentOkr.subscribe((currentOkr: Okr) => {
      this.start = currentOkr.startingAt;
      this.end = currentOkr.endingAt;
      this.state.setObjectives(currentOkr.id);
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
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
    // this.uiService.laodingStateChanged.next(true);
    // this.http.delete(`${this.objectivesDeletetUrl}/${objective.id}`, {responseType: 'text'})
    //   .subscribe(result => {
    //     console.log(result);
    //     this.uiService.laodingStateChanged.next(false);
    //     this.state.downdateObjective(objective.id);
    //   });
  }
}
