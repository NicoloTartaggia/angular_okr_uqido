import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';
import { Okr } from '../shared/models/okr.model';
import { MatDialog } from '@angular/material';
import { ObjectiveDialogComponent } from '../dialogs/objective-dialog/objective-dialog.component';

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

  openDialog() {
    this.dialog.open(ObjectiveDialogComponent);
  }
}
