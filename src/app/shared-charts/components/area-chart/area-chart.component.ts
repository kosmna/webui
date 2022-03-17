import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  Input,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import * as ApexCharts from 'apexcharts';

@Component({
  selector: 'loop-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.scss'],
})
export class AreaChartComponent
  implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  @Input() title: string;
  @Input() yAxisTitle = '%';
  @Input() series: string[];
  @Input() seriesData: { x: any; y: number };
  @Input() seriesColors = ['#79B473'];
  @Input() maximumY: number;
  @Input() animationSpeed = 2000;
  @ViewChild('chart') charElement: ElementRef;
  data: { x: any; y: number }[][];
  chart: ApexCharts;
  componentActive = true;
  private _series = [];
  constructor() {}

  ngOnInit() {
    this.data = [];
    this.series.forEach(_ => this.data.push([]));
    this.buildSeries();
  }

  ngAfterViewInit() {
    this.drawChart();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.seriesData && changes.seriesData.currentValue) {
      const minimum = changes.seriesData.currentValue[0].x;
      const updateData = [];
      changes.seriesData.currentValue.forEach((element, index: number) => {
        this.updateData(element, index);
        updateData.push({ name: this.series[index], data: this.data[index] });
      });
      this.chart.updateSeries(updateData, true);
      this.chart.updateOptions({ xaxis: { min: minimum - 60000 } }, true, true);
    }
  }
  ngOnDestroy() {
    this.componentActive = false;
  }

  updateData(value: { x: any; y: number }, index: number) {
    if (this.data[index].length > 300) {
      this.data[index].shift();
    }
    this.data[index].push({
      x: value.x,
      y: value.y,
    });
  }

  buildSeries() {
    this.series.forEach((item, index) =>
      this._series.push({
        name: item,
        data: this.data[index].map(values => values.y),
      })
    );
  }

  drawChart() {
    const options: ApexCharts.ApexOptions = {
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      chart: {
        type: 'area',
        height: 183,
        fontFamily: 'Proxima Nova',
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: this.animationSpeed,
          },
        },
      },
      colors: this.seriesColors,
      title: {
        text: this.title,
        align: 'left',
      },
      series: this._series,
      yaxis: {
        min: 0,
        max: this.maximumY,
        tickAmount: 5,
        title: {
          text: this.yAxisTitle,
          rotate: -90,
          offsetX: 5,
        },
      },
      xaxis: {
        type: 'datetime',
        min: new Date().getTime() - 60000,
        tickAmount: 6,
      },
      tooltip: {
        x: {
          format: 'HH:mm:ss',
        },
        y: {
          formatter: value =>
            `${value % 1 !== 0 ? value.toFixed(2) : value} ${this.yAxisTitle}`,
        },
        shared: true,
        items: {
          display: 'flex',
        },
        fixed: {
          enabled: false,
          position: 'topLeft', // topRight; topLeft; bottomRight; bottomLeft
          offsetX: 0,
          offsetY: 0,
        },
      },
    };
    this.chart = new ApexCharts(this.charElement.nativeElement, options);
    this.chart.render();
  }
}
