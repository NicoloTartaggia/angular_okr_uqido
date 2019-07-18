import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Key } from '../shared/models/key.model';

@Component({
  selector: 'app-keys',
  templateUrl: './keys.component.html',
  styleUrls: ['./keys.component.scss']
})
export class KeysComponent implements OnInit {
  @Input()
  objectiveId: string;

  // private keysUrl = 'https://us-central1-okr-platform.cloudfunctions.net/keys';
  private keysUrl = `http://localhost:5001/okr-platform/us-central/keys`;
  public keysList;


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getKeyList();
  }

  // GET - Get all keys related to the objective with the id given in input
  public getKeyList() {
    this.http.get(`${this.keysUrl}?objectiveId=${this.objectiveId}`)
      .subscribe((data: Key[]) => {
        this.keysList = data;
      });
  }
}
