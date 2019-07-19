import { Component, OnInit } from '@angular/core';
import {StateService} from '../services/state.service';
import {Okr} from '../shared/models/okr.model';

@Component({
  selector: 'app-objectives',
  templateUrl: './objectives.component.html',
  styleUrls: ['./objectives.component.scss']
})
export class ObjectivesComponent implements OnInit {
  constructor(public state: StateService) { }

  ngOnInit() {
    this.state.currentOkr.subscribe((currentOkr: Okr) => {
      this.state.setObjectives(currentOkr.id);
    });
  }


}

