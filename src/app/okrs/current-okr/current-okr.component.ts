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

  ngOnInit() {
    console.log(this.okr);
  }

  public isCurrentOkr(): boolean {
    const currentDate = Math.round(new Date().getTime() / 1000);
    if (this.okr.startingAt.seconds < currentDate && this.okr.endingAt.seconds >= currentDate) {
      return true;
    } else {
      return false;
    }
  }
}
