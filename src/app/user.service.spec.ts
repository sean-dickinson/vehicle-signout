import { TestBed } from '@angular/core/testing';
import {VehicleUser} from './vehicle-user';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with a null user', () => {
    expect(service.getUser().getValue()).toBeNull();
  });

  it('should correctly set the user', () => {
    const user: VehicleUser = {
      displayName: 'Test User',
      email: 'email@place.com',
      uid: '1234',
      isAdmin: false,
      isActive: true
    };
    service.setUser(user);
    const serviceUser = service.getUser().getValue();
    expect(serviceUser).toEqual(user);
  });

  it('should set user to null on logout', () => {
    const user: VehicleUser = {
      displayName: 'Test User',
      email: 'email@place.com',
      uid: '1234',
      isAdmin: false,
      isActive: true
    };
    service.setUser(user);

    service.logoutUser();
    const serviceUser = service.getUser().getValue();
    expect(serviceUser).toBeNull();
  })

});
