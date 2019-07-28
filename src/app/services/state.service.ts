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
  private clockifyUrl = 'https://us-central1-okr-platform.cloudfunctions.net/clockify';
  private keysUrl = 'https://us-central1-okr-platform.cloudfunctions.net/keys';
  private metricsUrl = 'https://us-central1-okr-platform.cloudfunctions.net/metrics';
  private metricsPostUrl = 'https://us-central1-okr-platform.cloudfunctions.net/metricsUpdate';
  private techArticlesUrl = 'http://localhost:5001/okr-platform/us-central1/articles';
  private url = 'https://us-central1-okr-platform.cloudfunctions.net/okrs';
  private _articles = new BehaviorSubject<any>([]);
  private _articlesValue = {};
  private _articlesNumber = new BehaviorSubject<number>(0);
  private _clockifyAverage = new BehaviorSubject<number>(0);
  private _objectives = new BehaviorSubject<Objective[]>([]);
  private _currentOkr = new BehaviorSubject<Okr>(new Okr());
  private _keys = new BehaviorSubject<any>([]);
  private _keysValue = {};
  private lastUpdate = {};
  private _metrics = new BehaviorSubject<any>([]);
  private _metricsValue = {};

  constructor(private http: HttpClient) {}

  get articles() {
    return this._articles;
  }

  get articlesNumber() {
    return this._articlesNumber;
  }

  get objectives() {
    return this._objectives;
  }

  get currentOkr() {
    return this._currentOkr;
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
  getCurrentOkr() {
    const currentDate = new Date().getTime();
    if (this.makeRequest(this.url)) {
      return;
    }
    this.getClockifyTimeEntries();
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
      .subscribe((data: KeyJSON[]) => {
        this.lastUpdate[url] = new Date();
        data.forEach((key) => {
          const transformedKey = Key.fromJSON(key);
          this._keysValue[key.id] = transformedKey;
          if (key.evaluationType === 'articlesLimit') {
            this.getTechArticles(key.id);
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
      .subscribe((arrayOfArticles: Array<ArticleJSON[]>) => {
        let totalArticles = 0;
        arrayOfArticles.forEach((articles: ArticleJSON[]) => {
          articles.forEach((article: ArticleJSON) => {
            this._articlesValue[article.id] = Article.fromJSON(article);
          });
          this._articles.next(this._articlesValue);
          totalArticles += 1;
        });
        this._articlesNumber.next(totalArticles);
      });
  }
}
