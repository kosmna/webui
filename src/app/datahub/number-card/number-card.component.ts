import { Component, OnInit, ViewEncapsulation, Input, OnChanges } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'loop-number-card',
  templateUrl: './number-card.component.html',
  styleUrls: ['./number-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NumberCardComponent implements OnInit, OnChanges {
  @Input() icon: string;
  @Input() input: string | number = '-';
  @Input() title: string | number;
  @Input() memoryUnit = false;

  countFrom: number;
  countTo: number;
  output: string | number;
  unit: string;
  private counter$: Subject<number | string> = new Subject();

  get counterSubj$(): Subject<number | string> {
    return this.counter$;
  }

  constructor() { }

  ngOnChanges(changes): void {
    const countTo = changes.input.currentValue;
    const countFrom = changes.input.previousValue ? changes.input.previousValue : 0;
    if (this.memoryUnit) {
      let divedBy = 1;
      if (countTo > 10000 && countTo < 1000000) {
        // KB to MB
        divedBy =   1000;
        this.unit = 'MB';
      } else if ( countTo > 1000000) {
        // KB to GB
        divedBy = 1000000;
        this.unit = 'GB';
      } else {
        this.unit = 'KB';
      }
      this.countTo = countTo / divedBy ;
      this.countFrom = countFrom / divedBy;
    } else {
      this.countTo = changes.input.currentValue;
      this.countFrom =  countFrom ;

    }
  }

  ngOnInit() {
    this.counter$
    .subscribe((res) => {
      this.output = res;
    });
  }

}
