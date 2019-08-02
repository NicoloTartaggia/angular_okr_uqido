import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StateService } from '../../services/state.service';
import { UiService } from '../../services/ui.service';
import { MatDialogRef } from '@angular/material';
import { Subscription} from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Objective } from '../../shared/models/objective.model';

@Component({
  selector: 'app-objective-dialog',
  templateUrl: './objective-dialog.component.html',
  styleUrls: ['./objective-dialog.component.scss']
})
export class ObjectiveDialogComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  private postUrl = 'https://us-central1-okr-platform.cloudfunctions.net/objectiveCreate';
  public types = ['Limit', 'Check', 'Uqido Tech', 'Clockify', 'Pull Request'];
  public isLoading = false;  // Used for loading spinner
  public objectiveModal: FormGroup;

  constructor(private http: HttpClient,
              private state: StateService,
              private uiService: UiService,
              public dialogRef: MatDialogRef<ObjectiveDialogComponent>) {

  }

  ngOnInit() {
    this.subscriptions.push(this.uiService.laodingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    }));
    this.objectiveModal = new FormGroup({
      description: new FormControl('', Validators.required),
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onSubmit() {
    this.uiService.laodingStateChanged.next(true);
    this.http.post(this.postUrl, {
      description: this.objectiveModal.value.description,
      okrId: this.state.currentOkr.value.id
    }).subscribe((result: Objective) => {
      this.uiService.laodingStateChanged.next(false);
      this.state.updateObjective(result);
      this.dialogRef.close();
    });
  }
}
