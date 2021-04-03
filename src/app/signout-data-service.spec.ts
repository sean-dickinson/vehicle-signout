import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { SignoutDataService } from './signout-data.service';
import { mockAngularFirestore } from '../testing-helpers/angular-fire-mocks-helper';
import { signoutData } from 'testing-helpers/test-signout-data';


describe('SignoutDataService', () => {
    let service: SignoutDataService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {provide: AngularFirestore, useValue: mockAngularFirestore([

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

    it('should get last sign out correctly', (done: DoneFn) => {
        const time$ = new Subject<string>();
        service.getLastSignout('vehicleID', time$).subscribe(signout => {
            expect(signout).toEqual(signoutData[0]);
            done();
        });
        time$.next('2020-01-01T11:00.000Z')
    })
});
