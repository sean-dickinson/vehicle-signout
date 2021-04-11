import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignoutTimingCellComponent } from './signout-timing-cell.component';

describe('SignoutTimingCellComponent', () => {
  let component: SignoutTimingCellComponent;
  let fixture: ComponentFixture<SignoutTimingCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignoutTimingCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignoutTimingCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
