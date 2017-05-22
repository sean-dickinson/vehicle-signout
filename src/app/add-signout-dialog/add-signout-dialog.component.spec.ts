import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSignoutDialogComponent } from './add-signout-dialog.component';

describe('AddSignoutDialogComponent', () => {
  let component: AddSignoutDialogComponent;
  let fixture: ComponentFixture<AddSignoutDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSignoutDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSignoutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
