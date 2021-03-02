import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SelectVehicleComponent } from './select-vehicle.component';

describe('SelectVehicleComponent', () => {
  let component: SelectVehicleComponent;
  let fixture: ComponentFixture<SelectVehicleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
