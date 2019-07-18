import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Okr, OkrJSON } from '../shared/models/okr.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-okrs',
  templateUrl: './okrs.component.html',
  styleUrls: ['./okrs.component.scss']
})
export class OkrsComponent implements OnInit {
  // private url = 'https://us-central1-okr-platform.cloudfunctions.net/okrs';
  private url = 'http://localhost:5001/okr-platform/us-central/okrs';

  currentOkr$: Observable<Okr>;

  constructor(private http: HttpClient, public auth: AuthService) { }

  ngOnInit() {
    this.setCurrentOkr();
  }

  // GET - Get the current okr comparing current date with starting and ending date of each okr.
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
