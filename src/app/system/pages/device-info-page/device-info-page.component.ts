import { BehaviorSubject ,  Observable ,  Subject  } from 'rxjs';
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import {
  CpuInfo,
  DeviceInfo,
  MemoryInfo,
  FlatNetworkInterfaceAddress,
  StorageInfo,
  SerialInterface,
  Modem
} from '@app/system/models';
import { DeviceManagementService } from '@app/system/services';
import { Device_Info_Animations } from './device-info-page.animations';
import { NetworkDataSource } from './network.datasource';
import { SerialDataSource } from './serial.datasource';

@Component({
  selector: 'loop-device-info-page',
  templateUrl: './device-info-page.component.html',
  styleUrls: ['./device-info-page.component.scss'],
  animations: Device_Info_Animations,
  encapsulation: ViewEncapsulation.None,
})
export class DeviceInfoPageComponent implements OnDestroy, OnInit {
  modemInterfaces: Modem[];
  deviceInfo: DeviceInfo;
  cpuInfo: CpuInfo[];
  memInfo: MemoryInfo;
  storageInfo: StorageInfo;
  networkInterfaces: FlatNetworkInterfaceAddress[] = [];
  serialInterfaces: SerialInterface[] = [];
  networkDataSource: NetworkDataSource | null;
  serialDataSource: SerialDataSource | null;
    // [25, 50, 75, 100]
  protected  destroySubs$: Subject<boolean> = new Subject();
  private memory$: BehaviorSubject<any> = new BehaviorSubject([]);
  get memoryPieChart$(): Observable<any[]> {
    return this.memory$.asObservable();
  }

  private storage$: BehaviorSubject<any> = new BehaviorSubject([]);
  get storagePieChart$(): Observable<any[]> {
   return this.storage$.asObservable();
  }

  constructor(
    private _dmService: DeviceManagementService,
  ) { }

  // Some of these will update on an interval so we unsubscribe when the page changes
  ngOnDestroy(): void {
    this.destroySubs$.next(true);
    this.destroySubs$.complete();
  }


  ngOnInit(): void {
    this.networkDataSource = new NetworkDataSource(this._dmService);
    this.serialDataSource = new SerialDataSource(this._dmService);

    this._dmService.getDeviceInfo()
      .pipe(
        takeUntil(this.destroySubs$)
      )
      .subscribe(info => {
        this.deviceInfo = info;
      });

    this._dmService.getCpuInfo()
    .pipe(
     takeUntil(this.destroySubs$)
    )
    .subscribe(cpuInfo => {
        // bug in api response, returns object with empty values;
        this.cpuInfo = cpuInfo.filter(cpu => !!cpu.modelName);

      });

    this._dmService.getMemoryInfo()
      .pipe(
       takeUntil(this.destroySubs$)
      )
      .subscribe(memInfo => {
        this.memInfo = memInfo;
      });

      this._dmService.getStorageInfo()
      .pipe(
       takeUntil(this.destroySubs$)
      )
      .subscribe(storageInfo => {
        this.storageInfo = storageInfo;
      });

    // modem
    this._dmService.mobileBroadbandInterfaces()
    .pipe(
      takeUntil(this.destroySubs$)
    )
    .subscribe((modemInterface) => {
      this.modemInterfaces = modemInterface;
    });

  }

  toGigahertz(mhz: string): string {
    return (+mhz / 1000).toFixed(2) + ' GHz';
  }

}

