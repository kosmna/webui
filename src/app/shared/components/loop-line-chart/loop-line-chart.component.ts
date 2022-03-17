import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Input,
} from '@angular/core';
// The ES5 version is imported because UglifyJS doesn't like ES6
import * as Dygraph from 'dygraphs/src-es5/dygraph';
import {
  trigger,
  transition,
  animate,
  keyframes,
  style,
} from '@angular/animations';

@Component({
  selector: 'loop-line-chart',
  templateUrl: './loop-line-chart.component.html',
  styleUrls: ['./loop-line-chart.component.scss'],
  animations: [
    trigger('chartAnimation', [
      transition('* =>  off', [
        animate(
          '500ms ease-in',
          keyframes([
            style({ opacity: 1 }),
            style({ opacity: 0.75 }),
            style({ opacity: 0 }),
          ])
        ),
      ]),
      transition('* =>  on', [
        animate(
          '500ms ease-in',
          keyframes([
            style({ opacity: 0 }),
            style({ opacity: 0.75 }),
            style({ opacity: 1 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class LoopLineChartComponent implements AfterViewInit {
  @ViewChild('chart')
  chart: ElementRef;
  @ViewChild('legend')
  legend: ElementRef;
  @Input()
  data: Array<Array<number>>;
  @Input()
  valueRange: number[]; // If the values are null, the range is calculated automatically
  @Input()
  labels: string[];
  @Input()
  formatLegend = true;
  @Input()
  unit = '';
  @Input()
  showPercent = false;
  @Input()
  stacked = false;
  selectRange = false;
  chartOpacity = 'off';

  chartData = 'Year,Value\n2015,1\n2016,2\n2017,3';
  graph: any; // See Dygraph API
  dateWindow: any[] = [];
  latest: any;
  earliest: any;
  range: any;
  zoom: boolean;

  constructor() {}

  update() {
    const options = {};
    if (this.labels) {
      options['labels'] = this.labels;
    }

    if (this.formatLegend) {
      options['legend'] = 'always';
      options['legendFormatter'] = this.createLegendFormatter();
      options['labelsDiv'] = this.legend.nativeElement;
    }

    options['axes'] = {
      x: {
        pixelsPerLabel: 50,
        axisLabelWidth: 100,
      },
      y: {
        pixelsPerLabel: 20,
        axisLabelWidth: 40,
      },
    };
    options['axisLabelWidth'] = 30;
    options['fillGraph'] = this.stacked;
    options['valueRange'] = this.valueRange;
    options['axisLabelFontSize'] = 12;
    options['highlightSeriesOpts'] = { strokeWidth: 2 };
    options['drawCallback'] = (a, b) => {
      this.latest = a.file_[a.file_.length - 1][0];
      this.latest = new Date(this.latest).getTime();
    };
    options['showRangeSelector'] = this.selectRange;
    options['zoomCallback'] = (minDate, maxDate, yRanges) => {
      this.zoom = true;
      this.range = Math.abs(maxDate - minDate);
    };

    if (this.graph) {
      options['file'] = this.data;
      if (this.zoom) {
        this.earliest = this.latest - this.range;
        this.dateWindow = [this.earliest, this.latest];
        options['dateWindow'] = this.dateWindow;
        options['valueRange'] = this.valueRange;
        // this.graph.resetZoom();
      }
      this.graph.updateOptions(options);
    } else if (this.data) {
      this.graph = new Dygraph(this.chart.nativeElement, this.data, options);
      this.gracefullyShow();

      if (this.selectRange) {
        this.removeRightSelector();
      }
    }
  }

  ngAfterViewInit(): void {}

  resize(width: number, height: number): void {
    if (this.graph) {
      if (this.formatLegend) {
        // Gives some extra space to the legend on the right
        this.graph.resize(width, height - 40);
      } else {
        this.graph.resize(width, height);
      }
    }
  }

  resetGraph(): void {
    this.gracefullyShow();
    this.graph.resetZoom();
    this.zoom = false;
  }

  gracefullyShow(): void {
    this.chartOpacity = 'on';
    setTimeout(() => (this.chartOpacity = ''), 1000);
  }

  removeRightSelector(): void {
    const elemtArry = this.chart.nativeElement.querySelectorAll(
      '.dygraph-rangesel-zoomhandle'
    );
    if (elemtArry.length > 0) {
      const el = elemtArry[1];
      el.remove();
    }
  }

  // For information on how this works, look up Dygraph Legend Formatter
  createLegendFormatter(): Function {
    const maxValue = this.valueRange ? this.valueRange[1] : 1;
    const showPercent = this.showPercent;
    const unit = this.unit;
    return function(data: any) {
      if (data.x == null) {
        return (
          '<br>' +
          data.series
            .map(
              series =>
                series.dashHTML +
                ' ' +
                '<span class="mat-caption">' +
                series.labelHTML +
                '</span>'
            )
            .join('<br>')
        );
      }
      let html =
        '<span class="mat-caption">' +
        'Date/Time: ' +
        data.xHTML.split('.')[0] +
        '</span>';
      data.series.forEach(series => {
        if (!series.isVisible) {
          return;
        }
        let labeledData = series.labelHTML + ': ' + series.yHTML;
        if (series.isHighlighted) {
          labeledData =
            '<span style="font-weight: bold" class="mat-caption highlighted">' +
            labeledData +
            unit +
            '</span>';
        } else {
          labeledData =
            '<span class="mat-caption">' + labeledData + unit + '</span>';
        }
        if (showPercent) {
          labeledData += ' (' + ((100 * series.y) / maxValue).toFixed(1) + '%)';
        }
        html +=
          '<br>' +
          series.dashHTML +
          ' ' +
          '<span class="mat-caption">' +
          labeledData +
          '</span>';
      });
      return html;
    };
  }
}
