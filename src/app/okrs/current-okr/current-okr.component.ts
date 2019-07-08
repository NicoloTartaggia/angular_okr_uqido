import { Component, Input, OnInit } from '@angular/core';
import { Okr } from '../../shared/models/okr.model';

@Component({
  selector: 'app-current-okr',
  templateUrl: './current-okr.component.html',
  styleUrls: ['./current-okr.component.scss']
})
export class CurrentOkrComponent implements OnInit {
  @Input()
  okr: Okr;

  constructor() {}

  ngOnInit() {}

}

