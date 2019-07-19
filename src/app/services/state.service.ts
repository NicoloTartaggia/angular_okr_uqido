import { Injectable } from '@angular/core';
import {Okr, OkrJSON} from '../shared/models/okr.model';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Objective} from '../shared/models/objective.model';
import {Key} from '../shared/models/key.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private url = 'https://us-central1-okr-platform.cloudfunctions.net/okrs';
  private keysUrl = 'https://us-central1-okr-platform.cloudfunctions.net/keys';
  private _currentOkr = new Subject<Okr>();
  private _objectives = new Subject<Objective[]>();
  private _objectiveKeys = {};  // JSON

  constructor(
    private http: HttpClient
  ) { }

  get currentOkr() {
    return this._currentOkr;
  }

  get objectives() {
    return this._objectives;
  }

  keys(objectiveId) {
    return this._objectiveKeys[objectiveId];
  }


  // GET - Get the current okr comparing current date with starting and ending date of each okr.
  getCurrentOkr() {
    const currentDate = new Date().getTime();
    this.http.get(this.url).subscribe((data: OkrJSON[]) => {
        this._currentOkr
          .next(data.map((okrs) =>
            Okr.fromJSON(okrs))
            .filter(okr => okr.startingAt.getTime() < currentDate && okr.endingAt.getTime() >= currentDate)[0]);
      });
  }

  // GET - Get all objectives in current okr and save them in objectivesList
  setObjectives(okrId: string) {
    const objectiveUrl = `https://us-central1-okr-platform.cloudfunctions.net/objectives?okrId=${okrId}`;
    this.http.get(objectiveUrl)
      .subscribe((data: Objective[]) => {
        this.objectives.next(data);
      });
  }

  // GET - Get all keys related to the objective with the id given in input
  getKeyWithObjectiveId(objectiveId) {
    this._objectiveKeys[objectiveId] = new Subject<Key[]>();
    this.http.get(`${this.keysUrl}?objectiveId=${objectiveId}`)
      .subscribe((data: Key[]) => {
        this._objectiveKeys[objectiveId].next(data);
      });
  }
}
