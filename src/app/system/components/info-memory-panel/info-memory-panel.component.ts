import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { MemoryInfo, StorageInfo } from '@app/system';


@Component({
  selector: 'loop-info-memory-panel',
  templateUrl: './info-memory-panel.component.html',
  styleUrls: ['./info-memory-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class InfoMemoryPanelComponent {
  @Input() totalTxt: string;
  @Input() usedTxt: string;
  @Input() availableTxt: string;
  @Input() type: string;
  @Input()
  set data(info: any) {
    this._data = info;
    switch (this.type) {
      case 'memory':
      this.setMemoryPieChart(info);
      break;
      case 'storage':
      this.setStoragePieChart(info);
    }
  }
  get data(): any {
    return this._data;
  }
  pieWarningColors = ['#455bb3', '#9d45b3', '#b39d45', '#b3455b'];
  pieAvailableColor = '#45B39D';

  private _chartSource$: BehaviorSubject<any> = new BehaviorSubject([]);
  get chartSource$(): Observable<any[]> {
    return this._chartSource$.asObservable();
  }
  private _data: any;
  constructor() {}

  /**
  *  TODO: Set color based on percentage
  */
  setMemoryPieChart(memInfo: MemoryInfo) {
    const data = [
      {
        key: this.usedTxt,
        y: this.toMiB(memInfo['memUsed']),
        color: this.getWarningColors(Math.round(memInfo['memUsed'] / memInfo['memTotal']))
      },
      {
        key: this.availableTxt,
        y: this.toMiB(memInfo['memAvailable']),
        color: this.pieAvailableColor,
      },
    ];
    this._chartSource$.next(data);
  }

  setStoragePieChart(storageInfo: StorageInfo): void {
    const data = [
      {
        key: this.usedTxt,
        y: this.toGiB(storageInfo['dataSize']),
        color: this.getWarningColors(Math.round(storageInfo['dataSize'] / storageInfo['totalSize'] * 100))
      },
      {
        key: this.availableTxt,
        y: this.toGiB(storageInfo['dataFree']),
        color: this.pieAvailableColor
      },
    ];
    this._chartSource$.next(data);
  }


  toMiBString(kib: number): string {
    return (kib / 1024).toFixed(2) + ' MiB';
  }


  toGiBString(kib: number): string {
    return (kib / (1024 * 1024)).toFixed(2) + ' GiB';
  }
// For Pie Charts
  private toMiB(kib: number): number {
    const mib =  (kib / 1024);
    return Math.round(mib * 100) / 100;
  }


  private toGiB(kib: number): number {
    return Math.round((kib / (1024 * 1024)) * 100 ) / 100;
  }

  private getWarningColors(percent: number): string {

    percent = 0;
      if (percent  < 26) {

        return this.pieWarningColors[0];
      }

      if ( percent < 51) {
        return this.pieWarningColors[1];
      }

      if ( percent < 76) {
        return this.pieWarningColors[2];
      }

      return this.pieWarningColors[3];
    }
}
