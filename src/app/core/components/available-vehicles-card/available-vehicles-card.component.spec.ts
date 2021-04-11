import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableVehiclesCardComponent } from './available-vehicles-card.component';

describe('AvailableVehiclesCardComponent', () => {
  let component: AvailableVehiclesCardComponent;
  let fixture: ComponentFixture<AvailableVehiclesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableVehiclesCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableVehiclesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
