import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentOkrComponent } from './current-okr.component';

describe('CurrentOkrComponent', () => {
  let component: CurrentOkrComponent;
  let fixture: ComponentFixture<CurrentOkrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentOkrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentOkrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
