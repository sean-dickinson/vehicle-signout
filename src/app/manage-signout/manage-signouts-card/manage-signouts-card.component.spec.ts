import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSignoutsCardComponent } from './manage-signouts-card.component';

describe('ManageSignoutsCardComponent', () => {
  let component: ManageSignoutsCardComponent;
  let fixture: ComponentFixture<ManageSignoutsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSignoutsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSignoutsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
