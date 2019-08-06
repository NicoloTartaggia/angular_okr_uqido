import { Component, OnInit, OnDestroy} from '@angular/core';
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
  public pieChartLabels = [];
  public data = [];
  public pieChartData = [];
  public pieChartType = 'pie';
  public pieChartLegend = false;
  public pieChartColor: any = [
    {
      backgroundColor: ['rgba(30, 169, 224, 0.8)',
        'rgba(255,165,0,0.9)',
        'rgba(139, 136, 136, 0.9)',
        'rgba(255, 161, 181, 0.9)',
        'rgba(255, 102, 0, 0.9)'
      ]
    }
  ];
  public pieChartOptions = {
    responsive: true
  };

  constructor(private state: StateService) { }

  ngOnInit() {
    this.subscription.push(this.state.objectives.subscribe((objectives: Objective[]) => {
      this.objectives = objectives;
    }));
    this.subscription.push(this.state.keys.subscribe((keys: Key[]) => {
      this.pieChartData = [];
      this.pieChartLabels = [];
      this.data = [];
      this.objectives.forEach((obj: Objective) => {
        const p = Object.values(keys).filter((key: Key) => key.objectiveId === obj.id).map((k: Key) => k.keyPercentage);
        this.pieChartData.push(p.reduce((a, b) => a + b, 0 ) / p.length);
        this.pieChartLabels.push(obj.description);
      });
      this.pieChartData.forEach(percentage => {
        if (percentage >= 60) {
          this.data.push(1 / this.pieChartData.length * 100);
        } else {
          this.data.push(percentage / this.pieChartData.length / 60 * 100);
        }
      });
      this.data.push(Math.round(100 - this.data.reduce((a, b) => a + b, 0)));
      this.pieChartLabels.push('Obiettivi incompleti');
      return this.data;
    }));
  }

  ngOnDestroy() {
    this.subscription.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
}
