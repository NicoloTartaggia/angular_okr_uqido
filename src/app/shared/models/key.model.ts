import {Metric} from './metric.model';

export class Key {
  description: string;
  evaluationType: string;
  limit?: number; // optional, used in case evaluationType === 'limit'
  id: string;
  metricsChecked: number;
  metricsCount: number;
  metrics: Metric[];
  objectiveId: string;

  constructor(object?: any) {
    if (object) {
      this.description = object.description;
      this.evaluationType = object.evaluationType;
      this.id = object.id;
      this.limit = object.limit;
      this.metricsChecked = object.metricsChecked;
      this.metricsCount = object.metricsCount;
      this.metrics = object.metrics;
      this.objectiveId = object.objectiveId;
    }
  }

  get keyPercentage() {
    if (this.metricsCount === 0) {
      return 0;
    }
    if (this.evaluationType !== 'check') {
      return this.maxLimitPercentage() || Math.floor((this.metricsCount / this.limit) * 100);
    } else {
      return Math.floor((this.metricsChecked / this.metricsCount) * 100);
    }
  }

  maxLimitPercentage() {
    if (this.metricsCount / this.limit >= 1) { return 100; }
  }
}
