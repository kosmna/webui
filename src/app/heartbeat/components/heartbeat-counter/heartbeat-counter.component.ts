import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'loop-heartbeat-counter',
  templateUrl: './heartbeat-counter.component.html',
  styleUrls: ['./heartbeat-counter.component.scss'],
})
export class HeartbeatCounterComponent implements OnInit {
  @Input() count: number;
  @Input() title: string;
  @Input() hasBorder = false;
  constructor() {}

  ngOnInit() {}
}
