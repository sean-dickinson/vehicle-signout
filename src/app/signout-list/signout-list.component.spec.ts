import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignoutListComponent } from './signout-list.component';

describe('SignoutListComponent', () => {
  let component: SignoutListComponent;
  let fixture: ComponentFixture<SignoutListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignoutListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignoutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
