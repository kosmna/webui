import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import * as ApexCharts from 'apexcharts';

@Component({
  selector: 'loop-radial-chart',
  templateUrl: './radial-chart.component.html',
  styleUrls: ['./radial-chart.component.scss'],
})
export class RadialChartComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('chart') charElement: ElementRef;
  @Input() value: number;
  @Input() total: number;
  @Input() showPercentage = true;
  @Input() colors = ['#F4A460'];
  @Input() titles: string[];
  private _chart: ApexCharts;
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this._buildChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.value && changes.value.currentValue) {
      this._chart.updateSeries([this._percentage], true);
    }
  }

  private get _percentage() {
    return Math.round((this.value * 100) / this.total);
  }

  private _buildChart() {
    const options = {
      chart: {
        height: 90,
        width: 90,
        type: 'radialBar',
      },
      colors: this.colors,
      plotOptions: {
        radialBar: {
          size: 50,
          startAngle: -135,
          endAngle: 135,
          dataLabels: {
            name: {
              fontSize: '0.8em',
              fontFamily: 'Proxima Nova',
              color: 'rgba(0, 0, 0, 0.5)',
              offsetY: 50,
            },
            value: {
              offsetY: -3,
              fontSize: '32px',
              fontFamily: 'Proxima Nova',
              color: 'rgba(0, 0, 0, 0.5)',
              formatter: (value: number) =>
                this.showPercentage ? value : this.value,
            },
          },
        },
      },
      stroke: {
        dashArray: 2,
      },
      series: [this._percentage],
      labels: this.titles,
    };

    this._chart = new ApexCharts(this.charElement.nativeElement, options);

    this._chart.render();

    // window.setInterval(function() {
    //   chart.updateSeries([Math.floor(Math.random() * (100 - 1 + 1)) + 1], true);
    // }, 2000);
  }
}
