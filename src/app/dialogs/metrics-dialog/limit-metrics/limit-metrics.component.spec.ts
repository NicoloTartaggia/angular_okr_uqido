import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitMetricsComponent } from './limit-metrics.component';

describe('LimitMetricsComponent', () => {
  let component: LimitMetricsComponent;
  let fixture: ComponentFixture<LimitMetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LimitMetricsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
