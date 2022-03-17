import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '@app/state';
import { HeartbeatState } from './heartbeat.reducer';
export interface State extends fromRoot.State {
  heartbeat: HeartbeatState;
}

const getHeartbeatFeature = createFeatureSelector<HeartbeatState>('heartbeat');

export const getDevicesInfo = createSelector(
  getHeartbeatFeature,
  state => state.devices
);

export const getTagsInfo = createSelector(
  getHeartbeatFeature,
  state => state.tags
);

export const getMessagesPerInterval = createSelector(
  getHeartbeatFeature,
  state => state.messages.perInterval
);

export const getFlowsNumber = createSelector(
  getHeartbeatFeature,
  state => state.flows
);

export const getApplicationsInfo = createSelector(
  getHeartbeatFeature,
  state => state.applications
);

export const getLoopCloudConnections = createSelector(
  getHeartbeatFeature,
  state => state.loopCloud
);

export const getIntegrations = createSelector(
  getHeartbeatFeature,
  state => state.integrations
);

export const getRemoteNetworks = createSelector(
  getHeartbeatFeature,
  state => state.remoteNetworks
);

export const getAvailableApis = createSelector(
  getHeartbeatFeature,
  state => state.availableApi
);

export const getStorageUtilization = createSelector(
  getHeartbeatFeature,
  state => state.storageUtilization
);

export const getCpuUtilization = createSelector(
  getHeartbeatFeature,
  state => [
    {
      x: new Date(state.resourcesUtilization.cpu.data[0]).getTime(),
      y: Math.round(+state.resourcesUtilization.cpu.data[1]),
    },
  ]
);

export const getMemoryLoad = createSelector(
  getHeartbeatFeature,
  state => [
    {
      x: new Date(state.resourcesUtilization.cpu.data[0]).getTime(),
      y: Math.round(+state.resourcesUtilization.mem.data[1]),
    },
    {
      x: new Date(state.resourcesUtilization.cpu.data[0]).getTime(),
      y: Math.round(+state.resourcesUtilization.mem.data[2]),
    },
  ]
);

export const getNetworkIn = createSelector(
  getHeartbeatFeature,
  state => [
    {
      x: new Date(state.resourcesUtilization.netin.data[0]).getTime(),
      y: state.resourcesUtilization.netin.data[1],
    },
  ]
);

export const getNetworkOut = createSelector(
  getHeartbeatFeature,
  state => [
    {
      x: new Date(state.resourcesUtilization.netout.data[0]).getTime(),
      y: state.resourcesUtilization.netout.data[1],
    },
  ]
);
