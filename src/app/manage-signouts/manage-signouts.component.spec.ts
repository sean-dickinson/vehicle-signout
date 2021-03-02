import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ManageSignoutsComponent } from './manage-signouts.component';

describe('ManageSignoutsComponent', () => {
  let component: ManageSignoutsComponent;
  let fixture: ComponentFixture<ManageSignoutsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSignoutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSignoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
