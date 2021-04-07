// Credit to phreakhead: https://stackoverflow.com/questions/38042941/how-to-mock-angularfire-2-service-in-unit-test

import { AngularFirestore } from '@angular/fire/firestore';

import { of } from 'rxjs';

/**
 * Mocks the Firebase auth by automatically logging in.
 */
export function mockAngularFireAuth(user) {

  return {
    user: of(user),

  };
}
/**
 * Mocks an AngularFirestore that always returns the given data for any path.
 */

export function mockAngularFirestore(data): AngularFirestore {
  return {
    collection: (path: string, fn: Function): any => {
      return {
        valueChanges() {
          return of(data);
        },
      };
    },
    doc: (path: string, fn: Function): any => {
      return {
        valueChanges() {
          return of(data);
        },
        collection(path: string, fn: Function) {
          return {
            valueChanges() {
              return of(data);
            },
          };
        },
      };
    },
  } as AngularFirestore;
}
