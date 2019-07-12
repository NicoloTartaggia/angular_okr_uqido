import { Component, Input, OnInit } from '@angular/core';
import { Key } from '../../shared/models/key.model';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent implements OnInit {
  @Input()
  key: Key;

  constructor() { }

  ngOnInit() {}

  public keyPercentage() {
    if (!this.key) {
      return '0';
    }
    if (this.key.evaluationType !== 'check') {
      return Math.floor((this.key.metricsCount / this.key.limit) * 100);
    }
  }
}
