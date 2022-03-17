import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { NetworkNode } from '@app/cosmyna/models';

@Component({
  selector: 'loop-discover-network-table',
  templateUrl: './discover-network-table.component.html',
  styleUrls: ['./discover-network-table.component.scss']
})
export class DiscoverNetworkTableComponent implements AfterViewInit {
  dataSource: MatTableDataSource<NetworkNode>;
  columnsDefinition = [ 'online', 'hostname', 'plcVendor', 'ipv4', 'lastSeen', 'mac', 'macVendor', 'ports',  'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @Input()
  set data (content: NetworkNode[]) {
    this.dataSource.data = content;
  }

  constructor() {
    this.dataSource = new MatTableDataSource([]);
   }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

}
