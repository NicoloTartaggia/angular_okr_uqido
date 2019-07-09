import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Okr, OkrJSON} from '../shared/models/okr.model';
import {Observable} from 'rxjs';
import { filter, first, map} from 'rxjs/operators';

@Component({
  selector: 'app-okrs',
  templateUrl: './okrs.component.html',
  styleUrls: ['./okrs.component.scss']
})
export class OkrsComponent implements OnInit {
  private url = 'https://us-central1-okr-platform.cloudfunctions.net/okrs';
  private currentOkr$: Observable<Okr>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.setCurrentOkr();
  }

  public setCurrentOkr() {
    const currentDate = new Date().getTime();
    this.currentOkr$ = this.http.get(this.url).pipe(
      map((data: OkrJSON[]) => {
        return data.map((okrs) => Okr.fromJSON(okrs))
          .filter(okr => okr.startingAt.getTime() < currentDate && okr.endingAt.getTime() >= currentDate)[0];
      })
    );
  }
}
