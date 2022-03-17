import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'loop-status-display',
  templateUrl: './status-display.component.html',
  styleUrls: ['./status-display.component.scss'],
})
export class StatusDisplayComponent implements OnInit {
  @Input()
  positive: boolean;
  @Input()
  statusText: string;
  constructor() {}
  ngOnInit() {}
  get message() {
    if (!this.statusText) {
      return this.positive ? 'Enabled' : 'Disabled';
    }
    return this.statusText;
  }
}
