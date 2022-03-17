import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { Modem } from '@app/system/models';

@Component({
  selector: 'loop-modem-panel',
  templateUrl: './modem-panel.component.html',
  styleUrls: ['./modem-panel.component.scss']
})
export class ModemPanelComponent  {
  dataSource: MatTableDataSource<Modem>;
  // TODO make columns responsive based on screen size
  private _columnsDef: string[] = ['status',  'signalBars', 'network', 'addrIPv4', 'addrIPv6', 'imei', 'iccid', 'apnAssigned'];
  /**
   * Only show columns that api returns
   */
  set columnsDef(keys: string[]) {

    this._columnsDef = this._columnsDef.filter((e: string) => keys.indexOf(e) > -1);
  }

  get columnsDef(): string[] {
    return this._columnsDef;
  }

  /**
   * Set Input data to data source
   *
   */
  @Input()
  set modemInfo(modemArr: Modem[]) {
    if (modemArr.length > 0) {
      this.columnsDef = Object.keys(modemArr[0]);
    }
    this.dataSource.data = modemArr;
  }

  constructor(
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

}
