import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarterDialogComponent } from './quarter-dialog.component';

describe('QuarterDialogComponent', () => {
  let component: QuarterDialogComponent;
  let fixture: ComponentFixture<QuarterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuarterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuarterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
