import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class TimerService {
  timerControl$: Subject<any> = new Subject<any>();
  timer$: Observable<any>;
  private counter: number;
  private continueTiming: boolean = true;

  constructor() {
    this.timer$ = this.timerControl$.switchMap(() =>
      Observable.timer(0, 1000).map(() => {
        console.log(this.counter);
        return --this.counter;
      }).takeWhile(val => this.continueTiming || this.counter < 1)
    );
  }

  getTimer(): Observable<number> {
    return this.timer$;
  }

  startTimer(period: number) {
    this.counter = period;
    this.continueTiming = true;
    this.timerControl$.next();
  }

  stopTimer() {
    console.log('stop timer called');
    this.continueTiming = false;
    this.timerControl$.next();
  }
}