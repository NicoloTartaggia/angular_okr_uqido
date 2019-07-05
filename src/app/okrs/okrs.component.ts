import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Okr } from '../shared/models/okr.model';

@Component({
  selector: 'app-okrs',
  templateUrl: './okrs.component.html',
  styleUrls: ['./okrs.component.scss']
})
export class OkrsComponent implements OnInit {
  private url = 'https://us-central1-okr-platform.cloudfunctions.net/okrs';
  private okrList: Okr[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.setOkrList();
  }

  public setOkrList() {
    this.http.get(this.url)
      .subscribe((data: Okr[]) => {
        this.okrList = data;
      });
  }
}
