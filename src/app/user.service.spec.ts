import { TestBed } from '@angular/core/testing';
import { AngularFireDatabase } from '@angular/fire/database';
import { mockAngularFireDatabase } from './testing-helpers/angular-fire-mocks-helper';
import { UserService } from './user.service';
import { VehicleUser } from './models/vehicle-user';

const testUser: VehicleUser = {
  uid: '1234',
  displayName: 'Test User',
  email: 'test@email.com',
  isActive: true,
  isAdmin: false
}

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: AngularFireDatabase, useValue: mockAngularFireDatabase({ 
          ...testUser
        })}
      ]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with a null user', () => {
    expect(service.getUser().getValue()).toBeNull();
  });

  it('should correctly set the user', (done: DoneFn) => {
   
    service.setUser('1234').then(() => {
      const serviceUser = service.getUser().getValue();
      expect(serviceUser).toEqual(testUser);
      done();
    })
  });

  it('should set user to null on logout', () => {
 
    service.logoutUser();
    const serviceUser = service.getUser().getValue();
    expect(serviceUser).toBeNull();
  })

});
