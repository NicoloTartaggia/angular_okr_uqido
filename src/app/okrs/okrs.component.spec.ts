import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OkrsComponent } from './okrs.component';

describe('OkrsComponent', () => {
  let component: OkrsComponent;
  let fixture: ComponentFixture<OkrsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OkrsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OkrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
