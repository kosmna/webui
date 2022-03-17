export * from './app.reducer';
export * from './device.reducer';

import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ApplicationState } from './app.reducer';
import { DeviceState } from './device.reducer';

export interface State {
  license?: any;
  application: ApplicationState;
  device: DeviceState;
}

const getApplicationRootState = createFeatureSelector<ApplicationState>(
  'application'
);

const getDeviceRootState = createFeatureSelector<DeviceState>('device');

export const getHeartbeatState = createSelector(
  getApplicationRootState,
  state => state.disabledMenuItems
);

export const getMenuItems = createSelector(
  getApplicationRootState,
  state => state.menuItems
);

export const getHeartbeatEnabledStatus = createSelector(
  getApplicationRootState,
  state => !state.disabledMenuItems.some(item => item === 'Heartbeat')
);

export const getDeviceFriendlyName = createSelector(
  getDeviceRootState,
  state => state.deviceFriendlyName
);

export const getDeviceSerialInterfaces = createSelector(
  getDeviceRootState,
  state => state.serialInterfaces
);

export const getDeviceNetworkInterfaces = createSelector(
  getDeviceRootState,
  state => state.networkInterfaces
);
