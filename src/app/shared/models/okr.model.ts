import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface OkrJSON {
  id: string;
  startingAt: Timestamp;
  endingAt: Timestamp;
}

export class Okr {
  id: string;
  startingAt: Date;
  endingAt: Date;

  constructor(object?: any) {
    if (object) {
      this.id = object.id;
      this.startingAt = object.startingAt && new Date(object.startingAt.seconds * 1000);
      this.endingAt = object.endingAt && new Date(object.endingAt.seconds * 1000);
    }
  }

  static fromJSON(json?: OkrJSON): Okr {
    return new Okr(json);
  }
}
