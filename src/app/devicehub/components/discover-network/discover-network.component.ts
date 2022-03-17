import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { interval ,  Subscription } from 'rxjs';
import { MatSort } from '@angular/material';
import { switchMap, startWith, flatMap } from 'rxjs/operators';

import { NetworkDiscoveryService } from '@app/cosmyna/services';
import { Iface, NetworkNode } from '@app/cosmyna/models';
import { NotificationsService } from '@app/loop-notifications/services';
import { I18n } from '@ngx-translate/i18n-polyfill';

interface NetworkDiscoverElement extends Iface {
  data: NetworkNode[];
  panelDisabled: boolean;
  lastUpdated?: number;
}

@Component({
  selector: 'loop-discover-network',
  templateUrl: './discover-network.component.html',
  styleUrls: ['./discover-network.component.scss'],
})
export class DiscoverNetworkComponent implements OnInit, OnDestroy {
  iFaceList: NetworkDiscoverElement[];
  showCopyButton = {};
  sortList: any;

  @ViewChild('accordion') accordion: any;
  @ViewChild(MatSort) sort: MatSort;

  columnsDefinition = [ 'online', 'lastSeen', 'hostname', 'plcVendor', 'ipv4', 'mac', 'macVendor', 'ports',  'actions'];
  private subscriptions: Map<string, Subscription> = new Map();
  private interval = 30000;
  constructor(
    private _dnService: NetworkDiscoveryService,
    private _notify: NotificationsService,
    private _i18n: I18n
  ) {}
  addSpace(stringArr: string[]): string {
    if (stringArr.length === 0) {
      return '';
    }
    const string = stringArr.join(', ');
    return string;
  }

  ngOnInit(): void {
    this._dnService.getIfaces()
    .subscribe((list: Iface[]) => {
      list.forEach(e => {
        e = Object.assign(e, { data:  [] , panelDisabled: false, lastUpdated: Date.now() });
        if (e.enabled) {
          this.getNodes(e as NetworkDiscoverElement);
        }
      });
      this.iFaceList = list as NetworkDiscoverElement[];

      if (this.iFaceList.length === 0) {
        this.iFaceList = null;
      }
    });


  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => {
      if (value) {
        value.unsubscribe();
      }
    });
  }

  /**
   * Ng change on the toggle switch
   * @param iface
   */
  toggleDiscovery(iface: NetworkDiscoverElement): void {
    iface.enabled = !iface.enabled;
    iface.enabled ? this.enableAndNodes(iface) : this.stopScanning(iface);
  }
/**
 * Init method to get nodes if interface enabled is set to true
 *
 * @param {NetworkDiscoverElement} iface
 * @memberof DiscoverNetworkComponent
 */
  getNodes(iface: NetworkDiscoverElement): void {
    const sub = interval(this.interval)
      .pipe(
        startWith(-1),
        switchMap(() => this._dnService.getNode(iface.name))
      )
      .subscribe((nodes) => {
        nodes.forEach((node) => {
          const ports = [];
          if (node.tcpPorts) {
            ports.push(...node.tcpPorts);
          }
          if (node.udpPorts) {
            ports.push(...node.udpPorts);
          }
          node.ports  = ports;

        });

        iface.lastUpdated = Date.now();
        iface.data = nodes;
      // this._notify.notificationSnackSource = { msg: `scanning on ${iface.name}`};
      });

      this.subscriptions.set(iface.name, sub);
  }
  /**
   * Enable interface then call api interval to get nodes
   *
   * @param {NetworkDiscoverElement} iface
   * @memberof DiscoverNetworkComponent
   */
  enableAndNodes(iface: NetworkDiscoverElement): void {
    let subscription: Subscription;
    iface.panelDisabled = true;
    if (this.subscriptions.has(iface.name)) {
      subscription = this.subscriptions.get(iface.name);
      if (subscription) {
        subscription.unsubscribe();
      }
      this.subscriptions.set(iface.name, null);
    }
    subscription = this._dnService.enableIface(iface.name)
    .pipe(
      flatMap(() => {
        iface.panelDisabled = false;
        return interval(this.interval)
        .pipe(
          startWith(-1),
          switchMap(() => this._dnService.getNode(iface.name))
        );
      })

    )
    .subscribe((nodes) => {
      iface.data = nodes;
    });
    // this._notify.notificationSnackSource = { msg: `scanning on ${iface.name}`};
    this.subscriptions.set(iface.name, subscription);

  }
  /**
   * Stop interval and call disable
   *
   * @param {NetworkDiscoverElement} iface
   * @memberof DiscoverNetworkComponent
   */
  stopScanning(iface: NetworkDiscoverElement): void {

    let subscription: Subscription;
    iface.panelDisabled = true;

    if (this.subscriptions.has(iface.name)) {
      subscription = this.subscriptions.get(iface.name);
      if (subscription) {
        subscription.unsubscribe();
      }
      this.subscriptions.set(iface.name, null);
    }
    this._dnService.disableIface(iface.name)
    .subscribe(_ => {
      iface.panelDisabled = false;
      // clear table
      iface.data = [];
      this._notify.notificationSnackSource = { msg: this._i18n(`stopped scanning on`) + iface.name};
    });
  }


}
