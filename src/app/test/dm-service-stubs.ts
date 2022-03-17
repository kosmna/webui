import { Observable ,  of ,  BehaviorSubject, Subject } from 'rxjs';

import {
  CpuInfo,
  DeviceInfo,
  MemoryInfo,
  StorageInfo,
  NetworkInterface,
  SerialInterface,
  DeviceObject,
  DeviceStatus,
  NetworkConfig,
  IPConfig,
  Cert,
  HostInfo,
  Timezones,
  CrtStore,
  Modem,
  DeviceIdentity,
  ZerotierNetworkType,
  ZerotierNetwork,
  DmTemplate,
  DeviceMangCloudUrl,
} from '@app/system';
import { DeviceMangCloud } from '@app/system';
import { hostInfo, timezones, backupCloudList } from '@app/system/services/dummy';
import { Crt_Store } from '@app/system/mock/cert-store';
import { modem, modemConfigList, modemConfig } from '@app/system/mock/mobile-broad';
import { BackupCloud } from '@app/system/models/backup-restore-cloud';
import { Templates } from '@app/system/mock/template';


const exampleDeviceInfo: DeviceInfo = {
  firmwareVersion: 'firmware version',
  hardwareVersion: 'hardware version',
  manufacturer: 'manufacturer',
  modelNumber: 'model number',
  serialNumber: 'serial number'
};
const Ipconfig: IPConfig = {
  address: 'test address',
  gateway: 'test gateway',
  type: 'test type'
};

const networkConfig: NetworkConfig =  {
  idx: 123,
  inet: Ipconfig,
  inet6: Ipconfig,
  name: 'test name',
  wpa: {
    pass: 'test_password',
    ssid: 'test ssid',
  },
  wan: true
};

const exampleDeviceStatus: DeviceStatus = {
  lastActivityTS: 'lastActivityTS',
  lastMessage: 'lastMessage',
  lastStatusChangeTS: 'lastStatusChangeTS',
  status: 'status',
  statusCode: 200
};

const exampleCpuInfo: CpuInfo[] = [
  {
    cacheSize: 'cache size',
    clockMHz: '1',
    cpuCores: 1,
    modelName: 'model name',
    vendorID: 'vendor id'
  }
];

const exampleMemoryInfo: MemoryInfo = {
  memAvailable: 1,
  memTotal: 1,
  memUsed: 1,
  swapTotal: 1,
  swapUsed: 1
};

const exampleStorageInfo: StorageInfo = {
  dataFree: 1,
  dataSize: 1,
  totalSize: 1
};

const exampleNetworkInterfaces: NetworkInterface[] = [
  {
    addrs: [
      {
        address: 'address',
        family: 'family',
        type: 'type'
      }
    ],
    hwaddr: 'hwaddr',
    mtu: 0,
    name: 'name'
  }
];

const exampleSerialInterfaces: SerialInterface[] = [
  {
    manufacturer: 'manufacturer',
    model: 'model',
    name: 'name',
    serialNumber: 'serial number',
    speed: 'speed'
  }
];

const exampleDeviceObjects: DeviceObject[] = [
  {
    id: 1,
    instances: [
      {
        id: 1,
        resources: [
          {
            id: 1,
            name: 'name',
            protected: true,
            value: 'value'
          }
        ]
      }
    ],
    name: 'name',
    data: []
  }
];
const exampleData: ZerotierNetwork[] = [
  {
    addrs: ['192.168.1.254'],
    device: 'device',
    id: 'id',
    mac: 'mac',
    name: 'name',
    status: 'OK',
    type: ZerotierNetworkType.PUBLIC
  }
];
const exampleDeviceMangCloud: DeviceMangCloud = {
  activatedAt: '2000-08-23T19:52:05-04:00',
  companyID: '9vgp5h5qczfqsmxxd79gx9kik',
  companyName: 'ACME Corp.',
  deviceID: '9vgp5h5qczfqsmxxd79gx9kik',
  modelID: '9vgp5h5qczfqsmxxd79gx9kik',
  modelName: 'kosmyna-01-24',
  projectID: '9vgp5h5qczfqsmxxd79gx9kik',
  projectName: 'kosmyna-01',
  status: 'Ok',
  statusCode: 'OK'
};

