import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';
import { Okr } from '../shared/models/okr.model';
import { MatDialog } from '@angular/material';
import { ObjectiveDialogComponent } from '../dialogs/objective-dialog/objective-dialog.component';
import { KeyDialogComponent } from '../dialogs/key-dialog/key-dialog.component';

@Component({
  selector: 'app-objectives',
  templateUrl: './objectives.component.html',
  styleUrls: ['./objectives.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectivesComponent implements OnInit {

  private start;
  private end;

  constructor(public dialog: MatDialog,
              public state: StateService) {}

  ngOnInit() {
    this.state.currentOkr.subscribe((currentOkr: Okr) => {
      this.start = currentOkr.startingAt;
      this.end = currentOkr.endingAt;
      this.state.setObjectives(currentOkr.id);
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
}
