import { Device, DeviceParity, DeviceCommunicationType, DriverTemplate,
  Register, DeviceStatus } from '@app/cosmyna/models';
import { deviceResponse, templateResponse } from '@app/test/device-hub.data';

import { Observable ,  Subject ,  of } from 'rxjs';



const deviceStatus: DeviceStatus = {
  status: 'connected',
  id: 'test_id'
};

const registersTableSource: Subject<Register[]> = new Subject<Register[]>();
const registersTable$ = registersTableSource.asObservable();

export const cosmynaServiceStub = {
  registersTableSource,
  registersTable$,
  getDriverTemplate(id: string): Observable<DriverTemplate> {
   return of(templateResponse);
  },
  getDeviceTypes() {
    return of([
      {
        id: '46d13a0d-a4bf-4990-bb27-3391570ff8ac',
        name: 'Modbus',
        drivers: [
          {
            id: '9e04d2fe-826f-4927-82c7-bda6106ab31b',
            name: 'Modbus driver'
          }
        ]
      }
    ]);
  },
  getDrivers() {
    return of([]);
  },
  getDevices(): Observable<Device[]> {
    return of([
      deviceResponse
    ]);
  },
  deleteDevice(device) {
    return of(true);
  },
  createDevice(device) {
    return of({});
  },
  getRegisters() {
    return of([]);
  },
  getDeviceStatus(device: Device) {
    return of({
      status: 'DISCONNECTED',
      lastError: {
        msgCode: 'Fail',
        msg: 'Failed to obtain status'
      }
    });
  },
  showDevicesStatus(): Observable<DeviceStatus[]> {
    return of([deviceStatus]);
  },
  pollDeviceStatus(): Observable<DeviceStatus> {
    return of(deviceStatus);
  },
  pollDevicesStatus(): Observable<DeviceStatus[]> {
    return of([deviceStatus]);
  },
  getDeviceType(deviceTypeId: string) {
    return of({
      id: '46d13a0d-a4bf-4990-bb27-3391570ff8ac',
      name: 'Modbus',
      drivers: [
        {
          id: '9e04d2fe-826f-4927-82c7-bda6106ab31b',
          name: 'Modbus driver'
        }
      ]
    });
  },
  getOmaBindings() {
    return of([]);
  }
};
