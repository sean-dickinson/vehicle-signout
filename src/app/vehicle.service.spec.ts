import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { testVehicles } from 'testing-helpers/testing-data/test-vehicle-data';
import { mockAngularFirestore} from '../testing-helpers/mocks/angular-fire-mocks';
import { VehicleService } from './vehicle.service';



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
