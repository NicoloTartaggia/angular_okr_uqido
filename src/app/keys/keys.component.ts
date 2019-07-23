import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import { StateService } from '../services/state.service';
import { Key } from '../shared/models/key.model';

@Component({
  selector: 'app-keys',
  templateUrl: './keys.component.html',
  styleUrls: ['./keys.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeysComponent implements OnInit {
  @Input()
  objectiveId: string;


  constructor(private state: StateService) { }

  ngOnInit() {
    this.state.getKeyWithObjectiveId(this.objectiveId);
  }

  filterByObjectiveId(keys) {
    if (!keys) { return []; }
    return Object.values(keys).filter((key: Key) => key.objectiveId === this.objectiveId);
  }
}
