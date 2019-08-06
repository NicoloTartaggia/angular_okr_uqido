import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StateService } from '../../services/state.service';
import { UiService } from '../../services/ui.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Key, KeyJSON } from '../../shared/models/key.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-key-dialog',
  templateUrl: './key-dialog.component.html',
  styleUrls: ['./key-dialog.component.scss']
})
export class KeyDialogComponent implements OnInit, OnDestroy {

  private checkMetrics = [];
  private postUrl = 'http://localhost:5001/okr-platform/us-central1/keysCreate';
  private subscriptions: Subscription[] = [];
  public isLoading = false;  // Used for loading spinner
  public keyModal: FormGroup;
  public types = ['limit', 'check', 'uqido tech', 'clockify', 'pull Request'];

  constructor(private auth: AuthService,
              private http: HttpClient,
              private state: StateService,
              private uiService: UiService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<KeyDialogComponent>) {

  }

  get metrics() {
    return this.checkMetrics;
  }

  ngOnInit() {
    this.subscriptions.push(this.uiService.laodingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    }));
    this.keyModal = new FormGroup({
      check: new FormControl(''),
      description: new FormControl('', Validators.required),
      lastUpdate: new FormControl(''),
      limit: new FormControl(10),
      type: new FormControl('', Validators.required)
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  buildMetrics() {
    this.checkMetrics.push({
      author: this.auth.getUserName().displayName,
      checked: false,
      createdAt: JSON.stringify(new Date()),
      description: this.keyModal.value.check
    });
    this.keyModal.patchValue({
      check: ''
    });
  }

  onSubmit() {
    this.uiService.laodingStateChanged.next(true);
    let key = {};
    switch (this.keyModal.value.type) {
      case 'limit':
        key = {
          description: this.keyModal.value.description,
          evaluationType: this.keyModal.value.type,
          limit: this.keyModal.value.limit,
          objectiveId: this.data.objId
        };
        break;
      case 'uqido tech':
        key = {
          description: this.keyModal.value.description,
          evaluationType: this.keyModal.value.type,
          lastUpdate: this.keyModal.value.lastUpdate,
          limit: this.keyModal.value.limit,
          objectiveId: this.data.objId
        };
        break;
      default:
        key = {
          description: this.keyModal.value.description,
          evaluationType: this.keyModal.value.type,
          objectiveId: this.data.objId
        };
    }
    this.http.post(this.postUrl, {
      key,
      metrics: this.metrics
    }).subscribe((keyJSON: KeyJSON) => {
      console.log(keyJSON)
      this.uiService.laodingStateChanged.next(false);
      this.state.updateKey(Key.fromJSON(keyJSON));
      });
    this.dialogRef.close();
  }
}
