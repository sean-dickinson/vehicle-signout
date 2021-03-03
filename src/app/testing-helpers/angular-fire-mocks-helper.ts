// Credit to phreakhead: https://stackoverflow.com/questions/38042941/how-to-mock-angularfire-2-service-in-unit-test
import { AngularFireDatabase } from "@angular/fire/database";

import { of } from "rxjs";

/**
 * Mocks the Firebase auth by automatically logging in.
 */
export const AngularFireAuthMock = jasmine
  .createSpy("signInWithEmailAndPassword")
  .and.returnValue(Promise.resolve({ uid: "1234" }));

/**
 * Mocks an AngularFireDatabase that always returns the given data for any path.
 */
export function mockAngularFireDatabase(data): AngularFireDatabase {
  return {
    object: (path: string): any => {
      return {
        valueChanges() {
          return of(data);
        },
      };
    },
    list: (path: string, fn: Function): any => {
      return {
        valueChanges() {
          return of(data);
        },
      };
    },
  } as AngularFireDatabase;
}
