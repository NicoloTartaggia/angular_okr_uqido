import { Component, OnInit } from '@angular/core';
import {StateService} from '../services/state.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(private state: StateService) { }

  ngOnInit() {}

  okrsToArray(okrs) {
    return Object.values(okrs);
  }
}
