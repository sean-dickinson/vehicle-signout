import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {signoutData} from 'testing-helpers/test-signout-data';
import { LastSignoutComponent } from './last-signout.component';

describe('LastSignoutComponent', () => {
  let component: LastSignoutComponent;
  let fixture: ComponentFixture<LastSignoutComponent>;
  let el: DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastSignoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastSignoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement.query(By.css('span'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render nothing if no signout', () => {
    expect(el.nativeElement.textContent).toEqual('');
  });

  it('should correctly render the signout', () => {
    component.signout = signoutData[0];
    fixture.detectChanges();
    expect(el.nativeElement.textContent).toContain(signoutData[0].userName)
  });

  it('should use the correct verb for a current signout', () => {
    component.signout = signoutData[0];
    component.isCurrent = true;
    fixture.detectChanges();
    expect(el.nativeElement.textContent).toContain('Currently');
    
    component.isCurrent = false;
    fixture.detectChanges();
    expect(el.nativeElement.textContent).toContain('Last');
  })
});
