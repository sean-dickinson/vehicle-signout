import { TestBed } from "@angular/core/testing";
import { AngularFireDatabase } from "@angular/fire/database";
import { Subject } from "rxjs";
import { VehicleSignout } from "./models/vehicle-signout";
import { SignoutDataService } from "./signout-data.service";
import { mockAngularFireDatabase } from "./testing-helpers/angular-fire-mocks-helper";

const signoutData: VehicleSignout[] = [
    {   vehicleID: 'vehicleID',
        vehicleName: 'Van',
        uid: '12345',
        userID: 'userID',
        userName: 'Test User',
        startTime: '2020-01-01T08:00.000Z',
        endTime: '2020-01-01T10:00.000Z',
        reason: 'Doing something fun'
    }
];

describe('SignoutDataService', () => {
    let service: SignoutDataService;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {provide: AngularFireDatabase, useValue: mockAngularFireDatabase([

              ...signoutData
          ] 
          )}
        ]
      });
      service = TestBed.inject(SignoutDataService);
    });
  
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should get signouts by vehicle', (done: DoneFn) => {
        const time$ = new Subject<string>();
        service.getSignoutsByVehicle('vehicleID', time$).subscribe(signouts => {
            expect(signouts).toEqual(signoutData);
            done();
        });
        time$.next('2020-01-01T07:00.000Z')
    });

    it('should get last sign out correctly', (done: DoneFn) =>{
        const time$ = new Subject<string>();
        service.getLastSignout('vehicleID', time$).subscribe(signout => {
            expect(signout).toEqual(signoutData[0]);
            done();
        });
        time$.next('2020-01-01T11:00.000Z')
    })
});