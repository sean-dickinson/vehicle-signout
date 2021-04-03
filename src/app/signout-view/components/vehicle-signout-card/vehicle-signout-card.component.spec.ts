import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { signoutData } from 'testing-helpers/test-signout-data';

import { VehicleSignoutCardComponent } from './vehicle-signout-card.component';

describe('VehicleSignoutCardComponent', () => {
  let component: VehicleSignoutCardComponent;
  let fixture: ComponentFixture<VehicleSignoutCardComponent>;
  let el: DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleSignoutCardComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleSignoutCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('currentSignoutID method should work as expected', () => {
    component.signouts = signoutData;
    component.currentTime = signoutData[0].startTime;
    fixture.detectChanges();
    expect(component.currentSignoutID).toBe(signoutData[0].uid);
  });

  it('should show an icon if it is currently out', () => {
    component.signouts = signoutData;
    component.currentTime = signoutData[0].startTime;
    fixture.detectChanges();
    const iconElement = el.query(By.css('mat-icon'));
    expect(iconElement.nativeElement.textContent).toBe('warning');
  });

  it('should show no signouts if no signouts are given', () => {
    const h2El = el.query(By.css('h2'));
    expect(h2El.nativeElement.textContent).toBe('No Signouts Scheduled');
  });

  it('should show signout list if signouts are given', () => {
    component.signouts = signoutData;
    fixture.detectChanges();
    expect(el.query(By.css('signout-list'))).toBeTruthy();
  })
});
