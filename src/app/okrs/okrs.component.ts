import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Okr } from '../shared/models/okr.model';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import {StateService} from '../services/state.service';

@Component({
  selector: 'app-okrs',
  templateUrl: './okrs.component.html',
  styleUrls: ['./okrs.component.scss']
})
export class OkrsComponent implements OnInit {
  currentOkr$: Observable<Okr>;

  constructor(private http: HttpClient, public auth: AuthService, public state: StateService) { }

  ngOnInit() {
    this.state.getCurrentOkr();
  }
}
