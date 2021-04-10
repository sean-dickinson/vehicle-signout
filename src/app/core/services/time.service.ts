import { Injectable, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeService implements OnDestroy {
   private worker;
  _time$ = new ReplaySubject<string>(1);
  constructor() {
    this.worker = new Worker('../timer.worker', { type: 'module'});
    this.worker.onmessage = ({data}) => {
      this._time$.next(data);
    }
    this._time$.next(new Date().toISOString());
   }

  getCurrentTime(): Observable<string> {
    return this._time$;
  }

  ngOnDestroy(){
    this.worker.terminate();
    this._time$.unsubscribe();
  }
}
