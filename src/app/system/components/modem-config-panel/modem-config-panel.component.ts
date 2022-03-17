import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'loop-modem-config-panel',
  templateUrl: './modem-config-panel.component.html',
  styleUrls: ['./modem-config-panel.component.scss']
})
export class ModemConfigPanelComponent {
  dataSource: MatTableDataSource<any>;
  // TODO make columns responsive based on screen size
  columnsDef: string[] = [ 'apnAssigned', 'apn', 'actions'];
  /*
   * Set Input data to dataSource
   */
  @Input()
  set modemConfigList(modemArr: any[]) {
    this.dataSource.data = modemArr;
  }

  @Output() updateConfig: EventEmitter<any> = new EventEmitter();
  constructor(
  ) {
    this.dataSource = new MatTableDataSource([]);
  }
}
