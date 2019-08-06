interface TimeInterval {
  end: string;
  start: string;
}

export interface EntryJSON {
  activities: string[];
  average: number;
  totalUserTime: number;
  start: string;
}

export class Entry {
  activities: string[];
  average: number;
  totalUserTime: number;
  start: Date;

  constructor(object?: any) {
    if (object) {
      this.activities = object.activities;
      this.average = object.average;
      this.totalUserTime = object.totalUserTime;
      this.start = object.start && new Date(object.timeInterval.start);
    }
  }
    static fromJSON(json?: EntryJSON) {
      return new Entry(json);
  }
}
