import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'loop-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class LoopAddCardComponent implements OnInit {
  @Input() tooltip: string;
  private _onClick: () => any;

  constructor() { }

  ngOnInit() {
  }

  onClick(): void {
    this._onClick();
  }

  registerOnClick(fn: () => any): void {
    this._onClick = fn;
  }

}
