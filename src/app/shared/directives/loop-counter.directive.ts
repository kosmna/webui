import { Directive, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Subject } from 'rxjs';
/**
 * Directive for animatining numbers. Used in datahub Stats
 *
 * @export
 * @class LoopCounterDirective
 * @implements {OnChanges}
 */


@Directive({
  selector: '[loopCounter]'
})
export class LoopCounterDirective implements OnChanges {
  fixed: number;
  @Output() countEnd = new EventEmitter();

  @Input() subject$: Subject<number | string>;
  @Input()
  set countTo(countTo: string) {
    this._countTo = parseFloat(countTo);
    this.fixed = this._countTo % 1 === 0 ? 0 : 2;
  }

  @Input()
  set countFrom(from: string) {
    this._countFrom = parseFloat(from);
  }

  @Input()
  set duration(duration: string) {
    this._duration = parseFloat(duration);
  }

  @Input()
  set step(step: string) {
    this._step = parseFloat(step);
    // this.go();
  }

  private _timer: number;
  private _duration: number;
  private _countTo: number;
  private _countFrom: number;
  private _step: number;

  constructor() { }

  ngOnChanges(changes): void {
    if (changes.countTo ) {

      if (changes.countTo.currentValue) {
        this.go();
      } else {
        this.subject$.next('-');
      }
    }
  }

  go(): void | false {
      clearInterval(this._timer);

      if (isNaN(this._duration)) {
        this.subject$.next('-');
        return false;
    }

    if (isNaN(this._step)) {
      this.subject$.next('-');
        return false;
    }

    if (isNaN(this._countFrom)) {
      this.subject$.next('-');
        return false;
    }

    if (isNaN(this._countTo)) {
      this.subject$.next('-');
        return false;
    }

    if (this._step <= 0) {
        return false;
    }

    if (this._duration <= 0) {
        return false;
    }

    if (this._step > this._duration * 1000) {
        return false;
    }


  let intermediate: number = this._countFrom;
  const increment: number  = Math.abs(this._countTo - this._countFrom) / ((this._duration * 1000) / this._step);

    // this.subject.next(intermediate);
    this.subject$.next(+(intermediate.toFixed(this.fixed)));

    this._timer = window.setInterval(() => {
      if (this._countTo < this._countFrom) {
        if (intermediate <= this._countTo) {

          clearInterval(this._timer);
          const fixedNum = +(this._countTo).toFixed(this.fixed);
          this.subject$.next(fixedNum);
          this.countEnd.emit();

        } else {
          const fixedNum = +(intermediate.toFixed(this.fixed));
          this.subject$.next(fixedNum);
          intermediate -= increment;
        }
      } else {

        if (intermediate >= this._countTo) {
          clearInterval(this._timer);
          const fixedNum = +(this._countTo).toFixed(this.fixed);
          this.subject$.next(fixedNum);
          this.countEnd.emit();

        } else {
          const fixedNum = +(intermediate.toFixed(this.fixed));
          this.subject$.next(fixedNum);
          intermediate += increment;
        }
      }
    }, this._step);

  }


}
