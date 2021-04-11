import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleStatusTableComponent } from './vehicle-status-table.component';

describe('VehicleStatusTableComponent', () => {
  let component: VehicleStatusTableComponent;
  let fixture: ComponentFixture<VehicleStatusTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleStatusTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleStatusTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
