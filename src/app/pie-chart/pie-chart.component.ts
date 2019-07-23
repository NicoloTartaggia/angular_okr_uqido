import { Component, OnInit, OnDestroy } from '@angular/core';
import { StateService } from '../services/state.service';
import { Objective } from '../shared/models/objective.model';
import { Key } from '../shared/models/key.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, OnDestroy {

  private subscription: Subscription[] = [];

  public objectives: Objective[] = [];
  public pieChartLabels = ['Obiettivi completati (%)', 'Obiettivi non completati (%)'];
  public pieChartData = [];
  public pieChartType = 'pie';
  public pieChartLegend = false;
  public pieChartOptions = {
    responsive: true
  };

  constructor(private state: StateService) { }

  ngOnInit() {
    this.subscription.push(this.state.objectives.subscribe((objectives: Objective[]) => {
      this.objectives = objectives;
    }));

    this.state.keys.subscribe((keys: Key[]) => {
      this.pieChartData = [];
      this.objectives.forEach((obj: Objective) => {
        const p = Object.values(keys).filter((key: Key) => key.objectiveId === obj.id).map((k: Key) => k.keyPercentage);
        this.pieChartData.push(p.reduce((a, b) => a + b, 0 ) / p.length);
      });
    });
  }

  ngOnDestroy() {
    this.subscription.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  finalResults() {
    const progressPercentage = [];
    const data = [];
    this.pieChartData.forEach(percentage => {
      if (percentage >= 60) {
        progressPercentage.push(1);
      } else {
        progressPercentage.push(percentage / 60);
      }
    });
    const progress = progressPercentage.reduce((a, b) => a + b, 0) / progressPercentage.length;
    data.push(Math.round(progress * 100));
    data.push(Math.round(100 - (progress * 100)));
    return data;
  }
}
