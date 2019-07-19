import { Component, Input, OnInit } from '@angular/core';
import {StateService} from '../services/state.service';

@Component({
  selector: 'app-keys',
  templateUrl: './keys.component.html',
  styleUrls: ['./keys.component.scss']
})
export class KeysComponent implements OnInit {
  @Input()
  objectiveId: string;


  constructor(private state: StateService) { }

  ngOnInit() {
    this.state.getKeyWithObjectiveId(this.objectiveId);
  }
}
