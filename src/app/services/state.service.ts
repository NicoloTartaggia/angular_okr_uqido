import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Objective } from '../shared/models/objective.model';
import { Key, KeyJSON } from '../shared/models/key.model';
import { Article, ArticleJSON } from '../shared/models/article.model';
import { Entry } from '../shared/models/entry';
import { Metric, MetricJSON } from '../shared/models/metric.model';
import { Okr, OkrJSON } from '../shared/models/okr.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private objectiveUrl = 'https://us-central1-okr-platform.cloudfunctions.net/objectives';
  // private clockifyUrl = 'https://us-central1-okr-platform.cloudfunctions.net/clockify';
  private clockifyUrl = 'http://localhost:5001/okr-platform/us-central1/clockify';
  private keysUrl = 'https://us-central1-okr-platform.cloudfunctions.net/keys';
  // private keysUpdateUrl = 'https://us-central1-okr-platform.cloudfunctions.net/keysUpdate';
  private keysUpdateUrl = 'http://localhost:5001/okr-platform/us-central1/keysUpdate';
  private metricsUrl = 'https://us-central1-okr-platform.cloudfunctions.net/metrics';
  private techArticlesUrl = 'http://localhost:5001/okr-platform/us-central1/articles';
  // private techArticlesUrl = 'https://us-central1-okr-platform.cloudfunctions.net/articles';
  private url = 'https://us-central1-okr-platform.cloudfunctions.net/okrs';
  private _articles = new BehaviorSubject<any>([]);
  private _articlesValue = {};
  private _clockifyAverage = new BehaviorSubject<number>(0);
  private _objectives = new BehaviorSubject<Objective[]>([]);
  private _okrs = new BehaviorSubject<any>([]);
  private _okrsValue = {};
  private _currentOkr = new BehaviorSubject<Okr>(new Okr());
  private _keys = new BehaviorSubject<any>([]);
  private _keysValue = {};
  private lastUpdate = {};
  private _metrics = new BehaviorSubject<any>([]);
  private _metricsValue = {};

  constructor(private http: HttpClient) {}

  get okrs() {
    return this._okrs;
  }

  setCurrentOkr(okr: Okr) {
    this._currentOkr.next(okr);
  }

  get currentOkr() {
    return this._currentOkr;
  }

  get objectives() {
    return this._objectives;
  }

  get clockifyAverage() {
    return this._clockifyAverage;
  }

  get keys() {
    return this._keys;
  }

  get metrics() {
    return this._metrics;
  }

  // GET - Get the current okr comparing current date with starting and ending date of each okr.
  getOkrs() {
    const currentDate = new Date().getTime();
    if (this.makeRequest(this.url)) {
      return;
    }
    this.getClockifyTimeEntries();
    this.http.get(this.url).subscribe((okrs: OkrJSON[]) => {
      this.lastUpdate[this.url] = new Date();
      okrs.forEach((okr: OkrJSON) => {
        const actualOKr = Okr.fromJSON(okr);
        this._okrsValue[okr.id] = actualOKr;
        if (this.isCurrentOkr(actualOKr)) {

          this._currentOkr.next(actualOKr);
        }
      });
      this._okrs.next(this._okrsValue);
      });
  }

  private isCurrentOkr(okr: Okr): boolean {
    const currentDate = new Date().getTime();
    return okr.startingAt.getTime() <= currentDate && okr.endingAt.getTime() >= currentDate;
  }

  public updateCurrentOkr(okr: Okr) {
    if (okr.id !== this._currentOkr.value.id) {
      this.setCurrentOkr(okr);
      this.setObjectives(okr.id);
    }
  }

  setObjectives(okrId: string) {
    if (!okrId) { return; }
    const url = `${this.objectiveUrl}?okrId=${okrId}`;
    // if (this.makeRequest(url)) {
    //   return;
    // }
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
      .subscribe((data: KeyJSON[]) => {
        this.lastUpdate[url] = new Date();
        data.forEach((key) => {
          const actualKey = Key.fromJSON(key);
          this._keysValue[key.id] = actualKey;
          if (key.evaluationType === 'articlesLimit' && this.executeUpdate(actualKey)) {
            this.getTechArticles(key.id);
            this.http.put(this.keysUpdateUrl, {
              lastUpdate: new Date().getDate()
            }).subscribe(result =>
            console.log(result));
          }
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

  updateLimitMetric(metric: Metric) {
    this._metricsValue = {
      ...this._metricsValue,
      [metric.id]: metric
    };
    this._metrics.next(this._metricsValue);
  }

  updateCheckMetric(metric: Metric) {
    this._metricsValue = {
      ...this._metricsValue,
      [metric.id]: metric
    };
    this._metrics.next(this._metricsValue);
  }

  downdateMetric(metricId: string) {
    const metrics = Object.values(this._metrics.value).filter((metric: Metric) => metric.id !== metricId);
    this._metrics.next(metrics);
  }

  updateLimitMetricCount(keyId) {
    this._keysValue = {
      ...this._keysValue,
      [keyId]: Key.fromJSON({
        ...this._keysValue[keyId],
        metricsCount: this._keysValue[keyId].metricsCount + 1
      })
    };
    this._keys.next(this._keysValue);
  }

  updateCheckMetricCount(metric: Metric) {
    const metricToUpdate = this._keysValue[metric.keyId].metrics.filter(m => m.description === metric.description)[0];
    const index = this._keysValue[metric.keyId].metrics.indexOf(metricToUpdate);
    this._keysValue[metric.keyId].metrics[index].checked = true;
    this._keysValue = {
      ...this._keysValue,
      [metric.keyId]: Key.fromJSON({
        ...this._keysValue[metric.keyId],
        metricsChecked: this._keysValue[metric.keyId].metricsChecked  + 1
      })
    };
    this._keys.next(this._keysValue);
  }

  downdateMetricCount(keyId: string) {
    const targetKey: any = Object.values(this._keys.value).filter((key: Key) => key.id === keyId);
    targetKey[0].metricsCount -= 1;
  }

  private makeRequest(url) {
    return this.lastUpdate[url] && this.lastUpdate[url].getTime() > (new Date()).getTime() - 5 * 60 * 1000;
  }

  private executeUpdate(key: Key): boolean {
    const diff = 60 * 60 * 24 * 1000;  // milliseconds in a day
    return ((new Date().getTime() - key.lastUpdate.getTime()) / diff) > 7;
  }

  getClockifyTimeEntries() {
    this.http.get(this.clockifyUrl)
      .subscribe((entries: Entry[]) => {
        let users = 0;
        let average = 0;
        entries.forEach((entry: Entry) => {
          if (entry.average >= 1) {
            average += 1;
          } else {
            average += entry.average;
          }
          users += 1;
        });
        this._clockifyAverage.next((average / users) * 100);
      });
  }

  getTechArticles(keyId: string) {
    this.http.get(`${this.techArticlesUrl}/${keyId}`)
      .subscribe((articles: any []) => {
        articles.forEach((articleJSON: ArticleJSON) => {
          this._articlesValue[articleJSON.id] = Article.fromJSON(articleJSON);
        });
        this._articles.next(this._articlesValue);
      });
  }
}
