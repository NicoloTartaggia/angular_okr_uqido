import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface MetricJSON {
  author: string;
  checked?: boolean;
  createdAt: Timestamp;
  description: string;
}

export class Metric {
  author: string;
  checked?: boolean;
  createdAt: Date;
  description: string;

  constructor(object?: any) {
    if (object) {
      this.author = object.author;
      this.checked = object.checked;
      this.createdAt = object.createdAt && new Date(object.createdAt.seconds * 1000);
      this.description = object.description;
    }
  }

  static fromJSON(json?: MetricJSON): Metric {
    return new Metric(json);
  }
}
