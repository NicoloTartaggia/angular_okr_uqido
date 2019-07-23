import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface MetricJSON {
  author: string;
  checked?: boolean;
  createdAt: Timestamp;
  description: string;
  id: string;
  keyId: string;
}

export class Metric {
  author: string;
  checked?: boolean;
  createdAt: Date;
  description: string;
  id: string;
  keyId: string;

  constructor(object?: any) {
    if (object) {
      this.author = object.author;
      this.checked = object.checked;
      this.createdAt = object.createdAt && new Date(object.createdAt);
      this.description = object.description;
      this.id = object.id;
      this.keyId = object.keyId;
    }
  }

  static fromJSON(json?: MetricJSON): Metric {
    return new Metric(json);
  }
}
