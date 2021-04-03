import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { signoutData } from 'testing-helpers/test-signout-data';
import { testVehicles } from 'testing-helpers/test-vehicle-data';

import { HarnessLoader } from '@angular/cdk/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';


import { AddSignoutStepperComponent } from './add-signout-stepper.component';


describe('AddSignoutStepperComponent', () => {
  let loader: HarnessLoader;
  let component: AddSignoutStepperComponent;
  let fixture: ComponentFixture<AddSignoutStepperComponent>;
  let el: DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSignoutStepperComponent],
      providers: [FormBuilder],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AddSignoutStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the supplied vehicles', () => {
    // TODO: use test harnesses when the select actually works?!
    component.vehicles = testVehicles;
    component.signout = signoutData[0];
    fixture.detectChanges();
    const options = el
      .query(By.css('mat-select'))
      .children.map((node) => node.nativeElement.textContent);
    expect(testVehicles.map((v) => v.name)).toEqual(options);
  });

  it('should select the vehicle supplied in the signout input', async () => {
    component.ngOnInit();
    component.vehicles = testVehicles;
    component.signout = signoutData[0];
    component.ngOnChanges();
    fixture.detectChanges();
    const selectedVehicle = component.generalStepGroup.get('vehicleCtrl').value;
    expect(selectedVehicle.uid).toEqual(signoutData[0].vehicleID);
})
});
