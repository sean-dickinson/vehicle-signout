import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSignoutsByVehicleComponent } from './view-signouts-by-vehicle.component';

describe('ViewSignoutsByVehicleComponent', () => {
  let component: ViewSignoutsByVehicleComponent;
  let fixture: ComponentFixture<ViewSignoutsByVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSignoutsByVehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSignoutsByVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
