interface TimeInterval {
  end: string;
  start: string;
}

interface Activity {
  description: string;
  timeInterval: TimeInterval;
}

export interface EntryJSON {
  userActivities: Activity[];
  average: number;
  totalUserTime: number;
}

export class Entry {
  userActivities: Activity[];
  average: number;
  totalUserTime: number;
  // start: Date;

  constructor(object?: any) {
    if (object) {
      this.userActivities = object.userActivities;
      this.average = object.average;
      this.totalUserTime = object.totalUserTime;
      // this.start = object.start && new Date(object.start);
    }
  }
    static fromJSON(json?: EntryJSON) {
      return new Entry(json);
  }
}
