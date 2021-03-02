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

  // todo mock the database call
  // it('should correctly set the user', () => {
   
  //   service.setUser(user);
  //   const serviceUser = service.getUser().getValue();
  //   expect(serviceUser).toEqual(user);
  // });

  it('should set user to null on logout', () => {
 
    service.logoutUser();
    const serviceUser = service.getUser().getValue();
    expect(serviceUser).toBeNull();
  })

});
