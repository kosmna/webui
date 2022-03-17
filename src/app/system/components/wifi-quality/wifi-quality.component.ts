import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'loop-wifi-quality',
  templateUrl: './wifi-quality.component.html',
  styleUrls: ['./wifi-quality.component.scss']
})
export class WifiQualityComponent implements OnInit {
  @Input()
  set bars(num: any) {
    if (num === null || num === undefined) {
      num = 0;
    }
    this._bars =  Array(num).fill(num).map((_x, i) => i + 1);
  }

  private _bars: number[] = [];

  get bars(): any {
    return this._bars;
  }

  constructor() { }

  ngOnInit(): void  {
  }

  get absUrl(): string {
    return window.location.href;
  }

}
