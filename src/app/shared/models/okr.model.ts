import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export class Okr {
  id: string;
  startingAt: Timestamp;
  endingAt: Timestamp;
}
