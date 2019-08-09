import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {StateService} from '../../services/state.service';
import {Subscription} from 'rxjs';
import {UiService} from '../../services/ui.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Metric, MetricJSON} from '../../shared/models/metric.model';

@Component({
  selector: 'app-metric-dialog',
  templateUrl: './metric-dialog.component.html',
  styleUrls: ['./metric-dialog.component.scss']
})
export class MetricDialogComponent implements OnInit, OnDestroy {

  private postUrl = 'https://us-central1-okr-platform.cloudfunctions.net/metricsCreate';
  private subscriptions: Subscription[] = [];
  public isLoading = false;  // Used for loading spinner
  public metricModal: FormGroup;

  constructor(private auth: AuthService,
              private http: HttpClient,
              private state: StateService,
              private uiService: UiService,
              public dialogRef: MatDialogRef<MetricDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.subscriptions.push(this.uiService.laodingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    }));
    this.metricModal = new FormGroup({
      description: new FormControl('', Validators.required)
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onSubmit() {
    this.uiService.laodingStateChanged.next(true);
    this.http.post(this.postUrl, {
      ...this.metricModal.value,
      checked: false,
      keyId: this.data.keyId,
      createdAt: new Date(),
      author: this.auth.getUserName().displayName
    }).subscribe((metricJSON: MetricJSON) => {
      this.uiService.laodingStateChanged.next(false);
      console.log(metricJSON);
      this.state.updateLimitMetric(Metric.fromJSON(metricJSON));
      this.dialogRef.close();
    });
  }

}
