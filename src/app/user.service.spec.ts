import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { mockAngularFireAuth, mockAngularFirestore} from '../testing-helpers/angular-fire-mocks-helper';
import { UserService } from './user.service';
import { VehicleUser } from './models/vehicle-user';
import { AngularFireAuth } from '@angular/fire/auth';


const testUser: VehicleUser = {
  uid: '1234',
  displayName: 'Test User',
  email: 'test@email.com',
  isActive: true,
  isAdmin: false
}


describe('UserService', () => {
  let service: UserService;
  let authService: AngularFireAuth;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: AngularFirestore, useValue: mockAngularFirestore({
          ...testUser
        })},
        {
          provide: AngularFireAuth, useValue: mockAngularFireAuth(testUser)
        }
      ]
    });
    service = TestBed.inject(UserService);
    authService = TestBed.inject(AngularFireAuth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should correctly set the user', (done: DoneFn) => {

    service.setUser('1234').then(() => {
      service.getUser().subscribe(serviceUser => {
        expect(serviceUser).toEqual(testUser);
        done();
      });
    })
  });



});
