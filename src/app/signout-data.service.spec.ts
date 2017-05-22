import { TestBed, inject } from '@angular/core/testing';

import { SignoutDataService } from './signout-data.service';

describe('SignoutDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignoutDataService]
    });
  });

  it('should ...', inject([SignoutDataService], (service: SignoutDataService) => {
    expect(service).toBeTruthy();
  }));
});
