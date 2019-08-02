import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StateService } from '../../services/state.service';
import { UiService } from '../../services/ui.service';
import { MatDialogRef } from '@angular/material';
import { Subscription} from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-key-dialog',
  templateUrl: './key-dialog.component.html',
  styleUrls: ['./key-dialog.component.scss']
})
export class KeyDialogComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  public types = ['Limit', 'Check', 'Uqido Tech', 'Clockify', 'Pull Request'];
  public isLoading = false;  // Used for loading spinner
  public keyModal: FormGroup;

  constructor(private http: HttpClient,
              private state: StateService,
              private uiService: UiService,
              public dialogRef: MatDialogRef<KeyDialogComponent>) {

  }

  ngOnInit() {
    this.subscriptions.push(this.uiService.laodingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    }));
    this.keyModal = new FormGroup({
      description: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      limit: new FormControl('')
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onSubmit() {
    // this.uiService.laodingStateChanged.next(true);
    console.log(this.keyModal.value)
    this.dialogRef.close();
  }
}
