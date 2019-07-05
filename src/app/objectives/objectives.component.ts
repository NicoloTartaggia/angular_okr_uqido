import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Objective } from '../shared/models/objective.model';

@Component({
  selector: 'app-objectives',
  templateUrl: './objectives.component.html',
  styleUrls: ['./objectives.component.scss']
})
export class ObjectivesComponent implements OnInit {
  @Input()
  currentOkrId: string;

  private objectiveUrl: string;
  private objectivesList: Objective[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.objectiveUrl = `https://us-central1-okr-platform.cloudfunctions.net/objectives?okrId=${this.currentOkrId}`;
    this.getObjectivesList();
  }

  // GET - Get all objectives in current okr and save them in objectivesList
  public getObjectivesList() {
    this.http.get(this.objectiveUrl)
      .subscribe((data: Objective[]) => {
        this.objectivesList = data;
      });
  }
}

