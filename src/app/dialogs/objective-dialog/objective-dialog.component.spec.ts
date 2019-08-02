import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectiveDialogComponent } from './objective-dialog.component';

describe('ObjectiveDialogComponent', () => {
  let component: ObjectiveDialogComponent;
  let fixture: ComponentFixture<ObjectiveDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectiveDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectiveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
