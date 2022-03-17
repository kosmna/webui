import { Action } from '@ngrx/store';
import { SerialInterface } from '@app/system/models/serial-interface';
import { NetworkInterface } from '@app/system/models/network-interface';

export enum DeviceActionTypes {
  LoadDeviceName = '[Device Info] Load Device Name',
  LoadDeviceNameSuccess = '[Device Info] Load Device Name Success',
  LoadDeviceNameFail = '[Device Info] Load Device Name Fail',
  LoadDeviceSerialInterfaces = '[Device Info] Load Serial Interfaces',
  LoadDeviceSerialInterfacesSuccess = '[Device Info] Load Serial Interfaces Success',
  LoadDeviceSerialInterfacesFail = '[Device Info] Load Serial Interfaces Fail',
  LoadDeviceNetworkInterfaces = '[Device Info] Load Network Interfaces',
  LoadDeviceNetworkInterfacesSuccess = '[Device Info] Load Network Interfaces Success',
  LoadDeviceNetworkInterfacesFail = '[Device Info] Load Network Interfaces Fail',
}

export class LoadDeviceName implements Action {
  readonly type = DeviceActionTypes.LoadDeviceName;
}

export class LoadDeviceNameSuccess implements Action {
  readonly type = DeviceActionTypes.LoadDeviceNameSuccess;
  constructor(public payload: string) {}
}

export class LoadDeviceNameFail implements Action {
  readonly type = DeviceActionTypes.LoadDeviceNameFail;
  constructor(public payload: string) {}
}

export class LoadDeviceSerialInterfaces implements Action {
  readonly type = DeviceActionTypes.LoadDeviceSerialInterfaces;
}

export class LoadDeviceSerialInterfacesSuccess implements Action {
  readonly type = DeviceActionTypes.LoadDeviceSerialInterfacesSuccess;
  constructor(public payload: SerialInterface[]) {}
}

export class LoadDeviceSerialInterfacesFail implements Action {
  readonly type = DeviceActionTypes.LoadDeviceSerialInterfacesFail;
  constructor(public payload: string) {}
}

export class LoadDeviceNetworkInterfaces implements Action {
  readonly type = DeviceActionTypes.LoadDeviceNetworkInterfaces;
}

export class LoadDeviceNetworkInterfacesSuccess implements Action {
  readonly type = DeviceActionTypes.LoadDeviceNetworkInterfacesSuccess;
  constructor(public payload: NetworkInterface[]) {}
}

export class LoadDeviceNetworkInterfacesFail implements Action {
  readonly type = DeviceActionTypes.LoadDeviceNetworkInterfacesFail;
  constructor(public payload: string) {}
}

export type DeviceActions =
  | LoadDeviceName
  | LoadDeviceNameSuccess
  | LoadDeviceNameFail
  | LoadDeviceSerialInterfaces
  | LoadDeviceSerialInterfacesSuccess
  | LoadDeviceSerialInterfacesFail
  | LoadDeviceNetworkInterfaces
  | LoadDeviceNetworkInterfacesSuccess
  | LoadDeviceNetworkInterfacesFail;
