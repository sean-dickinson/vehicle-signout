import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  _time$ = new ReplaySubject<string>(1);
  constructor() {
    this._time$.next(new Date().toISOString());
   }

  getCurrentTime(): Observable<string> {
    return this._time$;
  }
}
