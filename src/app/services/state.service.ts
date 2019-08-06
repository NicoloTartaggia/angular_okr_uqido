import { Injectable } from '@angular/core';
import { Okr, OkrJSON } from '../shared/models/okr.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Objective } from '../shared/models/objective.model';
import { Key } from '../shared/models/key.model';
import { Metric, MetricJSON } from '../shared/models/metric.model';
import { Entry } from '../shared/models/entry';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private objectiveUrl = 'https://us-central1-okr-platform.cloudfunctions.net/objectives';
  private clockifyUrl = 'https://us-central1-okr-platform.cloudfunctions.net/clockify';
  private keysUrl = 'https://us-central1-okr-platform.cloudfunctions.net/keys';
  private metricsUrl = 'https://us-central1-okr-platform.cloudfunctions.net/metrics';
  private url = 'https://us-central1-okr-platform.cloudfunctions.net/okrs';
  private _averageForEachPerson = new BehaviorSubject<any>([]);
  private _objectives = new BehaviorSubject<Objective[]>([]);
  private _currentOkr = new BehaviorSubject<Okr>(new Okr());
  private _keys = new BehaviorSubject<any>([]);
  private _keysValue = {};
  private lastUpdate = {};
  private _metrics = new BehaviorSubject<any>([]);
  private _metricsValue = {};
  private _users = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}

  get currentOkr() {
    return this._currentOkr;
  }

  get objectives() {
    return this._objectives;
  }

  get keys() {
    return this._keys;
  }

  get metrics() {
    return this._metrics;
  }

  get hours() {
    return this._averageForEachPerson;
  }

  get users() {
    return this._users;
  }
  // GET - Get the current okr comparing current date with starting and ending date of each okr.
  getCurrentOkr() {
    this.getClockifyTimeEntries();
    const currentDate = new Date().getTime();
    if (this.makeRequest(this.url)) {
      return;
    }
    this.http.get(this.url).subscribe((data: OkrJSON[]) => {
      this.lastUpdate[this.url] = new Date();
      this._currentOkr
        .next(data.map((okrs) =>
          Okr.fromJSON(okrs))
          .filter(okr => okr.startingAt.getTime() < currentDate && okr.endingAt.getTime() >= currentDate)[0]);
      });
  }

  setObjectives(okrId: string) {
    if (!okrId) { return; }
    const url = `${this.objectiveUrl}?okrId=${okrId}`;
    if (this.makeRequest(url)) {
      return;
    }
    this.http.get(url)
      .subscribe((data: Objective[]) => {
        this.lastUpdate[url] = new Date();
        this.objectives.next(data);
      });
  }

  getKeyWithObjectiveId(objectiveId: string) {
    const url = `${this.keysUrl}?objectiveId=${objectiveId}`;
    if (this.makeRequest(url)) {
      return;
    }
    this.http.get(url)
      .subscribe((data: Key[]) => {
        this.lastUpdate[url] = new Date();
        data.forEach((key) => {
          this._keysValue[key.id] = new Key(key);
        });
        this._keys.next(this._keysValue);
      });
  }

  getMetricsWithKeyId(keyId: string) {
    const url = `${this.metricsUrl}?keyId=${keyId}`;
    if (this.makeRequest(url)) {
      return;
    }
    this.http.get(url)
      .subscribe((data: MetricJSON[]) => {
        this.lastUpdate[url] = new Date();
        data.forEach(metric => {
          this._metricsValue[metric.id] = Metric.fromJSON(metric);
        });
        this._metrics.next(this._metricsValue);
      });
  }

  updateMetricCount(keyId) {
    this._keysValue = {
      ...this._keysValue,
      [keyId]: {
        ...this._keysValue[keyId],
        metricsCount: this._keysValue[keyId].metricsCount + 1
      }
    };
    this._keys.next(this._keysValue);
  }

  updateMetric(metric: Metric) {
    this._metricsValue = {
      ...this._metricsValue,
      [metric.id]: metric
    };
    this._metrics.next(this._metricsValue);
  }

  private makeRequest(url) {
    return this.lastUpdate[url] && this.lastUpdate[url].getTime() > (new Date()).getTime() - 5 * 60 * 1000;
  }

  getClockifyTimeEntries() {
    const currentMonth = new Date().getMonth();
    this.http.get(this.clockifyUrl)
      .subscribe((arrayOfEntries: Array<Entry[]>) => {
        let users = -1;
        let average = 0;
        arrayOfEntries.forEach((entries: Entry[]) => {
          let hoursSum = 0;
          entries.forEach((entryJSON: Entry) => {
            const entry = new Entry(entryJSON);
            if (entry.start.getMonth() === currentMonth) {
              hoursSum += entry.end.getHours() - entry.start.getHours();
            }
          });
          const currentAverage = hoursSum / 8;
          if (currentAverage >= 1) {
            average += 1;
            this._averageForEachPerson.next(average);
          } else {
            average += currentAverage;
            this._averageForEachPerson.next(average);
          }
          users += 1;
          this._users.next(users);
        });
      });
  }
}
