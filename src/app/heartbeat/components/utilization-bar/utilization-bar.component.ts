import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'loop-utilization-bar',
  templateUrl: './utilization-bar.component.html',
  styleUrls: ['./utilization-bar.component.scss'],
})
export class UtilizationBarComponent implements OnInit {
  @Input() barTitle: string;
  @Input() value: number;
  @Input() total: number;
  @Input() units: string;
  @Input() status = 'bar__background--status-unknown';
  constructor() {}

  ngOnInit() {}

  get percentage(): number {
    return (this.value / 100) * this.total;
  }
}
