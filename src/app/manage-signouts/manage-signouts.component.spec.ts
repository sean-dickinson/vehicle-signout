import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSignoutsComponent } from './manage-signouts.component';

describe('ManageSignoutsComponent', () => {
  let component: ManageSignoutsComponent;
  let fixture: ComponentFixture<ManageSignoutsComponent>;

  beforeEach(async(() => {
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
