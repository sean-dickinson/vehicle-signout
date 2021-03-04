import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleSignoutCardComponent } from './vehicle-signout-card.component';

describe('VehicleSignoutCardComponent', () => {
  let component: VehicleSignoutCardComponent;
  let fixture: ComponentFixture<VehicleSignoutCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleSignoutCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleSignoutCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
