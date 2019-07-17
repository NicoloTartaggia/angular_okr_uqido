import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckMetricsComponent } from './check-metrics.component';

describe('CheckMetricsComponent', () => {
  let component: CheckMetricsComponent;
  let fixture: ComponentFixture<CheckMetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckMetricsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
