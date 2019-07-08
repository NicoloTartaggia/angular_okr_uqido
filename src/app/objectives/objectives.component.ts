import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Objective } from '../shared/models/objective.model';

@Component({
  selector: 'app-objectives',
  templateUrl: './objectives.component.html',
  styleUrls: ['./objectives.component.scss']
})
export class ObjectivesComponent implements OnInit, OnChanges {
  @Input()
  currentOkrId: string;

  private objectiveUrl: string;
  private objectivesList: Objective[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {}


  ngOnChanges() {
    if (!this.currentOkrId) {
      return;
    }
    this.objectiveUrl = `https://us-central1-okr-platform.cloudfunctions.net/objectives?okrId=${this.currentOkrId}`;
    this.setObjectivesList();
  }

  // GET - Get all objectives in current okr and save them in objectivesList
  public setObjectivesList() {
    this.http.get(this.objectiveUrl)
      .subscribe((data: Objective[]) => {
        this.objectivesList = data;
      });
  }
}

