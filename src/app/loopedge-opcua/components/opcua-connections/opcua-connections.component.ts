import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store, select } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';

import * as fromOpc from '../../state';
import * as opcActions from '../../state/opc.actions';
import { OpcCertificate } from '@app/kosmyna-opcua/models';
import { MatDialog } from '@angular/material';
import { CertificateInfoComponent } from '../certificate-info';
import { interval } from 'rxjs';

@Component({
  selector: 'loop-opcua-connections',
  templateUrl: './opcua-connections.component.html',
  styleUrls: ['./opcua-connections.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpcuaConnectionsComponent implements OnInit, OnDestroy {
  certificates: Observable<OpcCertificate[]>;
  autoRefresh$: Observable<boolean>;
  autoRefresh = true;
  componentActive = true;

  constructor(
    private _store: Store<fromOpc.State>,
    private _matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.certificates = this._store.pipe(select(fromOpc.getClients));
    this.autoRefresh$ = this._store.pipe(
      select(fromOpc.getAutoRefreshState),
      takeWhile(() => this.componentActive)
    );
    this.reloadData();
    this.autoRefresh$.subscribe(value => {
      this.autoRefresh = value;
      if (value) {
        this._scheduleRefresh();
      }
    });
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

  toggleTrusted(certificate: OpcCertificate) {
    this._store.dispatch(new opcActions.ToggleTrusted(certificate));
  }

  deleteCertificate(certificate: OpcCertificate) {
    this._store.dispatch(new opcActions.DeleteClient(certificate));
  }

  deleteAllCertificates() {
    this._store.dispatch(new opcActions.DeleteAllClients());
  }
  showCertificateInfo(certificate: OpcCertificate) {
    this._matDialog.open(CertificateInfoComponent, {
      width: '40%',
      minWidth: '320px',
      data: certificate,
    });
  }
  reloadData() {
    this._store.dispatch(new opcActions.LoadClients());
  }

  updateAutoRefresh(value: boolean) {
    this._store.dispatch(new opcActions.ToggleAutoRefresh(value));
  }

  private _scheduleRefresh() {
    interval(2000)
      .pipe(takeWhile(() => this.componentActive && this.autoRefresh))
      .subscribe(_ => this.reloadData());
  }
}