const certInfo = {
  'issuer': 'Vitae molestias porro a debitis.',
  'notAfter': '2001-07-02T04:09:50-04:00',
  'notBefore': '1981-03-15T10:45:38-05:00',
  'subject': 'Eum non id nobis enim reprehenderit.'
};

  const datasourceDeviceObjects: BehaviorSubject<DeviceObject[]> = new BehaviorSubject(exampleDeviceObjects);
  const networkInterfaces: BehaviorSubject<NetworkInterface[]> = new BehaviorSubject([]);
  const serialInterfaces = new BehaviorSubject([]);
  const deviceStatus$: BehaviorSubject<DeviceStatus[]> = new BehaviorSubject([]);
  const storageInfo$: BehaviorSubject<StorageInfo> = new BehaviorSubject(null);
  const memoryInfo$: BehaviorSubject<MemoryInfo> = new BehaviorSubject(null);
  const friendlyNameChange$: Subject<boolean> = new Subject();


export const dmServiceStub = {
  datasourceDeviceObjects,
  networkInterfaces,
  serialInterfaces,
  deviceStatus$,
  storageInfo$,
  memoryInfo$,
  friendlyNameChange$,

  getDeviceInfo(): Observable<DeviceInfo> {
    return of(exampleDeviceInfo);
  },

  getDeviceStatus(): Observable<DeviceStatus[]> {
    return of([]);
  },

  rebootDevice(): Observable<boolean> {
    return of(true);
  },
  getCpuInfo(): Observable<CpuInfo[]> {
    return of(exampleCpuInfo);
  },

  getMemoryInfo(): Observable<MemoryInfo> {
    return of(exampleMemoryInfo);
  },

  getStorageInfo(): Observable<StorageInfo> {
    return of(exampleStorageInfo);
  },

  getNetworkInterfaces(): Observable<NetworkInterface[]> {
    return of(exampleNetworkInterfaces);
  },

  getSerialInterfaces(): Observable<SerialInterface[]> {
    return of(exampleSerialInterfaces);
  },

  getAllObjects(): Observable<DeviceObject[]> {
    return of(exampleDeviceObjects);
  },
  getCloudstatus(): Observable<DeviceMangCloud> {
    return of(exampleDeviceMangCloud);
  },
  registerDevice(): Observable<boolean> {
    return of(true);
  },
  deactivateCloud(): Observable<boolean> {
    return of(true);
  },
  getResourceValue(): Observable<string> {
    return of('protected value');
  },
  getAllNetworkConfigs(): Observable<NetworkConfig[]> {
    return of([networkConfig]);
  },
  getNetworkConfig(): Observable<NetworkConfig> {
    return of(networkConfig);
  },
  getCrt(): Observable<Cert> {
    return of(certInfo);
  },
  getCloudUrl(): Observable<DeviceMangCloudUrl> {
    const body = {url: 'url'};
    return of(body);
  },
  postCrt(): Observable<boolean> {
    return of(true);
  },
  getHostInfo(): Observable<HostInfo> {
    return of(hostInfo);
  },
  getTimezones(): Observable<Timezones> {
    return of(timezones);
  },
  getListCloudBackups(): Observable<BackupCloud[]> {
    return of(backupCloudList);
  },
  joinZerotierNetwork() {
    return of(true);
  },
  leaveZerotierNetwork() {
    return of(true);
  },
  getZerotierNetworks() {
    return of(exampleData);
  },
  backupConfiguration() {
    return of({});
  },
  backupConfigurationTemplate() {
    return of({});
  },
  getCrtStore(): Observable<CrtStore[]> {
    return of(Crt_Store);
  },
  mobileBroadbandInterfaces(): Observable<Modem[]> {
    return of(modem);
  },
  getModemConfigs(): Observable<any[]> {
    return of(modemConfigList);
  },
  updateModemConfig(name: string, body: any): Observable<any> {
    return of(true);
  },
  getModemConfig(name: string): Observable<any> {
    return of(modemConfig);
  },
  deviceIdentity(): Observable<DeviceIdentity> {
    return of({pubKey: ''});
  },
  getTemplate(): Observable<DmTemplate> {
    return of(Templates);
  },
  updateTemplate(template: any): Observable<any> {
    return of(true);
  },
  createTemplate(): Observable<any> {
    return of(true);
  },
  getNetInterfaces(): Observable<NetworkConfig[]> {
    return of([networkConfig]);
  }
};
