import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-current-okr',
  templateUrl: './current-okr.component.html',
  styleUrls: ['./current-okr.component.scss']
})
export class CurrentOkrComponent implements OnInit {
  private  url: string;
  private okrList = [];
  private currentOkr;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.url = 'https://us-central1-okr-platform.cloudfunctions.net/okrs';
  }

  public getOkrList() {
    this.http.get(this.url)
      .subscribe((data: any[]) => {
        this.okrList = data;
      });
  }

  public getCurrentOkr() {
    this.http.get(this.url + '?current=true')
      .subscribe((data) => {
        this.currentOkr = data;
      });
  }
}
