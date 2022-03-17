import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Observable } from 'rxjs';

import { chartOptions } from '@app/shared/components/d3-chart/definitions';

declare let d3, nv: any;

/**
 * Implements D3 chart
 *
 * @export
 * @class D3ChartComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'loop-d3-chart',
  templateUrl: './d3-chart.component.html',
  styleUrls: [
    '../../../../../node_modules/nvd3/build/nv.d3.css',
    './d3-chart.component.css',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class D3ChartComponent implements OnInit {
  @Input() valueStream: Observable<any[]>;
  @Input() chartType: string;
  @Input() xAxisLabel: string;
  @Input() yAxisLabel: string;
  options: any;
  data: any;

  constructor() {}

  ngOnInit() {
    this.options = { ...chartOptions[this.chartType] };
    if (this.options.chart.xAxis) {
      this.updateOptions();
    }
    this.valueStream.subscribe(data => {
      this.data = data;
    });
  }

  /**
   * Updates chart options based on values passed
   *
   * @memberof D3ChartComponent
   */
  updateOptions() {
    this.options.chart.xAxis.axisLabel = this.xAxisLabel || 'X';
    this.options.chart.yAxis.axisLabel = this.yAxisLabel || 'Y';
  }
}
