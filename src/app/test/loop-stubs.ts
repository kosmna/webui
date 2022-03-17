import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'loop-container',
  template: 'stub',
})
export class LoopContainerStubComponent {
  @Input()
  logoSrc: string;
  @Input()
  menuItems: any;
  @Input()
  auth: any;
  @Input()
  mobile: boolean;
  @Input()
  disableAll: boolean;
  @Input()
  notificationCount: Observable<number>;
}

@Component({
  selector: 'loop-area-chart',
  template: 'stub',
})
export class AreaChartComponentStubComponent {
  @Input() title: string;
  @Input() yAxisTitle = '%';
  @Input() series: string[];
  @Input() seriesData: { x: any; y: number };
  @Input() seriesColors = ['#79B473'];
  @Input() maximumY: number;
  @Input() animationSpeed = 2000;
}
