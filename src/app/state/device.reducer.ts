import { DeviceActions, DeviceActionTypes } from './device.actions';
import { SerialInterface } from '@app/system/models/serial-interface';
import { NetworkInterface } from '@app/system/models/network-interface';

export interface DeviceState {
  deviceFriendlyName: string;
  serialInterfaces: SerialInterface[];
  networkInterfaces: NetworkInterface[];
  error: string;
}

export const deviceInitialState: DeviceState = {
  deviceFriendlyName: '',
  serialInterfaces: [],
  networkInterfaces: [],
  error: '',
};

export function deviceReducer(
  state = deviceInitialState,
  action: DeviceActions
): DeviceState {
  switch (action.type) {
    case DeviceActionTypes.LoadDeviceNameSuccess:
      return {
        ...state,
        deviceFriendlyName: action.payload,
        error: '',
      };
    case DeviceActionTypes.LoadDeviceNameFail:
      return {
        ...state,
        deviceFriendlyName: '',
        error: action.payload,
      };
    case DeviceActionTypes.LoadDeviceSerialInterfacesSuccess:
      return {
        ...state,
        serialInterfaces: action.payload,
        error: '',
      };
    case DeviceActionTypes.LoadDeviceSerialInterfacesFail:
      return {
        ...state,
        serialInterfaces: [],
        error: action.payload,
      };
    case DeviceActionTypes.LoadDeviceNetworkInterfacesSuccess:
      return {
        ...state,
        networkInterfaces: action.payload,
        error: '',
      };
    case DeviceActionTypes.LoadDeviceNetworkInterfacesFail:
      return {
        ...state,
        networkInterfaces: [],
        error: action.payload,
      };
    default:
      return state;
  }
}
