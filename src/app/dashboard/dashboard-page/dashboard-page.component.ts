import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
  HostListener,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSlideToggle } from '@angular/material';

import { LoopLineChartComponent } from '@app/shared';
import { DashboardService } from '@app/dashboard/services/dashboard.service';

import { I18n } from '@ngx-translate/i18n-polyfill';

@Component({
  selector: 'loop-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent
  implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('cpuChartCard', { read: ElementRef })
  cpuChartCard: ElementRef;
  @ViewChild('memoryChartCard', { read: ElementRef })
  memoryChartCard: ElementRef;
  @ViewChild('networkInChartCard', { read: ElementRef })
  networkInChartCard: ElementRef;
  @ViewChild('networkOutChartCard', { read: ElementRef })
  networkOutChartCard: ElementRef;

  @ViewChild('cpuChart')
  cpuChart: LoopLineChartComponent;
  @ViewChild('memoryChart')
  memoryChart: LoopLineChartComponent;
  @ViewChild('networkInChart')
  networkInChart: LoopLineChartComponent;
  @ViewChild('networkOutChart')
  networkOutChart: LoopLineChartComponent;

  @ViewChild('cpuToggleSwitch')
  cpuToggleSwitch: MatSlideToggle;
  @ViewChild('memoryToggleSwitch')
  memoryToggleSwitch: MatSlideToggle;
  @ViewChild('networkInToggleSwitch')
  networkInToggleSwitch: MatSlideToggle;
  @ViewChild('networkOutToggleSwitch')
  networkOutToggleSwitch: MatSlideToggle;
  readonly MAX_SIZE = 300;
  cpuResults: Array<Array<number | Date>>;
  memoryResults: Array<Array<number | Date>>;
  networkInResults: Array<Array<number | Date>>;
  networkOutResults: Array<Array<number | Date>>;

  // The stream from the PCP API
  statsInfoStream: Subscription;

  // Labels for each network item
  cpuLabels = [this._i18n('Time')];
  memoryLabels = [
    this._i18n('Time'),
    this._i18n('Memory Usage + Cache'),
    this._i18n('Memory Usage'),
  ];
  networkLabels: string[];

  // Chart toggles
  cpuToggle = true;
  memoryToggle = true;
  networkInToggle = true;
  networkOutToggle = true;

  // Units of measure for each chart
  cpuUnit = '%';
  memoryUnit = 'MiB';
  networkUnit = 'MiB';

  // Conversions for each unit of measure
  memoryDenominator = 1024; // Converting from Kbyte to MiB
  networkDenominator = 1024 * 1024; // Converting from Byte to MiB

  // Maximum amount of memory, same unit as above
  memoryRange: number[];

  constructor(
    private cdref: ChangeDetectorRef,
    private dashboardService: DashboardService,
    private _i18n: I18n
  ) {}
  // reload gridster after window size reload
  @HostListener('window:resize', ['$event'])
  onScreenResize(event) {
    // this.gridster.reload();
    this.onItemResize();
  }

  ngOnDestroy() {
    // Prevents updates from the observable on other pages
    this.statsInfoStream.unsubscribe();
  }

  ngOnInit() {
    this.statsInfoStream = this.dashboardService
      .getChartData()
      .subscribe(data => {
        this.memoryRange = [0, 2000];
        let numNetworks = 0;
        this.networkLabels = [this._i18n('Time')];
        data.netin.label.forEach(networkData => {
          if (networkData !== 'Time') {
            numNetworks++;
            this.networkLabels.push(networkData);
          }
        });
        let numCPUs = 0;
        this.cpuLabels = [this._i18n('Time')];
        data.cpu.label.forEach(cpu => {
          if (cpu !== 'Time') {
            this.cpuLabels.push(cpu);
            numCPUs++;
          }
        });
        if (!this.cpuResults) {
          this.cpuResults = this.initializeData(numCPUs, data.cpu.data[0]);
          this.memoryResults = this.initializeData(2, data.mem.data[0]);
          this.networkInResults = this.initializeData(
            numNetworks,
            data.netin.data[0]
          );
          this.networkOutResults = this.initializeData(
            numNetworks,
            data.netout.data[0]
          );
        }
        const cpuData = data.cpu.data;
        cpuData[0] = new Date(cpuData[0]);
        const memoryData = data.mem.data;
        memoryData[0] = new Date(memoryData[0]);
        const networkInData = data.netin.data;
        networkInData[0] = new Date(networkInData[0]);
        const networkOutData = data.netout.data;
        networkOutData[0] = new Date(networkOutData[0]);
        this.cpuResults.push(cpuData);
        this.checkSize(this.cpuResults);
        if (this.cpuChart) {
          this.cpuChart.update();
        }
        this.memoryResults.push(memoryData);
        this.checkSize(this.memoryResults);
        if (this.memoryChart) {
          this.memoryChart.update();
        }
        this.networkInResults.push(networkInData);
        this.checkSize(this.networkInResults);
        if (this.networkInChart) {
          this.networkInChart.update();
        }
        this.networkOutResults.push(networkOutData);
        this.checkSize(this.networkOutResults);
        if (this.networkOutChart) {
          this.networkOutChart.update();
        }
        this.onItemResize();
      });
  }

  ngAfterViewInit(): void {
    // This gives the proper page dimensions for the outer div.
    // For some reason it won't display right on first load so it's reloaded.
    // this.gridster.reload();
  }
  toggleRange(chartElement: LoopLineChartComponent): void {
    // reset graph
    chartElement.graph = null;
    chartElement.selectRange = !chartElement.selectRange;
    chartElement.update();
  }

  resetChart(chartElement: LoopLineChartComponent): void {
    chartElement.resetGraph();
  }
  // Resets each chart size after every resize event
  onItemResize($event?): void {
    const widthAdjustment = 30;
    const heightAdjustment = 70;
    if (this.cpuChart) {
      const cpuElement: any = this.cpuChartCard.nativeElement;
      this.cpuChart.resize(
        cpuElement.clientWidth - widthAdjustment,
        cpuElement.clientHeight - heightAdjustment
      );
    }

    if (this.memoryChart) {
      const memoryElement: any = this.memoryChartCard.nativeElement;
      this.memoryChart.resize(
        memoryElement.clientWidth - widthAdjustment,
        memoryElement.clientHeight - heightAdjustment
      );
    }

    if (this.networkInChart) {
      const networkInElement: any = this.networkInChartCard.nativeElement;
      this.networkInChart.resize(
        networkInElement.clientWidth - widthAdjustment,
        networkInElement.clientHeight - heightAdjustment
      );
    }

    if (this.networkOutChart) {
      const networkOutElement: any = this.networkOutChartCard.nativeElement;
      this.networkOutChart.resize(
        networkOutElement.clientWidth - widthAdjustment,
        networkOutElement.clientHeight - heightAdjustment
      );
    }

    this.cdref.detectChanges();
    // this.gridster.reload();
  }

  checkSize(array: any[]): void {
    if (array.length > this.MAX_SIZE) {
      array.shift();
    }
  }

  /**
   * Initializes an array for a Loop Line Chart
   * @param numSeries - The number of data series in the initialized data array
   * @returns an array representing Loop Line Chart series data
   */
  initializeData(
    numSeries: number = 1,
    date: any
  ): Array<Array<Date | number>> {
    const array = [];
    const startingDate = new Date(date);
    const seriesData = [];
    for (let i = 0; i < numSeries; i++) {
      seriesData.push(0);
    }
    for (let i = 299; i >= 0; i--) {
      array.push([new Date(startingDate.getTime() - i * 1000), ...seriesData]);
    }
    return array;
  }

  toggleCpu() {
    this.cpuToggle = !this.cpuToggle;
    this.cpuToggleSwitch.toggle();
  }

  toggleMemory() {
    this.memoryToggleSwitch.toggle();
    this.memoryToggle = !this.memoryToggle;
  }

  toggleNetworkIn() {
    this.networkInToggleSwitch.toggle();
    this.networkInToggle = !this.networkInToggle;
  }

  toggleNetworkOut() {
    this.networkOutToggleSwitch.toggle();
    this.networkOutToggle = !this.networkOutToggle;
  }
}
