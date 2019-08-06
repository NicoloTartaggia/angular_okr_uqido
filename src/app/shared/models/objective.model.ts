export class Objective {
  description: string;
  id: string;

  constructor(object?: any) {
    this.description = object.description;
    this.id = object.id;
  }
}
