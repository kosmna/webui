import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { OpcCertificate } from '@app/kosmyna-opcua/models';

@Component({
  selector: 'loop-opcua-clients',
  templateUrl: './opcua-clients.component.html',
  styleUrls: ['./opcua-clients.component.scss'],
})
export class OpcuaClientsComponent implements OnInit, OnChanges {
  @Input()
  clients: Array<OpcCertificate>;
  @Output()
  toggleTrusted = new EventEmitter<OpcCertificate>();
  @Output()
  deleteCertificate = new EventEmitter<OpcCertificate>();
  @Output() showInfo = new EventEmitter<OpcCertificate>();
  dataSource = new MatTableDataSource<OpcCertificate>();
  displayColumns = ['id', 'ca_verified', 'trusted', 'info', 'actions'];
  constructor() {}

  ngOnInit() {
    this.dataSource.data = this.clients;
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges && simpleChanges.clients) {
      this.dataSource.data = simpleChanges.clients.currentValue;
    }
  }
}
