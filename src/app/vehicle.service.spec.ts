import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { Vehicle } from './models/vehicle';
import { mockAngularFirestore} from './testing-helpers/angular-fire-mocks-helper';

import { VehicleService } from './vehicle.service';

const testVehicles: Vehicle[] = [
  {
    uid: 'uid',
    name: 'White Van',
    icon: 'airport_shuttle',
    isActive: true
  }
];

describe('VehicleService', () => {
  let service: VehicleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AngularFirestore, useValue: mockAngularFirestore([
            ...testVehicles
      ])
        }
      ]
    });
    service = TestBed.inject(VehicleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get vehicles', (done: DoneFn) => {
    service.getActiveVehicles().subscribe(vehicles => {
      expect(vehicles).toEqual(testVehicles);
      done();
    })
  })
});
