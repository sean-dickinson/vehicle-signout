import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastSignoutComponent } from './last-signout.component';

describe('LastSignoutComponent', () => {
  let component: LastSignoutComponent;
  let fixture: ComponentFixture<LastSignoutComponent>;

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
