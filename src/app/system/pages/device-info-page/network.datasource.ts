import { DataSource } from '@angular/cdk/collections';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { DeviceManagementService } from '@app/system/services';
import { FlatNetworkInterfaceAddress } from '@app/system/models';

export class NetworkDataSource extends DataSource<any> {
  datalength = 0;
  constructor(private _dmService: DeviceManagementService) {
    super();
  }

  connect(): Observable<FlatNetworkInterfaceAddress[]> {
    this._dmService.getNetworkInterfaces();
    return this._dmService.networkInterfaces
    .pipe(
      map(results => {
        this.datalength = results.length;
        const flatAddresses: FlatNetworkInterfaceAddress[] = [];
        results.forEach(result => {
          if (result.addrs) {
            result.addrs.forEach(address => {
              flatAddresses.push({
                address: address.address,
                family: address.family,
                type: address.type,
                hwaddr: result.hwaddr,
                mtu: result.mtu,
                name: result.name
              });
            });
          } else {
            // If device is not connected
            flatAddresses.push(
              {
                hwaddr: result.hwaddr,
                mtu: result.mtu,
                name: result.name
              }
            );
          }

        });
        return flatAddresses;
      })
    );

  }

  disconnect(): void {
  }

}
