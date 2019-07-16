import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricsDialogComponent } from './metrics-dialog.component';

describe('MetricsDialogComponent', () => {
  let component: MetricsDialogComponent;
  let fixture: ComponentFixture<MetricsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetricsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
