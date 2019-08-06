import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {StateService} from '../services/state.service';
import {Okr} from '../shared/models/okr.model';

@Component({
  selector: 'app-objectives',
  templateUrl: './objectives.component.html',
  styleUrls: ['./objectives.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectivesComponent implements OnInit {

  private start;
  private end;

  constructor(public state: StateService) {}

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
}
