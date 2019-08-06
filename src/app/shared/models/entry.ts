export interface TimeInterval {
  end: string;
  start: string;
}

export class Entry {
  description: string;
  id: string;
  userId: string;
  start: Date;
  end: Date;

  constructor(object?: any) {
    this.description = object.description;
    this.id = object.id;
    this.start = object.timeInterval.start && new Date(object.timeInterval.start);
    this.end = object.timeInterval.end && new Date(object.timeInterval.end);
    this.userId = object.userId;
  }
}
